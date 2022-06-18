import _ from 'lodash';

// Indentation settings
const PLACEHOLDER = ' ';
const SPACE_COUNT = 4;

const shift = (depth) => PLACEHOLDER.repeat(depth * SPACE_COUNT);

const endLine = (depth) => `${shift(depth)}}`;

const formatToken = (token) => `  ${token} `;

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

const template = (key, value, token, depth) => `${shift(depth)}${formatToken(token)}${key}: ${formatLine(value, depth)}`;

const view = (diff, depth = 0) => {
  const addLine = (key, node) => {
    const { status, before, after } = node;

    const line = {
      ADDED: template(key, after, '+', depth),
      DELETED: template(key, before, '-', depth),
      MODIFIED: [template(key, before, '-', depth), template(key, after, '+', depth)],
      UNCHANGED: template(key, before, ' ', depth),
    };
    return line[status];
  };

  const lines = Object.keys(diff).flatMap((key) => {
    const currentNode = diff[key];

    if (_.has(currentNode, 'status')) {
      return addLine(key, currentNode);
    }
    return `${shift(depth)}${formatToken(' ')}${key}: ${view(currentNode, depth + 1)}`;
  });

  return ['{', ...lines, endLine(depth)].join('\n');
};

export default view;
