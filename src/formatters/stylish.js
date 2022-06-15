import _ from 'lodash';

// Indentation settings
const PLACEHOLDER = ' ';
const SPACE_COUNT = 4;

const shift = (depth) => PLACEHOLDER.repeat(depth * SPACE_COUNT);

const endLine = (depth) => `${shift(depth)}}`;

const formatToken = (token) => `  ${token} `;

const hasStatus = (node) => _.has(node, 'status');

const formatLine = (line, depth) => {
  const iter = (currentValue, innerDepth) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;

    const indentSize = (innerDepth + 1) * SPACE_COUNT;
    const currentIndent = PLACEHOLDER.repeat(indentSize);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${formatToken(' ')}${key}: ${iter(val, innerDepth + 1)}`);

    return ['{', ...lines, `${currentIndent}}`].join('\n');
  };
  return iter(line, depth);
};

const genView = (diff, depth = 0) => {
  const addLine = (key, node) => {
    const { status, before, after } = node;

    const line = {
      ADDED: `${shift(depth)}${formatToken('+')}${key}: ${formatLine(after, depth)}`.trimEnd(),
      DELETED: `${shift(depth)}${formatToken('-')}${key}: ${formatLine(before, depth)}`.trimEnd(),
      MODIFIED: [
        `${shift(depth)}${formatToken('-')}${key}: ${formatLine(before, depth)}`.trimEnd(),
        `${shift(depth)}${formatToken('+')}${key}: ${formatLine(after, depth)}`.trimEnd(),
      ],
      UNCHANGED: `${shift(depth)}${formatToken(' ')}${key}: ${formatLine(before, depth)}`.trimEnd(),
    };
    return line[status];
  };

  const lines = Object.keys(diff).flatMap((key) => {
    const currentNode = diff[key];

    if (hasStatus(currentNode)) {
      return addLine(key, currentNode);
    }
    return `${shift(depth)}${formatToken(' ')}${key}: ${genView(currentNode, depth + 1)}`;
  });

  return ['{', ...lines, endLine(depth)].join('\n');
};

export default genView;
