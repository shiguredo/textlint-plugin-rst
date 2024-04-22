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

// node_modules/.pnpm/traverse@0.6.7/node_modules/traverse/index.js
var require_traverse = __commonJS({
  "node_modules/.pnpm/traverse@0.6.7/node_modules/traverse/index.js"(exports, module2) {
    "use strict";
    function toS(obj) {
      return Object.prototype.toString.call(obj);
    }
    function isDate(obj) {
      return toS(obj) === "[object Date]";
    }
    function isRegExp(obj) {
      return toS(obj) === "[object RegExp]";
    }
    function isError(obj) {
      return toS(obj) === "[object Error]";
    }
    function isBoolean(obj) {
      return toS(obj) === "[object Boolean]";
    }
    function isNumber(obj) {
      return toS(obj) === "[object Number]";
    }
    function isString(obj) {
      return toS(obj) === "[object String]";
    }
    var isArray = Array.isArray || function isArray2(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
    function forEach(xs, fn) {
      if (xs.forEach) {
        return xs.forEach(fn);
      }
      for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
      }
      return void 0;
    }
    var objectKeys = Object.keys || function keys(obj) {
      var res = [];
      for (var key in obj) {
        res.push(key);
      }
      return res;
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty || function(obj, key) {
      return key in obj;
    };
    function copy(src) {
      if (typeof src === "object" && src !== null) {
        var dst;
        if (isArray(src)) {
          dst = [];
        } else if (isDate(src)) {
          dst = new Date(src.getTime ? src.getTime() : src);
        } else if (isRegExp(src)) {
          dst = new RegExp(src);
        } else if (isError(src)) {
          dst = { message: src.message };
        } else if (isBoolean(src) || isNumber(src) || isString(src)) {
          dst = Object(src);
        } else if (Object.create && Object.getPrototypeOf) {
          dst = Object.create(Object.getPrototypeOf(src));
        } else if (src.constructor === Object) {
          dst = {};
        } else {
          var proto = src.constructor && src.constructor.prototype || src.__proto__ || {};
          var T = function T2() {
          };
          T.prototype = proto;
          dst = new T();
        }
        forEach(objectKeys(src), function(key) {
          dst[key] = src[key];
        });
        return dst;
      }
      return src;
    }
    function walk(root, cb, immutable) {
      var path = [];
      var parents = [];
      var alive = true;
      return function walker(node_) {
        var node = immutable ? copy(node_) : node_;
        var modifiers = {};
        var keepGoing = true;
        var state = {
          node,
          node_,
          path: [].concat(path),
          parent: parents[parents.length - 1],
          parents,
          key: path[path.length - 1],
          isRoot: path.length === 0,
          level: path.length,
          circular: null,
          update: function(x, stopHere) {
            if (!state.isRoot) {
              state.parent.node[state.key] = x;
            }
            state.node = x;
            if (stopHere) {
              keepGoing = false;
            }
          },
          delete: function(stopHere) {
            delete state.parent.node[state.key];
            if (stopHere) {
              keepGoing = false;
            }
          },
          remove: function(stopHere) {
            if (isArray(state.parent.node)) {
              state.parent.node.splice(state.key, 1);
            } else {
              delete state.parent.node[state.key];
            }
            if (stopHere) {
              keepGoing = false;
            }
          },
          keys: null,
          before: function(f) {
            modifiers.before = f;
          },
          after: function(f) {
            modifiers.after = f;
          },
          pre: function(f) {
            modifiers.pre = f;
          },
          post: function(f) {
            modifiers.post = f;
          },
          stop: function() {
            alive = false;
          },
          block: function() {
            keepGoing = false;
          }
        };
        if (!alive) {
          return state;
        }
        function updateState() {
          if (typeof state.node === "object" && state.node !== null) {
            if (!state.keys || state.node_ !== state.node) {
              state.keys = objectKeys(state.node);
            }
            state.isLeaf = state.keys.length === 0;
            for (var i = 0; i < parents.length; i++) {
              if (parents[i].node_ === node_) {
                state.circular = parents[i];
                break;
              }
            }
          } else {
            state.isLeaf = true;
            state.keys = null;
          }
          state.notLeaf = !state.isLeaf;
          state.notRoot = !state.isRoot;
        }
        updateState();
        var ret = cb.call(state, state.node);
        if (ret !== void 0 && state.update) {
          state.update(ret);
        }
        if (modifiers.before) {
          modifiers.before.call(state, state.node);
        }
        if (!keepGoing) {
          return state;
        }
        if (typeof state.node === "object" && state.node !== null && !state.circular) {
          parents.push(state);
          updateState();
          forEach(state.keys, function(key, i) {
            path.push(key);
            if (modifiers.pre) {
              modifiers.pre.call(state, state.node[key], key);
            }
            var child = walker(state.node[key]);
            if (immutable && hasOwnProperty.call(state.node, key)) {
              state.node[key] = child.node;
            }
            child.isLast = i === state.keys.length - 1;
            child.isFirst = i === 0;
            if (modifiers.post) {
              modifiers.post.call(state, child);
            }
            path.pop();
          });
          parents.pop();
        }
        if (modifiers.after) {
          modifiers.after.call(state, state.node);
        }
        return state;
      }(root).node;
    }
    function Traverse(obj) {
      this.value = obj;
    }
    Traverse.prototype.get = function(ps) {
      var node = this.value;
      for (var i = 0; i < ps.length; i++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
          return void 0;
        }
        node = node[key];
      }
      return node;
    };
    Traverse.prototype.has = function(ps) {
      var node = this.value;
      for (var i = 0; i < ps.length; i++) {
        var key = ps[i];
        if (!node || !hasOwnProperty.call(node, key)) {
          return false;
        }
        node = node[key];
      }
      return true;
    };
    Traverse.prototype.set = function(ps, value) {
      var node = this.value;
      for (var i = 0; i < ps.length - 1; i++) {
        var key = ps[i];
        if (!hasOwnProperty.call(node, key)) {
          node[key] = {};
        }
        node = node[key];
      }
      node[ps[i]] = value;
      return value;
    };
    Traverse.prototype.map = function(cb) {
      return walk(this.value, cb, true);
    };
    Traverse.prototype.forEach = function(cb) {
      this.value = walk(this.value, cb, false);
      return this.value;
    };
    Traverse.prototype.reduce = function(cb, init) {
      var skip = arguments.length === 1;
      var acc = skip ? this.value : init;
      this.forEach(function(x) {
        if (!this.isRoot || !skip) {
          acc = cb.call(this, acc, x);
        }
      });
      return acc;
    };
    Traverse.prototype.paths = function() {
      var acc = [];
      this.forEach(function() {
        acc.push(this.path);
      });
      return acc;
    };
    Traverse.prototype.nodes = function() {
      var acc = [];
      this.forEach(function() {
        acc.push(this.node);
      });
      return acc;
    };
    Traverse.prototype.clone = function() {
      var parents = [];
      var nodes = [];
      return function clone(src) {
        for (var i = 0; i < parents.length; i++) {
          if (parents[i] === src) {
            return nodes[i];
          }
        }
        if (typeof src === "object" && src !== null) {
          var dst = copy(src);
          parents.push(src);
          nodes.push(dst);
          forEach(objectKeys(src), function(key) {
            dst[key] = clone(src[key]);
          });
          parents.pop();
          nodes.pop();
          return dst;
        }
        return src;
      }(this.value);
    };
    function traverse2(obj) {
      return new Traverse(obj);
    }
    forEach(objectKeys(Traverse.prototype), function(key) {
      traverse2[key] = function(obj) {
        var args = [].slice.call(arguments, 1);
        var t = new Traverse(obj);
        return t[key].apply(t, args);
      };
    });
    module2.exports = traverse2;
  }
});

