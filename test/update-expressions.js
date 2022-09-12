// based on test-parser.js
// based on manual-test.js

import {parser} from "../dist/index.js"
import {stringifyTree} from "./stringify-tree.js"

// use a patched version of fileTests to parse test files
// https://github.com/lezer-parser/generator/pull/7
// https://github.com/lezer-parser/generator/blob/main/src/test.ts
//import {fileTests} from "@lezer/generator/dist/test"
function toLineContext(file, index) {
  const endEol = file.indexOf('\n', index + 80);

  const endIndex = endEol === -1 ? file.length : endEol;

  return file.substring(index, endIndex).split(/\n/).map(str => '  | ' + str).join('\n');
}
const defaultIgnore = false
function fileTests(file, fileName, mayIgnore = defaultIgnore) {
  let caseExpr = /\s*#\s*(.*)(?:\r\n|\r|\n)([^]*?)==+>([^]*?)(?:$|(?:\r\n|\r|\n)+(?=#))/gy
  let tests = []
  let lastIndex = 0;
  for (;;) {
    let m = caseExpr.exec(file)
    if (!m) throw new Error(`Unexpected file format in ${fileName} around\n\n${toLineContext(file, lastIndex)}`)

    //let [, name, configStr] = /(.*?)(\{.*?\})?$/.exec(m[1])! // typescript
    let execResult = /(.*?)(\{.*?\})?$/.exec(m[1])
    if (execResult === null) throw Error('execResult is null')
    let [, name, configStr] = execResult

    let text = m[2].trim(), expected = m[3].trim()
    let config = configStr ? JSON.parse(configStr) : null
    let strict = !/⚠|\.\.\./.test(expected)

    tests.push({
      name,
      text,
      expected,
      configStr,
      config,
      strict,
      /*
      run(parser) {
        if (parser.configure && (strict || config))
          parser = parser.configure({strict, ...config})
        testTree(parser.parse(text), expected, mayIgnore)
      },
      */
    })
    lastIndex = m.index + m[0].length
    if (lastIndex == file.length) break
  }
  return tests
}

import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url';
let caseDir = path.dirname(fileURLToPath(import.meta.url))

const writePrettyTree = true

for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue
  //let fileName = /^[^\.]*/.exec(file)[0]
  let filePath = path.join(caseDir, file)
  let fileContent = fs.readFileSync(filePath, "utf8")
  const result = []
  for (let testData of fileTests(fileContent, file)) {
    const { name, text, expected: oldExpected, configStr, strict } = testData;
    const tree = parser.parse(testData.text);
    const stringifyOptions = writePrettyTree && { pretty: true, text };
    const newExpected = stringifyTree(tree, stringifyOptions);
    // debug
    //if (name == 'some test name') {
    //  console.dir(testData)
    //}
    result.push(`# ${name}${(configStr || '')}\n${text}\n==>\n${newExpected}`)

    const oldExpectedErrors = (oldExpected.match(/⚠/g) || []).length;
    const newExpectedErrors = (newExpected.match(/⚠/g) || []).length;

    if (oldExpectedErrors != newExpectedErrors) {
      console.log(`# ${name}\n# error count changed: ${oldExpectedErrors} -> ${newExpectedErrors}\n# old expected:\n${oldExpected}\n# new expected:\n${newExpected}\n`)
    }

    /* too complex. simple: log to console if error count has changed vs the last version
    // WONTFIX?
    // parse error -> make test fail by adding " ☹ FIXME"
    // note: to test for parse errors, add ⚠ to the test name
    // other error symbols: ❌ 🚫 ☹ ⚐ ⛔ 🐞
    // note: strict is useless here
    //   let strict = !/⚠|\.\.\./.test(expected)
    const isFailing = /⚠|\.\.\./.test(newExpected) // TODO do we need to test for "..."?
    const shouldFailMarker = '❌ FIXME this test should fail. if this test should pass, remove ⚠ from the test name\n';
    const shouldPassMarker = '❌ FIXME this test should pass. if this test should fail, add ⚠ to the test name\n';
    
    // FIXME
    const shouldFail = (newExpected.indexOf(shouldFailMarker) > -1);
    const hasMarker = (newExpected.indexOf(shouldFailMarker) > -1) || (newExpected.indexOf(shouldPassMarker) > -1);

    // NOTE oldExpectedErrors is a custom convention we use here,
    // to mark tests with known parse errors.
    // this is non-standard, but useful for this script.
    const oldExpectedErrors = (name.match(/⚠/g) || []).length;
    const actualErrors = (newExpected.match(/⚠/g) || []).length;
    let actualWithFixme = newExpected;
    if (oldExpectedErrors != actualErrors) {
      const shouldWhat = (oldExpectedErrors > 0) ? 'fail' : 'pass';
      const helpMessage = (
        '\n❌ if this test should pass, remove all ⚠ from the test name.' +
        '\n❌ if this test should fail, add ⚠ to the test name, one ⚠ for each error.'
      );
      actualWithFixme = `❌ FIXME this test should ${shouldWhat}. expected ${oldExpectedErrors} errors, actual ${actualErrors} errors.${helpMessage}\n` + actualWithFixme;
    }
    result.push(`# ${name}${(configStr || '')}\n${text}\n==>\n${actualWithFixme}`)
    */
  }
  const newFileContent = result.join("\n\n") + "\n";
  // TODO backup?
  console.log(`writing ${filePath}`);
  fs.writeFileSync(filePath, newFileContent, "utf8");
}
