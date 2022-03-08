import _ from 'lodash';
import {
  DELETED, MODIFIED, ADDED,
} from '../constants.js';

export default (diff) => {
  const result = [];

  const diffKeys = _.keys(diff);

  diffKeys.forEach((key) => {
    const { status } = diff[key];
    const keyValue = `${key}: ${diff[key].value}`;
    switch (status) {
      case ADDED:
        result.push(` + ${keyValue}`); break;
      case DELETED:
        result.push(` - ${keyValue}`); break;
      case MODIFIED: {
        result.push(` - ${key}: ${diff[key].value.from}`);
        result.push(` + ${key}: ${diff[key].value.to}`);
        break;
      }
      default: {
        result.push(`   ${keyValue}`); break;
      }
    }
  });
  return `{\n${result.join('\n')}\n}`;
};