// node_modules/.pnpm/boundary@2.0.0/node_modules/boundary/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/boundary@2.0.0/node_modules/boundary/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.binarySearch = exports.upperBound = exports.lowerBound = exports.compare = void 0;
    function compare(v1, v2) {
      return v1 < v2;
    }
    exports.compare = compare;
    function upperBound(array, value, comp = compare) {
      let len = array.length;
      let i = 0;
      while (len) {
        let diff = len >>> 1;
        let cursor = i + diff;
        if (comp(value, array[cursor])) {
          len = diff;
        } else {
          i = cursor + 1;
          len -= diff + 1;
        }
      }
      return i;
    }
    exports.upperBound = upperBound;
    function lowerBound(array, value, comp = compare) {
      let len = array.length;
      let i = 0;
      while (len) {
        let diff = len >>> 1;
        let cursor = i + diff;
        if (comp(array[cursor], value)) {
          i = cursor + 1;
          len -= diff + 1;
        } else {
          len = diff;
        }
      }
      return i;
    }
    exports.lowerBound = lowerBound;
    function binarySearch(array, value, comp = compare) {
      let cursor = lowerBound(array, value, comp);
      return cursor !== array.length && !comp(value, array[cursor]);
    }
    exports.binarySearch = binarySearch;
  }
});

