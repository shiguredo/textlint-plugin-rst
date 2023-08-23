'use strict'

import { execSync } from 'child_process'
import traverse, { TraverseContext } from "traverse"
import { StructuredSource } from 'structured-source'
import { syntaxMap, reSTAttributeKeyMap } from './mapping'
import { TxtNode, TxtParentNode, ASTNodeTypes } from "@textlint/ast-node-types";

function filterAndReplaceNodeAttributes(node: TxtNode) {
  Object.keys(reSTAttributeKeyMap).forEach((key) => {
    let v = node[key]
    node[reSTAttributeKeyMap[key]] = v
    if (v !== undefined) {
      delete node[key]
    }
  })
}

export type ParseOptions = {
  debug: boolean;
}

function findParentNode(parent: TraverseContext | undefined): TxtNode | undefined {
  if (!parent) {
    return parent
  }
  if (!Array.isArray(parent.node)) {
    return parent.node as TxtNode
  }
  return findParentNode(parent.parent)
}

/**
 * parse reStructuredText and return ast mapped location info.
 * @param {string} text
 * @returns {TxtParentNode}
 */
export function parse(text: string, options?: ParseOptions): TxtParentNode {
  const isDebug = process.env.DEBUG?.startsWith("textlint:rst") ?? options?.debug ?? false;
  const ast = JSON.parse(execSync('rst2ast -q', { input: text, maxBuffer: 8192 * 8192 }).toString())
  const src = new StructuredSource(text)
  // NOTE: 設定で動的に増やせるようにすると良い
  const originalTypesNeedCalibration: Array<string> = [
    "title",
    "comment",
    "literal_block",
    // Sphinx builtin directives
    // https://sphinx-users.jp/gettingstarted/directives.html
    "attention",
    "caution",
    "danger",
    "error",
    "hint",
    "important",
    "note",
    "tip",
    "warning",
    "admonition",
  ]

  traverse(ast).forEach(function (node: TxtNode | Array<TxtNode>) {
    if (this.notLeaf) {
      if (Array.isArray(node)) {
        return
      }
      filterAndReplaceNodeAttributes(node)
      const parentNode = findParentNode(this.parent)
      if (isDebug) {
        console.log("===== node (raw) ===================")
        console.dir(node, {depth: null})
        // NOTE: 必要でない限り parent node の情報は dump しなくて良さそう。情報過多になる
        // console.log("===== parent node ==================")
        // console.log(parentNode)
      }

      if (parentNode && parentNode.type === ASTNodeTypes.Comment) {
        return
      }
      // type
      // original をバックアップ
      // TODO: 手抜きなので、あとで真面目に型定義をやること
      node.original_type = node.type
      if (node.original_type === null) {
        node.type = ASTNodeTypes.Str
      } else {
        node.type = syntaxMap[node.original_type]
      }
      if (!node.type) {
        // textlint v13.0.5 以降で ASTNodeTypes 以外を受け付けなくなったので node.type = 'Unknown' のような代入はできない
        node.type = ASTNodeTypes.Str
      }
      // raw
      node.raw = node.raw || node.value || ''
      // value
      if (node.value === undefined) {
        // comment, str, code ノードは value を持つ必要がある。また children は不要
        switch (node.type) {
          case ASTNodeTypes.Comment:
          case ASTNodeTypes.Str:
          case ASTNodeTypes.Code:
            node.value = node.raw
            delete node.children
            break
          default:
            delete node.value
        }
      }
      // loc
      if (node.line) {
        if (node.raw.length === 0) {
          node.loc = {
            start: { line: node.line.start, column: 0 },
            end: { line: node.line.end + 1, column: 0 },
          }
          node.range = src.locationToRange(node.loc)
        } else {
          let searchStartPos = {
            line: node.line.start,
            column: 0,
          }
          // Header については node.line.start が期待する値よりも
          // 1 行下にずれるので上方向に補正する。
          // (rst2ast のバグの可能性もある)
          if (node.type === ASTNodeTypes.Header) {
            searchStartPos.line -= 1

          // Comment などの directive を用いるブロックについては、1 行記述であれば 1 行下にずれる。
          // 複数行記述であればブロック終了行の次の行が
          // node.line.start に設定される。この前提で、強引にブロックの開始位置を探り当てる。
          } else if (originalTypesNeedCalibration.includes(node.original_type)) {
            const fromIndex = src.positionToIndex(searchStartPos)
            // 逆向きにノード開始位置 .. を探索
            const start = text.lastIndexOf("\n..", fromIndex)
            searchStartPos = src.indexToPosition(start)

          // Header のテキスト要素 Str も同様にずれるので、親ノードが
          // 補正対象なら子ノードも同様に補正する。
          } else if (parentNode && parentNode.type && originalTypesNeedCalibration.includes(parentNode.original_type)) {
            searchStartPos.line -= 1
          }

          const fromIndex = src.positionToIndex(searchStartPos)
          if (isDebug) {
            console.log("--------------------------")
            console.log(`fromIndex: ${fromIndex}`)
            console.log(`substr (20): ${text.substring(fromIndex, fromIndex+20)}`)
          }
          let start = 0
          if (node.raw.includes("\n")) {
            // node.raw が複数行にわたる場合は、各行の行頭 whitespaces がトリミングされている
            // 可能性がある。したがって単純な indexOf ではヒットしない。
            start = indexOfMultiLineWithoutLspaces(text, node.raw, fromIndex)
          } else {
            start = text.indexOf(node.raw, fromIndex)
          }
          let end = 0
          // 見つからない場合は range = [0, 0] を設定
          if (start < 0) {
            if (isDebug) {
              console.log(">>>>> not found, set start to 0")
            }
            start = 0
          } else {
            end = start + node.raw.length
            if (isDebug) {
              console.log(">>>>> found")
              console.log(`>>>>> start: ${start}, end: ${end}`)
              console.log(`>>>>> ${text.substring(start, end)}`)
            }
          }
          node.range = [start, end]
          node.loc = src.rangeToLocation(node.range)
        }
        if (isDebug && node.range[0] === 0 && node.range[1] === 0) {
          console.log("-------------------------")
          console.log(`node.line:`)
          console.dir(node.line, { depth: null })
          console.log(`node.type: ${node.type}`)
          console.log(`node.raw: ${node.raw}`)
          console.log(`node.range: ${node.range[0]} - ${node.range[1]}`)
          console.log(`node.loc:`)
          console.dir(node.loc, { depth: null })
          console.log(`cut: ${text.substring(node.range[0], node.range[1])}`)
        }
        delete node.line
      }
      if (isDebug) {
        console.log("===== node (updated) =====================")
        console.dir(node, {depth: null})
      }
    }
  })
  return ast as TxtParentNode
}

