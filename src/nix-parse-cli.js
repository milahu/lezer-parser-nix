import {parser as parserImported} from "../dist/index.js"
import {stringifyTree} from "./stringify-tree.js"
import {readFileSync} from "node:fs"

if (process.stdin.isTTY && process.argv.length < 3) {
  const name = process.argv[1].split('/').pop();
  console.log(`usage:`);
  console.log(`node ${name} "__add 1 1"`);
  console.log(`node ${name} -f path/to/input.nix`);
  process.exit(1);
}

const text = (
  !process.stdin.isTTY
    ? readFileSync(0).toString() // read from stdin
    : (process.argv[2] == '-f')
      ? readFileSync(process.argv[3], 'utf8')
      : process.argv[2]
);

var parser = parserImported; // allow reassign

import { formatErrorContext } from './format-error-context.js';

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
    e.message += '\n\n' + formatErrorContext(text, pos);
  }
  throw e;
}

//console.dir(actual, { depth: 5 });


console.log(stringifyTree(actual));
console.log();
console.log(stringifyTree(actual, {pretty: true, text }));
console.log();
console.log(stringifyTree(actual, {human: true, text }));
