# 変更履歴

- UPDATE
    - 下位互換がある変更
- ADD
    - 下位互換がある追加
- CHANGE
    - 下位互換のない変更
- FIX
    - バグ修正

## shiguredo

## develop

- [FIX] textlint 13.x 環境下で NodeType = Code のとき node.value が要求されるが、プラグイン側が対応できていない。これを textlint の要求に従うように修正する
    - @max747

## 2023.3.0

- [ADD] デバッグ出力を設定で切替可能にする
    - @max747
- [FIX] Comment ノードが textlint の期待する形式に従うようにする。ただし 1 行コメントのみ
    - @max747

## 2023.2.1

- [FIX] Comment を正しくマッピングする
    - @max747

## 2023.2.0

- [UPDATE] structured-source を 4.0.0 に上げる
    - @voluntas
- [FIX] syntaxMap に `"literal": "Code"` を追加する
    - @tk0miya からのアドバイス
    - @voluntas
- [FIX] node.loc および node.range の値を正しく設定する
    - @max747

## 2023.1.0

- [ADD] lib 以下も git に含めるようにする
    - @voluntas
- [CHANGE] TypeScript 化する
    - @voluntas
- [FIX] execSync バッファサイズを大きめにする
    - @voluntas