// node_modules/.pnpm/structured-source@4.0.0/node_modules/structured-source/lib/structured-source.js
var require_structured_source = __commonJS({
  "node_modules/.pnpm/structured-source@4.0.0/node_modules/structured-source/lib/structured-source.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StructuredSource = void 0;
    var boundary_1 = require_lib();
    var StructuredSource2 = class {
      /**
       * @constructs StructuredSource
       * @param {string} source - source code text.
       */
      constructor(source) {
        this.indice = [0];
        let regexp = /[\r\n\u2028\u2029]/g;
        const length = source.length;
        regexp.lastIndex = 0;
        while (true) {
          let result = regexp.exec(source);
          if (!result) {
            break;
          }
          let index = result.index;
          if (source.charCodeAt(index) === 13 && source.charCodeAt(index + 1) === 10) {
            index += 1;
          }
          let nextIndex = index + 1;
          if (length < nextIndex) {
            break;
          }
          this.indice.push(nextIndex);
          regexp.lastIndex = nextIndex;
        }
      }
      get line() {
        return this.indice.length;
      }
      /**
       * @param {SourceLocation} loc - location indicator.
       * @return {[ number, number ]} range.
       */
      locationToRange(loc) {
        return [this.positionToIndex(loc.start), this.positionToIndex(loc.end)];
      }
      /**
       * @param {[ number, number ]} range - pair of indice.
       * @return {SourceLocation} location.
       */
      rangeToLocation(range) {
        return {
          start: this.indexToPosition(range[0]),
          end: this.indexToPosition(range[1])
        };
      }
      /**
       * @param {SourcePosition} pos - position indicator.
       * @return {number} index.
       */
      positionToIndex(pos) {
        let start = this.indice[pos.line - 1];
        return start + pos.column;
      }
      /**
       * @param {number} index - index to the source code.
       * @return {SourcePosition} position.
       */
      indexToPosition(index) {
        const startLine = (0, boundary_1.upperBound)(this.indice, index);
        return {
          line: startLine,
          column: index - this.indice[startLine - 1]
        };
      }
    };
    exports.StructuredSource = StructuredSource2;
  }
});

