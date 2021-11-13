import {parser as parserImported} from "../dist/index.es.js"

if (process.argv.length < 3) {
  console.log(`usage: node ${process.argv[1].split('/').pop()} "input text"`);
  process.exit(1);
}

var text = process.argv[2];
var parser = parserImported; // allow reassign

// based on https://github.com/lezer-parser/generator/blob/main/src/test.ts#L161

var config = null;
var strict = true;
if (parser.configure && (strict || config))
  parser = parser.configure({strict, ...config});

let actual;
try {
  actual = parser.parse(text);
}
catch (e) {
  // https://github.com/lezer-parser/lr/blob/main/src/parse.ts#L300
  if (e.message.startsWith("No parse at ")) {
    const pos = parseInt(e.message.slice("No parse at ".length));
    e.message += `\n      ${text}\n      ${" ".repeat(pos)}^`;
  }
  throw e;
}

//console.dir(actual, { depth: 5 });

const indentStep = "  ";

// Tree https://github.com/lezer-parser/common/blob/main/src/tree.ts#L314
actual.toString = function toString(depth = 0) {
  //let mounted = this.prop(NodeProp.mounted)
  //if (mounted && !mounted.overlay) return mounted.tree.toString()
  let children = ""
  for (let ch of this.children) {
    let str = ch.toString(depth + 1)
    if (str) {
      //if (children) children += ","
      children += str
    }
  }
  return !this.type.name ? children :
    (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) +
    //(children.length ? "(" + children + ")" : "")
    (children.length ? "\n" + children : "")
}

if (!actual.children[0].set) {
  // Tree
  // TODO print type + source tree
  //console.dir(actual, { depth: 5 });

  actual.children[0].toString = function toString(depth = -1) {
    //let mounted = this.prop(NodeProp.mounted)
    //if (mounted && !mounted.overlay) return mounted.tree.toString()
    let children = ""
    for (let ch of this.children) {
      let str = ch.toString(depth + 1)
      if (str) {
        //if (children) children += ","
        children += str
      }
    }
    let source = text
    let indent = indentStep.repeat(depth)
    return indent + (!this.type.name ? children :
      (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) +
      //(children.length ? "(" + children + ")" : "")
      ` ${source}` +
      (children.length ? "\n" + children : ""))
  }

  console.log(actual.toString(0));
}
else
if (actual.children[0].set) {
  // TreeBuffer https://github.com/lezer-parser/common/blob/main/src/tree.ts#L530
  // monkeypatch: print type + source tree
  actual.children[0].toString = function toString(depth = 0) {
    let result = []
    for (let index = 0; index < this.buffer.length;) {
      result.push(this.childString(index, depth + 1))
      index = this.buffer[index + 3]
    }
    //return result.join(",")
    return result.join('')
  }
  actual.children[0].childString = function childString(index, depth = 0) {
    let id = this.buffer[index], endIndex = this.buffer[index + 3]
    let type = this.set.types[id], result = type.name // TODO add source to result
    if (/\W/.test(result) && !type.isError) result = JSON.stringify(result)
    let source = text.slice(
      this.buffer[index + 1],
      this.buffer[index + 2],
    )
    if (/[\r\n]/.test(source)) source = JSON.stringify(source)
    result += ` ${source}`
    result = indentStep.repeat(depth) + result
    index += 4
    if (endIndex == index) return result
    let children = []
    while (index < endIndex) {
      children.push(this.childString(index, depth + 1))
      index = this.buffer[index + 3]
    }
    //return result + "(" + children.join(",") + ")"
    const indent = indentStep.repeat(depth);
    return result + '\n' + children.map(str => str + '\n').join('')
  }

  console.log(actual.toString(-1));
}
