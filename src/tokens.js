/* Hand-written tokenizers for Nix tokens that can't be
   expressed by lezer's built-in tokenizer. */

import {ExternalTokenizer, ContextTracker} from "@lezer/lr"
import {
  StringBlockContent, stringBlockInterpolationStart, stringBlockEnd,
  StringContent, stringInterpolationStart, stringEnd,
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

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
export const stringBlock = new ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input
    if (devMode) console.log([
      `\ni = ${i}`,
      `next   = ${next} = ${JSON.stringify(String.fromCharCode(next))}`, // == input.peek(0)
      `peek 1 = ${input.peek(1)} = ${JSON.stringify(String.fromCharCode(input.peek(1)))}`,
      `peek 2 = ${input.peek(2)} = ${JSON.stringify(String.fromCharCode(input.peek(2)))}`,
      `afterDollar = ${afterDollar}`
    ].map(s => `  ${s}\n`).join(''));
    if (next < 0) { // next == -1: end of file
      if (i) {
        input.acceptToken(StringBlockContent)
        if (devMode) console.log(`  40 acceptToken(StringBlockContent)`);
      }
      if (devMode) console.log(`  42 break`);
      break
    } else if (next == singlequote) {
      if (input.peek(1) == singlequote) {
        if (i == 0) {
          // end of string
          input.advance(2)
          if (devMode) console.log(`  49 acceptToken(stringBlockEnd)`);
          input.acceptToken(stringBlockEnd)
          break
        }
        if (input.peek(2) == dollar && input.peek(3) == braceL) {
          // escaped interpolation
          if (devMode) console.log(`  56 escaped interpolation -> advance 2`);
          input.advance(2)
        }
        else {
          // i > 0
          // end of content
          if (devMode) console.log(`  63 acceptToken(StringBlockContent) -> break`);
          input.acceptToken(StringBlockContent)
          // do not advance. '' is needed for stringBlockEnd token
          break
        }
      }
    } else if (next == braceL && afterDollar) {
      if (i == 1) {
        if (devMode) console.log(`  77 acceptToken(stringBlockInterpolationStart)`);
        input.acceptToken(stringBlockInterpolationStart, 1)
      }
      else {
        if (devMode) console.log(`  81 acceptToken(StringBlockContent, -1)`);
        input.acceptToken(StringBlockContent, -1)
      }
      if (devMode) console.log(`  84 break`);
      break
    } else if (next == newline && i > 0) {
      // Break up stringBlock strings on lines, to avoid huge tokens
      input.advance() // add newline to current token
      if (devMode) console.log(`  89 acceptToken(StringBlockContent) from newline`);
      input.acceptToken(StringBlockContent)
      if (devMode) console.log(`  91 break`);
      break
    }
    afterDollar = next == dollar
    if (devMode) console.log(`  95 advance -> continue loop`);
    input.advance()
  }
})

// based on javascript template parser
// https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
export const string = new ExternalTokenizer(input => {
  for (let afterDollar = false, i = 0;; i++) {
    let {next} = input
    if (next < 0) {
      if (i) input.acceptToken(StringContent)
      break
    } else if (next == doublequote) {
      if (i) input.acceptToken(StringContent)
      else input.acceptToken(stringEnd, 1)
      break
    } else if (next == braceL && afterDollar) {
      if (i == 1) input.acceptToken(stringInterpolationStart, 1)
      else input.acceptToken(StringContent, -1)
      break
    } else if (next == newline && i) {
      // Break up template strings on lines, to avoid huge tokens
      input.advance()
      input.acceptToken(StringContent)
      break
    } else if (next == backslash) {
      input.advance()
    }
    afterDollar = next == dollar
    input.advance()
  }
})
