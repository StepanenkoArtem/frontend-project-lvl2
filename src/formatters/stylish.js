import {ADDED, DELETED, MODIFIED} from "../constants.js";
import _ from "lodash";

export default (diff) => {
  const iter = (node, depth = 1) => {
    const shift = " ".repeat(depth * 2);

    const formatLine = (token, key, content) => {
      if (_.isObject(content)) {
        return `${shift}${token} ${key}: ${JSON.stringify(content, " ", 4)}`
      } else {
        return `${shift}${token} ${key}: ${content}`;
      }
    }

    return Object
      .keys(node)
      .flatMap((key) => {
        const lines = [`{\n`];
        const { status, before, after } = node[key];
        if (status === DELETED) {
          lines.push(formatLine("-", key, before));
        }
        if (status === ADDED) {
          lines.push(formatLine("+", key, after));
        }
        if (status === MODIFIED) {
          lines.push(formatLine("-", key, before));
          lines.push(formatLine("+", key, after));
        }
        if (!status) {
          lines.push(formatLine( " ", key, iter(node[key], depth + 1)));
          lines.push("\n}");
        }
        return lines;
      })
      .join('')
  }

  return iter(diff);
}
