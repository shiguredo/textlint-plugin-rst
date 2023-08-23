// LICENSE : MIT
"use strict";
import { ASTNodeTypes } from "@textlint/ast-node-types";

interface SyntaxMap {
    [index: string]: keyof typeof ASTNodeTypes
}

export const syntaxMap: SyntaxMap = {
    "document": ASTNodeTypes.Document,
    "paragraph": ASTNodeTypes.Paragraph,
    "block_quote": ASTNodeTypes.BlockQuote,
    "list_item": ASTNodeTypes.ListItem,
    "bullet_list": ASTNodeTypes.List,
    "title": ASTNodeTypes.Header,
    "literal_block": ASTNodeTypes.CodeBlock,
    "reference": ASTNodeTypes.Link,
    "meta": ASTNodeTypes.Html,
    "text": ASTNodeTypes.Str,
    "emphasis": ASTNodeTypes.Emphasis,
    "strong": ASTNodeTypes.Strong,
    "image": ASTNodeTypes.Image,
    "inline": ASTNodeTypes.Code,
    "literal": ASTNodeTypes.Code,
    "title-reference": ASTNodeTypes.Header,
    "comment": ASTNodeTypes.Comment,
};

interface ReSTAttributeKeyMap {
    [index: string]: string
}

export const reSTAttributeKeyMap: ReSTAttributeKeyMap = {
    "tagname": "type",
    "rawsource": "raw",
    "text": "value"
};
