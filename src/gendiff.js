import _ from 'lodash';
import {
  ADDED, DELETED, MODIFIED, UNCHANGED,
} from './constants.js';

const sortByKeys = (obj) => _.sortBy(Object.keys(obj))
  .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

const genDiff = (first, second) => {
  const firstKeys = Object.keys(first);
  const secondKeys = Object.keys(second);

  const commonKeys = _.intersection(firstKeys, secondKeys);
  const deletedKeys = _.difference(firstKeys, secondKeys);
  const addedKeys = _.difference(secondKeys, firstKeys);

  const deleted = deletedKeys
    .reduce((acc, key) => ({ ...acc, [key]: { status: DELETED, first: first[key] } }), {});

  const added = addedKeys
    .reduce((acc, key) => ({ ...acc, [key]: { status: ADDED, second: second[key] } }), {});

  const common = commonKeys.reduce((acc, key) => {
    if (_.isEqual(second[key], first[key])) {
      return { ...acc, [key]: { status: UNCHANGED, first: first[key] } };
    }
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return { ...acc, [key]: genDiff(first[key], second[key]) };
    }
    return { ...acc, [key]: { status: MODIFIED, first: first[key], second: second[key] } };
  }, {});

  return sortByKeys({ ...deleted, ...added, ...common });
};

export default genDiff;
