import {styleTags, tags as t} from "@lezer/highlight"

export const nixHighlighting = styleTags({
  Identifier: t.propertyName,
  TRUE: t.bool,
  FALSE: t.bool,
  String: t.string,
  StringContent: t.string,
  IndentedString: t.string,
  IndentedStringContent: t.string,
  Comment: t.lineComment,
  CommentBlock: t.blockComment,
  Float: t.float,
  Integer: t.integer,
  NULL: t.null,
  URI: t.url,
  //SPath: t.literal, // TODO what is stringpath? not implemented in nix.grammar
  Path: t.literal,
  "( )": t.paren,
  "{ }": t.brace,
  "[ ]": t.squareBracket,
  "if then else": t.controlKeyword,
  "import with let in rec builtins inherit assert or": t.keyword,
})