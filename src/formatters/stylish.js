import { ADDED, DELETED, MODIFIED, UNCHANGED } from "../constants.js";
import _ from "lodash";

// Indentation settings
const PLACEHOLDER = ' ';
const SPACE_COUNT = 4;

const shift = (depth) => PLACEHOLDER.repeat(depth * SPACE_COUNT);


const endLine = (depth) => `${shift(depth)}}`;

const formatToken = (token) => `  ${token} `;

const hasStatus = (node) => (_.has(node, 'status'));

const formatLine = (line, depth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;


    const indentSize = (depth + 1) * SPACE_COUNT;
    const currentIndent = PLACEHOLDER.repeat(indentSize);
    //const bracketIndent = PLACEHOLDER.repeat(indentSize - SPACE_COUNT);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${formatToken(' ')}${key}: ${iter(val, depth + 1)}`);

    return [
      `{`,
      ...lines,
      `${currentIndent}}`,
    ].join('\n');
  };

  return iter(line, depth);
};


export const genView = (diff, depth = 0) => {
  //console.log(JSON.stringify(diff, " ", 4))
  const lines = ['{'];

  const addLine = (key, node, d) => {
    const { status, before, after } = node;

    switch (status) {
      case ADDED:

        lines.push(`${shift(depth)}${formatToken('+')}${key}: ${formatLine(after, depth)}`);
        break;
      case DELETED:
        lines.push(`${shift(depth)}${formatToken('-')}${key}: ${formatLine(before, depth)}`)
        break;
      case UNCHANGED:
        lines.push(`${shift(depth)}${formatToken(' ')}${key}: ${formatLine(before, depth)}`)
        break;
      case MODIFIED:
        lines.push(`${shift(depth)}${formatToken('-')}${key}: ${formatLine(before, depth)}`)
        lines.push(`${shift(depth)}${formatToken('+')}${key}: ${formatLine(after, depth)}`);
        break;
    }
  };

  Object.keys(diff)
    .map((key) => {
      const currentNode = diff[key];

      if (hasStatus(currentNode)) {
        addLine(key, currentNode, depth + 1)
      } else {
        lines.push(`${shift(depth)}${formatToken(' ')}${key}: ${genView(currentNode, depth +1)}`);
      }
    });

  lines.push(endLine(depth));
  return lines.join('\n');
};


export default genView;
