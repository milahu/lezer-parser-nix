/* Hand-written tokenizers for Nix tokens that can't be
   expressed by lezer's built-in tokenizer. */

import {ExternalTokenizer, ContextTracker} from "@lezer/lr"
import {
  StringBlockContent, stringBlockInterpolationStart, stringBlockEnd,
} from "./parser.terms.js"

const space = [
  9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200,
  8201, 8202, 8232, 8233, 8239, 8287, 12288
]

const devMode = false; // development mode

const
  braceR = 125, braceL = 123, semicolon = 59, slash = 47, star = 42,
  plus = 43, minus = 45, dollar = 36, backtick = 96, backslash = 92,
  doublequote = 34, singlequote = 39, newline = 10

// based on javascript template
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
export const stringBlock = new ExternalTokenizer(input => {
  for (let afterDollar = false, afterQuote = false, i = 0;; i++) {
    let {next} = input
    if (devMode) console.log(`i = ${i} + next = ${next} = ${JSON.stringify(String.fromCharCode(next))} + afterQuote = ${afterQuote} + afterDollar = ${afterDollar}`);
    if (next < 0) { // next == -1: end of file
      if (i) {
        input.acceptToken(StringBlockContent)
        if (devMode) console.log(`  acceptToken(StringBlockContent)`);
      }
      if (devMode) console.log(`  break`);
      break
    } else if (next == singlequote) {
      const next2 = input.peek(1);
      if (devMode) console.log(`i = ${i} + next2 = ${next2} = ${JSON.stringify(String.fromCharCode(next2))}`);
      if (next2 == singlequote) {
        if (devMode) console.log(`  acceptToken(StringBlockContent)`);
        input.acceptToken(StringBlockContent)
        if (devMode) console.log(`  advance`);
        input.advance()
        if (devMode) console.log(`  acceptToken(stringBlockEnd)`);
        input.acceptToken(stringBlockEnd, 1) // end
        if (devMode) console.log(`  break`);
        break
      }
      if (afterQuote) {
        if (devMode) console.log(`  found singlequote 2`);
        if (i == 1) {
          // empty string
          if (devMode) console.log(`  acceptToken(stringBlockEnd, 1)`);
          input.acceptToken(stringBlockEnd, 1) // end
        }
        else {
          if (devMode) console.log(`  acceptToken(StringBlockContent)`);
          input.acceptToken(StringBlockContent)
        }
        afterQuote = false
        if (devMode) console.log(`  break`);
        break
      }
      else {
        if (devMode) console.log(`  found singlequote 1`);
        afterQuote = true
      }
    } else if (next == braceL && afterDollar) {
      if (i == 1) {
        if (devMode) console.log(`  acceptToken(stringBlockInterpolationStart)`);
        input.acceptToken(stringBlockInterpolationStart, 1)
      }
      else {
        if (devMode) console.log(`  acceptToken(StringBlockContent, -1)`);
        input.acceptToken(StringBlockContent, -1)
      }
      if (devMode) console.log(`  break`);
      break
    } else if (next == newline && i) {
      // Break up stringBlock strings on lines, to avoid huge tokens
      input.advance()
      if (devMode) console.log(`  acceptToken(StringBlockContent)`);
      input.acceptToken(StringBlockContent)
      break
    } else if (next == backslash) {
      input.advance()
    }
    afterDollar = next == dollar
    input.advance()
  }
})
