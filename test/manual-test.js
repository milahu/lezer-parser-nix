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

var actual = parser.parse(text);
//console.dir(actual, { depth: 5 });
console.log(actual.toString());
