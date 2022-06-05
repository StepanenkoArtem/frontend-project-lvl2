import { ADDED, DELETED, MODIFIED, UNCHANGED } from "../constants.js";
import _ from "lodash";

// Indentation settings
const FILLER = '.';
const BACKSHIFT = 2

// Signs
const ADD = '+'
const DEL = '-'
const EMPTY = ' '

export const genView = (diff, space_count = 0) => {
  const shift = FILLER.repeat(space_count);
  const endWrapper = `${FILLER.repeat(BACKSHIFT)}}`
  const lines = [`${shift}{`];

  Object.keys(diff)
    .map((key) => {
      const currentNode = diff[key];

      const formatToken = (token) => `  ${token} `

      const addLine = (key, node) => {
        const { status, before, after } = node;
        // debugger;
        switch (status) {
          case ADDED:
            lines.push(`${shift}${formatToken(ADD)}${key}: ${formatLine(after)}`);
            break;
          case DELETED:
            lines.push(`${shift}${formatToken(DEL)}${key}: ${formatLine(before)}`);
            break;
          case UNCHANGED:
            lines.push(`${shift}${formatToken(EMPTY)}${key}: ${formatLine(before)}`);
            break;
          case MODIFIED:
            lines.push(`${shift}${formatToken(DEL)}${key}: ${formatLine(before)}`);
            lines.push(`${shift}${formatToken(ADD)}${key}: ${formatLine(after)}`);
            break;
        }
      };

      const formatLine = (line) => {
        if (!_.isObject(line)) {
          return line;
        }
      }

      if (!_.has(currentNode, 'status')) {
        lines.push(`${FILLER.repeat(space_count + 4)}${key}: ${genView(currentNode, space_count+4)}`);
      } else {
        // console.log( STATUS: $ { currentNode['status'] }`);
        addLine(key, currentNode);
      }
    })

  lines.push(endWrapper);
  return lines.join('\n')
};

export default genView;
