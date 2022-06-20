import _ from 'lodash';
import parse from './parsers.js';
import getContent from './readers/readFile.js';
import format from './formatters/index.js';
import {
  ADDED, DELETED, MODIFIED, UNCHANGED,
} from './constants.js';

const getContentType = (filename) => _.last(filename.split('.'));

const sortByKeys = (obj) => _.sortBy(Object.keys(obj))
  .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

const makeDiff = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const commonKeys = _.intersection(beforeKeys, afterKeys);
  const deletedKeys = _.difference(beforeKeys, afterKeys);
  const addedKeys = _.difference(afterKeys, beforeKeys);

  const deleted = deletedKeys
    .reduce((acc, key) => ({ ...acc, [key]: { status: DELETED, before: before[key] } }), {});

  const added = addedKeys
    .reduce((acc, key) => ({ ...acc, [key]: { status: ADDED, after: after[key] } }), {});

  const common = commonKeys.reduce((acc, key) => {
    if (_.isEqual(after[key], before[key])) {
      return { ...acc, [key]: { status: UNCHANGED, before: before[key] } };
    }
    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return { ...acc, [key]: makeDiff(before[key], after[key]) };
    }
    return { ...acc, [key]: { status: MODIFIED, before: before[key], after: after[key] } };
  }, {});

  return sortByKeys({ ...deleted, ...added, ...common });
};

export default (beforeFilepath, afterFilepath, outputFormat = 'stylish') => {
  const [beforeContentType, afterContentType] = [beforeFilepath, afterFilepath].map(getContentType);
  const [beforeContent, afterContent] = [beforeFilepath, afterFilepath].map(getContent);

  const before = parse({ content: beforeContent, type: beforeContentType });
  const after = parse({ content: afterContent, type: afterContentType });

  return format(makeDiff(before, after), outputFormat);
};
