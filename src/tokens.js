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
    if (devMode) console.log([
      `\ni = ${i}`,
      `next = ${next} = ${JSON.stringify(String.fromCharCode(next))}`,
      `peek(1) = ${input.peek(1)} = ${JSON.stringify(String.fromCharCode(input.peek(1)))}`,
      `peek(2) = ${input.peek(2)} = ${JSON.stringify(String.fromCharCode(input.peek(2)))}`,
      `afterQuote = ${afterQuote}`,
      `afterDollar = ${afterDollar}`
    ].join(' + '));
    if (next < 0) { // next == -1: end of file
      if (i) {
        input.acceptToken(StringBlockContent)
        if (devMode) console.log(`  37 acceptToken(StringBlockContent)`);
      }
      if (devMode) console.log(`  39 break`);
      break
    } else if (next == singlequote) {
      if (input._todoStringBlockEnd) {
        // end of string
        input.advance(2)
        input.acceptToken(stringBlockEnd)
        if (devMode) console.log(`  46 acceptToken(stringBlockEnd)`);
        input._todoStringBlockEnd = false
        break
      }
     if (input.peek() == singlequote) {
        if (i) {
          // end of content
          input.acceptToken(StringBlockContent)
          if (devMode) console.log(`  54 acceptToken(StringBlockContent) -> break`);
          input._todoStringBlockEnd = true
        }
        else {
          // end of string
          input.advance(2)
          input.acceptToken(stringBlockEnd)
          if (devMode) console.log(`  60 acceptToken(stringBlockEnd) -> break`);
        }
        break
      }
    } else if (next == braceL && afterDollar) {
      if (i == 1) {
        if (devMode) console.log(`  67 acceptToken(stringBlockInterpolationStart)`);
        input.acceptToken(stringBlockInterpolationStart, 1)
      }
      else {
        if (devMode) console.log(`  71 acceptToken(StringBlockContent, -1)`);
        input.acceptToken(StringBlockContent, -1)
      }
      if (devMode) console.log(`  74 break`);
      break
    } else if (next == newline && i > 0) {
      // Break up stringBlock strings on lines, to avoid huge tokens
      input.advance() // add newline to current token
      if (devMode) console.log(`  79 acceptToken(StringBlockContent) from newline`);
      input.acceptToken(StringBlockContent)
      if (devMode) console.log(`  81 break`);
      break
    } else if (next == backslash) {
      if (devMode) console.log(`  84 backslash advance`);
      input.advance()
    }
    afterDollar = next == dollar
    if (devMode) console.log(`  88 advance -> continue loop`);
    input.advance()
  }
})
