# textlint-plugin-rst

[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/shiguredo/textlint-plugin-rst.svg)](https://github.com/shiguredo/textlint-plugin-rst)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

reStructuredText(`*.rst`) support for [textlint](https://github.com/textlint/textlint "textlint").

## About Shiguredo's open source software

We will not respond to PRs or issues that have not been discussed on Discord. Also, Discord is only available in Japanese.

Please read https://github.com/shiguredo/oss/blob/master/README.en.md before use.

## 時雨堂のオープンソースソフトウェアについて

利用前に https://github.com/shiguredo/oss をお読みください。

## textlint-plugin-rst について

このリポジトリは [@jimo1001](https://github.com/johejo/) の https://github.com/jimo1001/textlint-plugin-rst フォークです。

時雨堂がメンテナンスをしています。

## インストール

textlint-plugin-rst を利用するには以下の Python ライブラリのインストールが必須となります。

 - [docutils-ast-writer](https://github.com/shiguredo/docutils-ast-writer "docutils-ast-writer")

npm には登録しないため、Git 経由でインストールしてください。

```console
$ npm install git+https://github.com/shiguredo/textlint-plugin-rst#shiguredo
```

## 利用方法

.textlintrc に以下を記述します:

```json
{
    "plugins": [
        "rst"
    ]
}
```

### Advanced: プラグインの設定

textlint-plugin-rst では rst ファイルをパースする際に内部で実行するコマンドを指定することができます。
デフォルトは `rst2ast -q` が指定されています。これを上書きする場合は `.textlintrc` の `plugins` セクションに
`command` オプションを指定します。

```json
{
    "plugins": {
        "rst": {
            "command": "rye run rst2ast -q"
        }
    }
}
```

プラグインの実行対象とするファイル拡張子も指定することができます。
デフォルトでは `.rst` `.rest` が指定されています。

```json
{
    "plugins": {
        "rst": {
            "extensions": [".rst", ".rest", ".txt"]
        }
    }
}
```

## ライセンス

```
The MIT License (MIT)

Copyright (c) 2023-2023 Shiguredo Inc.
Copyright (c) 2016 jimo1001

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
