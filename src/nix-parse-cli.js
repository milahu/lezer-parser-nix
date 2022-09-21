import {parser as parserImported} from "../dist/index.js"
import {stringifyTree} from "./nix-format.js"
import {readFileSync} from "node:fs"

const argv = process.argv.slice(1);

const { text } = (() => {
  if (!process.stdin.isTTY) { // FIXME condition for stdin
    return {
      text: readFileSync(0).toString(), // read from stdin
    };
  }
  if (argv[1] == '-f') {
    return {
      text: readFileSync(argv[2], 'utf8'),
    };
  }
  if (argv[1] == '-e') {
    return {
      text: argv[2],
    };
  }
  const name = argv[0].split('/').pop();
  console.error(`usage:`);
  console.error(`node ${name} -e "__add 1 1"`);
  console.error(`node ${name} -f path/to/input.nix`);
  console.error(`echo "__add 1 1" | node ${name}`);
  process.exit(1);
})();

if (text === undefined) {
  throw new Error('text is undefined');
}

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
