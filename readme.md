# lezer-parser-nix

This is a Nix grammar for the
[lezer](https://lezer.codemirror.net/) parser system.

The code is licensed under an MIT license.

## Dev

To watch & test, with [entr](http://eradman.com/entrproject/) installed run `npm run watch`

## usage

* [monaco-lezer-parser](https://github.com/milahu/monaco-lezer-parser) - use lezer parsers in monaco-editor
  * also has a grammar file for nix: `monaco-lezer-parser/grammars/nix.json`
* [codemirror editor](https://github.com/codemirror/view) has native support for lezer parsers
  * pro: lightweight, modular
  * con: less mature than monaco-editor

## demos

* [nixos-config-webui](https://github.com/milahu/nixos-config-webui) - web editor for nix files
* [nix-eval-js](https://github.com/milahu/nix-eval-js) - nix interpreter in javascript

## similar projects

* [codemirror-lang-nix](https://github.com/replit/codemirror-lang-nix) - nix language for codemirror editor
  * [syntax.grammar](https://github.com/replit/codemirror-lang-nix/blob/main/src/syntax.grammar) - nix grammar for lezer parser

## related

this project is based on

* https://lezer.codemirror.net/docs/guide/#writing-a-grammar
* https://lezer.codemirror.net/docs/ref/
* https://github.com/lezer-parser/clojure/blob/master/src/clojure.grammar
  * hard fork from commit [172cf31](https://github.com/lezer-parser/clojure/commit/172cf311376271a95986978e7041cb7dbd3fdd57)
* https://github.com/lezer-parser/javascript/blob/main/src/javascript.grammar
  * https://github.com/lezer-parser/javascript/blob/main/src/tokens.js
* https://github.com/lezer-parser/xml/blob/main/src/tokens.js

other Nix parsers

* https://github.com/cstrahan/tree-sitter-nix/blob/master/grammar.js
  * https://github.com/cstrahan/tree-sitter-nix/blob/master/src/scanner.c
* https://github.com/NixOS/nix/blob/master/src/libexpr/parser.y

Nix language spec

* https://nixos.org/manual/nix/unstable/expressions/expression-language.html
* https://nixos.wiki/wiki/Nix_Expression_Language
* https://nixery.dev/nix-1p.html