/**
 * 複数行にわたる search_str に一致する部分が text 内にある場合は、その開始位置を返す。
 * ただし text の各行の行頭のスペースは無視する。
 * [例]
 * text
 * -----------------
 * 本文
 * テキスト
 *
 * ..
 *     複数行
 *     コメント
 *
 * 終わり
 * -----------------
 *
 * search_str: "複数行\nコメント"
 *
 * この例では単純な text.indexOf(search_str) ではマッチせず、結果は -1 となる。
 * 一方 indexOfMultiLineWithoutLspaces(text, search_str) ではマッチングするときに
 * L5, L6 の行頭スペースを無視することで search_str と一致するため、マッチする。
 * ただし search_str のほうがスペースで開始していると trimStart() された行文字列とは
 * マッチしなくなってしまう。そこで search_str についても trimStart() する。
 *
 * @param text 検索対象テキスト
 * @param search_str 検索文字列（複数行）
 * @param position 検索対象テキストの検索開始位置
 * @returns マッチする場合は開始位置インデックス。マッチしない場合は -1
 */
export function indexOfMultiLineWithoutLspaces(text: string, search_str: string, position: number): number {
  const search_strings = search_str.split("\n")
  const start = text.indexOf(search_strings[0], position)
  const scanner = lineScanner(text.substring(start))
  // 開始位置の行を得る
  // -> 行を trimStart() した結果と比較対象を trimStart() した結果の最初の行が一致
  // -> 次の行に対しても同様のことを繰り返す...
  // -> 全部の search_strings に対してマッチしたらマッチ成功。開始位置を返す。
  //    マッチしない行があった時点で -1 を返す。
  for (let i = 0; i < search_strings.length; i++) {
    const result = scanner.next()
    const line = result.value
    if (line.trimStart() !== search_strings[i].trimStart()) {
      return -1
    }
    // 検索対象テキストの次の行がない && search_str の最後まで到達していない
    if (result.done && search_strings.length - i > 1) {
      return -1
    }
  }
  return start
}

// テキストを1行ずつスキャンして返すイテレーターを返すジェネレーター
function* lineScanner(text: string) {
  let remain = text
  while (true) {
    let lineBreakPos = remain.indexOf("\n")
    // 終了条件
    if (lineBreakPos == -1) {
      return remain
    }
    yield remain.substring(0, lineBreakPos)
    // 次の行までヘッダを移動
    remain = remain.substring(lineBreakPos+1)
  }
}
