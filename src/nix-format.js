export function stringifyTree(tree, options) {

  if (!options) options = {};
  const pretty = options.pretty || false;
  const human = options.human || false; // human readable, like python or yaml
  const compact = (!pretty && !human);
  const format = compact ? 'compact' : pretty ? 'pretty' : human ? 'human' : null;
  const source = options.text || '';
  const indentStep = options.indent || '  ';

  const cursor = tree.cursor();
  if (!cursor) return '';

  let depth = 0;
  let result = '';

  const indent = () => indentStep.repeat(depth);
  const cursorType = () => cursor.name;
  const cursorText = () => source.slice(cursor.from, cursor.to);

  const formatNodeByFormat = {
    human: () => `${indent()}${cursorType()}: ${cursorText()}\n`,
    pretty: () => `${indent()}${cursorType()}`,
    compact: () => cursorType(),
  };
  const formatNode = formatNodeByFormat[format];

  while (true) {
    // NLR: Node, Left, Right
    // Node
    result += formatNode()
    // Left
    if (cursor.firstChild()) {
      // moved down
      depth++;
      if (compact) result += '('
      if (pretty) result += ' (\n'
      continue;
    }
    // Right
    if (cursor.nextSibling()) {
      // moved right
      if (compact) result += ','
      if (pretty) result += ',\n'
      continue;
    }
    let continueMainLoop = false;
    let firstUp = true;
    while (cursor.parent()) {
      // moved up
      depth--;
      if (compact) result += ')'
      if (pretty && firstUp) result += `\n`
      if (pretty) result += `${indent()})`
      if (cursor.nextSibling()) {
        // moved up + right
        continueMainLoop = true;
        if (compact) result += ','
        if (pretty) result += ',\n'
        break;
      }
      if (pretty) result += `\n`
      firstUp = false;
    }
    if (continueMainLoop) continue;

    break;
  }

  return result;
}