// node_modules/.pnpm/@textlint+ast-node-types@13.3.3/node_modules/@textlint/ast-node-types/lib/src/ASTNodeTypes.js
var require_ASTNodeTypes = __commonJS({
  "node_modules/.pnpm/@textlint+ast-node-types@13.3.3/node_modules/@textlint/ast-node-types/lib/src/ASTNodeTypes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ASTNodeTypes = void 0;
    var ASTNodeTypes3;
    (function(ASTNodeTypes4) {
      ASTNodeTypes4["Document"] = "Document";
      ASTNodeTypes4["DocumentExit"] = "Document:exit";
      ASTNodeTypes4["Paragraph"] = "Paragraph";
      ASTNodeTypes4["ParagraphExit"] = "Paragraph:exit";
      ASTNodeTypes4["BlockQuote"] = "BlockQuote";
      ASTNodeTypes4["BlockQuoteExit"] = "BlockQuote:exit";
      ASTNodeTypes4["ListItem"] = "ListItem";
      ASTNodeTypes4["ListItemExit"] = "ListItem:exit";
      ASTNodeTypes4["List"] = "List";
      ASTNodeTypes4["ListExit"] = "List:exit";
      ASTNodeTypes4["Header"] = "Header";
      ASTNodeTypes4["HeaderExit"] = "Header:exit";
      ASTNodeTypes4["CodeBlock"] = "CodeBlock";
      ASTNodeTypes4["CodeBlockExit"] = "CodeBlock:exit";
      ASTNodeTypes4["HtmlBlock"] = "HtmlBlock";
      ASTNodeTypes4["HtmlBlockExit"] = "HtmlBlock:exit";
      ASTNodeTypes4["HorizontalRule"] = "HorizontalRule";
      ASTNodeTypes4["HorizontalRuleExit"] = "HorizontalRule:exit";
      ASTNodeTypes4["Comment"] = "Comment";
      ASTNodeTypes4["CommentExit"] = "Comment:exit";
      ASTNodeTypes4["ReferenceDef"] = "ReferenceDef";
      ASTNodeTypes4["ReferenceDefExit"] = "ReferenceDef:exit";
      ASTNodeTypes4["Str"] = "Str";
      ASTNodeTypes4["StrExit"] = "Str:exit";
      ASTNodeTypes4["Break"] = "Break";
      ASTNodeTypes4["BreakExit"] = "Break:exit";
      ASTNodeTypes4["Emphasis"] = "Emphasis";
      ASTNodeTypes4["EmphasisExit"] = "Emphasis:exit";
      ASTNodeTypes4["Strong"] = "Strong";
      ASTNodeTypes4["StrongExit"] = "Strong:exit";
      ASTNodeTypes4["Html"] = "Html";
      ASTNodeTypes4["HtmlExit"] = "Html:exit";
      ASTNodeTypes4["Link"] = "Link";
      ASTNodeTypes4["LinkExit"] = "Link:exit";
      ASTNodeTypes4["Image"] = "Image";
      ASTNodeTypes4["ImageExit"] = "Image:exit";
      ASTNodeTypes4["Code"] = "Code";
      ASTNodeTypes4["CodeExit"] = "Code:exit";
      ASTNodeTypes4["Delete"] = "Delete";
      ASTNodeTypes4["DeleteExit"] = "Delete:exit";
      ASTNodeTypes4["Table"] = "Table";
      ASTNodeTypes4["TableExit"] = "Table:exit";
      ASTNodeTypes4["TableRow"] = "TableRow";
      ASTNodeTypes4["TableRowExit"] = "TableRow:exit";
      ASTNodeTypes4["TableCell"] = "TableCell";
      ASTNodeTypes4["TableCellExit"] = "TableCell:exit";
    })(ASTNodeTypes3 = exports.ASTNodeTypes || (exports.ASTNodeTypes = {}));
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/rst-to-ast.ts
var import_child_process = require("child_process");
var import_traverse = __toESM(require_traverse());
var import_structured_source = __toESM(require_structured_source());

// src/mapping.ts
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

// src/rst-to-ast.ts
var import_ast_node_types2 = __toESM(require_src());
function filterAndReplaceNodeAttributes(node) {
  Object.keys(reSTAttributeKeyMap).forEach((key) => {
    let v = node[key];
    node[reSTAttributeKeyMap[key]] = v;
    if (v !== void 0) {
      delete node[key];
    }
  });
}
function findParentNode(parent) {
  if (!parent) {
    return parent;
  }
  if (!Array.isArray(parent.node)) {
    return parent.node;
  }
  return findParentNode(parent.parent);
}
function parse(text, options) {
  const ast = JSON.parse((0, import_child_process.execSync)(options.parseCommand, { input: text, maxBuffer: 8192 * 8192 }).toString());
  const src = new import_structured_source.StructuredSource(text);
  const originalTypesNeedCalibration = [
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
    "admonition"
  ];
  (0, import_traverse.default)(ast).forEach(function(node) {
    if (this.notLeaf) {
      if (Array.isArray(node)) {
        return;
      }
      filterAndReplaceNodeAttributes(node);
      const parentNode = findParentNode(this.parent);
      if (options.debug) {
        console.log("===== node (raw) ===================");
        console.dir(node, { depth: null });
      }
      if (parentNode && parentNode.type === import_ast_node_types2.ASTNodeTypes.Comment) {
        return;
      }
      node.original_type = node.type;
      if (node.original_type === null) {
        node.type = import_ast_node_types2.ASTNodeTypes.Str;
      } else {
        node.type = syntaxMap[node.original_type];
      }
      if (!node.type) {
        node.type = import_ast_node_types2.ASTNodeTypes.Str;
      }
      node.raw = node.raw || node.value || "";
      if (node.value === void 0) {
        switch (node.type) {
          case import_ast_node_types2.ASTNodeTypes.Comment:
          case import_ast_node_types2.ASTNodeTypes.Str:
          case import_ast_node_types2.ASTNodeTypes.Code:
            node.value = node.raw;
            delete node.children;
            break;
          default:
            delete node.value;
        }
      }
      if (node.line) {
        if (node.raw.length === 0) {
          node.loc = {
            start: { line: node.line.start, column: 0 },
            end: { line: node.line.end + 1, column: 0 }
          };
          node.range = src.locationToRange(node.loc);
        } else {
          let searchStartPos = {
            line: node.line.start,
            column: 0
          };
          if (node.type === import_ast_node_types2.ASTNodeTypes.Header) {
            searchStartPos.line -= 1;
          } else if (originalTypesNeedCalibration.includes(node.original_type)) {
            const fromIndex2 = src.positionToIndex(searchStartPos);
            const start2 = text.lastIndexOf("\n..", fromIndex2);
            searchStartPos = src.indexToPosition(start2);
          } else if (parentNode && parentNode.type && originalTypesNeedCalibration.includes(parentNode.original_type)) {
            searchStartPos.line -= 1;
          }
          const fromIndex = src.positionToIndex(searchStartPos);
          if (options.debug) {
            console.log("--------------------------");
            console.log(`fromIndex: ${fromIndex}`);
            console.log(`substr (20): ${text.substring(fromIndex, fromIndex + 20)}`);
          }
          let start = 0;
          if (node.raw.includes("\n")) {
            start = indexOfMultiLineWithoutLspaces(text, node.raw, fromIndex);
          } else {
            start = text.indexOf(node.raw, fromIndex);
          }
          let end = 0;
          if (start < 0) {
            if (options.debug) {
              console.log(">>>>> not found, set start to 0");
            }
            start = 0;
          } else {
            end = start + node.raw.length;
            if (options.debug) {
              console.log(">>>>> found");
              console.log(`>>>>> start: ${start}, end: ${end}`);
              console.log(`>>>>> ${text.substring(start, end)}`);
            }
          }
          node.range = [start, end];
          node.loc = src.rangeToLocation(node.range);
        }
        if (options.debug && node.range[0] === 0 && node.range[1] === 0) {
          console.log("-------------------------");
          console.log(`node.line:`);
          console.dir(node.line, { depth: null });
          console.log(`node.type: ${node.type}`);
          console.log(`node.raw: ${node.raw}`);
          console.log(`node.range: ${node.range[0]} - ${node.range[1]}`);
          console.log(`node.loc:`);
          console.dir(node.loc, { depth: null });
          console.log(`cut: ${text.substring(node.range[0], node.range[1])}`);
        }
        delete node.line;
      }
      if (options.debug) {
        console.log("===== node (updated) =====================");
        console.dir(node, { depth: null });
      }
    }
  });
  return ast;
}
function indexOfMultiLineWithoutLspaces(text, search_str, position) {
  const search_strings = search_str.split("\n");
  const start = text.indexOf(search_strings[0], position);
  const scanner = lineScanner(text.substring(start));
  for (let i = 0; i < search_strings.length; i++) {
    const result = scanner.next();
    const line = result.value;
    if (line.trimStart() !== search_strings[i].trimStart()) {
      return -1;
    }
    if (result.done && search_strings.length - i > 1) {
      return -1;
    }
  }
  return start;
}
function* lineScanner(text) {
  let remain = text;
  while (true) {
    let lineBreakPos = remain.indexOf("\n");
    if (lineBreakPos == -1) {
      return remain;
    }
    yield remain.substring(0, lineBreakPos);
    remain = remain.substring(lineBreakPos + 1);
  }
}

// src/ReSTProcessor.ts
var ReSTProcessor = class {
  options;
  extensions;
  constructor(options) {
    this.options = options;
    this.extensions = options.extensions ? options.extensions : [];
  }
  availableExtensions() {
    return [".rst", ".rest"].concat(this.extensions);
  }
  processor(ext) {
    return {
      preProcess: (text, filePath) => {
        let debug;
        if (this.options.debug) {
          debug = this.options.debug;
        } else if (process.env.DEBUG?.startsWith("textlint:rst")) {
          debug = true;
        } else {
          debug = false;
        }
        const parseOption = {
          parseCommand: this.options.parseCommand ? this.options.parseCommand : "rst2ast -q",
          debug
        };
        return parse(text, parseOption);
      },
      postProcess: (messages, filePath) => {
        return {
          messages,
          filePath: filePath ? filePath : "<rst>"
        };
      }
    };
  }
};

// src/index.ts
var src_default = {
  Processor: ReSTProcessor
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
