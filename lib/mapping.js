"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/@textlint+ast-node-types@13.3.3/node_modules/@textlint/ast-node-types/lib/src/ASTNodeTypes.js
var require_ASTNodeTypes = __commonJS({
  "node_modules/.pnpm/@textlint+ast-node-types@13.3.3/node_modules/@textlint/ast-node-types/lib/src/ASTNodeTypes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ASTNodeTypes = void 0;
    var ASTNodeTypes2;
    (function(ASTNodeTypes3) {
      ASTNodeTypes3["Document"] = "Document";
      ASTNodeTypes3["DocumentExit"] = "Document:exit";
      ASTNodeTypes3["Paragraph"] = "Paragraph";
      ASTNodeTypes3["ParagraphExit"] = "Paragraph:exit";
      ASTNodeTypes3["BlockQuote"] = "BlockQuote";
      ASTNodeTypes3["BlockQuoteExit"] = "BlockQuote:exit";
      ASTNodeTypes3["ListItem"] = "ListItem";
      ASTNodeTypes3["ListItemExit"] = "ListItem:exit";
      ASTNodeTypes3["List"] = "List";
      ASTNodeTypes3["ListExit"] = "List:exit";
      ASTNodeTypes3["Header"] = "Header";
      ASTNodeTypes3["HeaderExit"] = "Header:exit";
      ASTNodeTypes3["CodeBlock"] = "CodeBlock";
      ASTNodeTypes3["CodeBlockExit"] = "CodeBlock:exit";
      ASTNodeTypes3["HtmlBlock"] = "HtmlBlock";
      ASTNodeTypes3["HtmlBlockExit"] = "HtmlBlock:exit";
      ASTNodeTypes3["HorizontalRule"] = "HorizontalRule";
      ASTNodeTypes3["HorizontalRuleExit"] = "HorizontalRule:exit";
      ASTNodeTypes3["Comment"] = "Comment";
      ASTNodeTypes3["CommentExit"] = "Comment:exit";
      ASTNodeTypes3["ReferenceDef"] = "ReferenceDef";
      ASTNodeTypes3["ReferenceDefExit"] = "ReferenceDef:exit";
      ASTNodeTypes3["Str"] = "Str";
      ASTNodeTypes3["StrExit"] = "Str:exit";
      ASTNodeTypes3["Break"] = "Break";
      ASTNodeTypes3["BreakExit"] = "Break:exit";
      ASTNodeTypes3["Emphasis"] = "Emphasis";
      ASTNodeTypes3["EmphasisExit"] = "Emphasis:exit";
      ASTNodeTypes3["Strong"] = "Strong";
      ASTNodeTypes3["StrongExit"] = "Strong:exit";
      ASTNodeTypes3["Html"] = "Html";
      ASTNodeTypes3["HtmlExit"] = "Html:exit";
      ASTNodeTypes3["Link"] = "Link";
      ASTNodeTypes3["LinkExit"] = "Link:exit";
      ASTNodeTypes3["Image"] = "Image";
      ASTNodeTypes3["ImageExit"] = "Image:exit";
      ASTNodeTypes3["Code"] = "Code";
      ASTNodeTypes3["CodeExit"] = "Code:exit";
      ASTNodeTypes3["Delete"] = "Delete";
      ASTNodeTypes3["DeleteExit"] = "Delete:exit";
      ASTNodeTypes3["Table"] = "Table";
      ASTNodeTypes3["TableExit"] = "Table:exit";
      ASTNodeTypes3["TableRow"] = "TableRow";
      ASTNodeTypes3["TableRowExit"] = "TableRow:exit";
      ASTNodeTypes3["TableCell"] = "TableCell";
      ASTNodeTypes3["TableCellExit"] = "TableCell:exit";
    })(ASTNodeTypes2 = exports.ASTNodeTypes || (exports.ASTNodeTypes = {}));
  }
});

// node_modules/.pnpm/@textlint+ast-node-types@13.3.3/node_modules/@textlint/ast-node-types/lib/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/@textlint+ast-node-types@13.3.3/node_modules/@textlint/ast-node-types/lib/src/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ASTNodeTypes = void 0;
    var ASTNodeTypes_1 = require_ASTNodeTypes();
    Object.defineProperty(exports, "ASTNodeTypes", { enumerable: true, get: function() {
      return ASTNodeTypes_1.ASTNodeTypes;
    } });
  }
});

// src/mapping.ts
var mapping_exports = {};
__export(mapping_exports, {
  reSTAttributeKeyMap: () => reSTAttributeKeyMap,
  syntaxMap: () => syntaxMap
});
module.exports = __toCommonJS(mapping_exports);
var import_ast_node_types = __toESM(require_src());
var syntaxMap = {
  "document": import_ast_node_types.ASTNodeTypes.Document,
  "paragraph": import_ast_node_types.ASTNodeTypes.Paragraph,
  "block_quote": import_ast_node_types.ASTNodeTypes.BlockQuote,
  "list_item": import_ast_node_types.ASTNodeTypes.ListItem,
  "bullet_list": import_ast_node_types.ASTNodeTypes.List,
  "title": import_ast_node_types.ASTNodeTypes.Header,
  "literal_block": import_ast_node_types.ASTNodeTypes.CodeBlock,
  "reference": import_ast_node_types.ASTNodeTypes.Link,
  "meta": import_ast_node_types.ASTNodeTypes.Html,
  "text": import_ast_node_types.ASTNodeTypes.Str,
  "emphasis": import_ast_node_types.ASTNodeTypes.Emphasis,
  "strong": import_ast_node_types.ASTNodeTypes.Strong,
  "image": import_ast_node_types.ASTNodeTypes.Image,
  "inline": import_ast_node_types.ASTNodeTypes.Code,
  "literal": import_ast_node_types.ASTNodeTypes.Code,
  "title-reference": import_ast_node_types.ASTNodeTypes.Header,
  "comment": import_ast_node_types.ASTNodeTypes.Comment
};
var reSTAttributeKeyMap = {
  "tagname": "type",
  "rawsource": "raw",
  "text": "value"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reSTAttributeKeyMap,
  syntaxMap
});
