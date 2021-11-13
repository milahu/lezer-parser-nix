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

const devMode = true; // development mode

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
      if (devMode) console.log(`  break 32`);
      break
    } else if (next == singlequote) {
      if (afterQuote) {
        if (devMode) console.log(`  found singlequote 2`);
        input.advance()
        if (i == 1) {
          // empty string
          if (devMode) console.log(`  acceptToken(stringBlockEnd) with empty string`);
          input.acceptToken(stringBlockEnd)
        }
        else {
          if (devMode) console.log(`  acceptToken(StringBlockContent, -2)`);
          input.acceptToken(StringBlockContent, -2)
          if (devMode) console.log(`  acceptToken(stringBlockEnd)`);
          input.acceptToken(stringBlockEnd)
        }
        afterQuote = false
        if (devMode) console.log(`  break 50`);
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
      if (devMode) console.log(`  break 66`);
      break
    } else if (next == newline && i > 0) {
      // Break up stringBlock strings on lines, to avoid huge tokens
      input.advance() // add newline to current token
      if (devMode) console.log(`  acceptToken(StringBlockContent) from newline`);
      input.acceptToken(StringBlockContent)
      if (devMode) console.log(`  break 73`);
      break
    } else if (next == backslash) {
      input.advance()
    }
    afterDollar = next == dollar
    input.advance()
  }
})
