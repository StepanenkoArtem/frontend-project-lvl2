import _ from 'lodash';
import {
  ADDED, DELETED, MODIFIED, UNCHANGED, TREE,
} from './constants.js';

const sortByKeys = (obj) => _.sortBy(Object.keys(obj))
  .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

const difftree = (first, second) => {
  const keys = _.uniq([...Object.keys(first), ...Object.keys(second)]);

  const diff = keys.reduce((acc, key) => {
    if (_.isEqual(second[key], first[key])) {
      return { ...acc, [key]: { status: UNCHANGED, first: first[key] } };
    }
    if (_.has(first, [key]) && !_.has(second, [key])) {
      return { ...acc, [key]: { status: DELETED, first: first[key] } };
    }
    if (!_.has(first, [key]) && _.has(second, [key])) {
      return { ...acc, [key]: { status: ADDED, second: second[key] } };
    }
    if (_.isPlainObject(first[key]) && _.isPlainObject(second[key])) {
      return { ...acc, [key]: { status: TREE, tree: difftree(first[key], second[key]) } };
    }
    return { ...acc, [key]: { status: MODIFIED, first: first[key], second: second[key] } };
  }, {});

  return sortByKeys(diff);
};

export default difftree;
