import _ from 'lodash';
import parse from './parsers.js';
import getContent from './readers/readFile.js';
import format from './formatters/index.js';
import {
  ADDED, DELETED, MODIFIED, UNCHANGED,
} from './constants.js';

const getContentType = (filename) => _.last(filename.split('.'));

const sortByKeys = (obj) => Object.keys(obj)
  .sort()
  .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});

const makeDiff = (before, after) => {
  const diff = {};
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const commonKeys = _.intersection(beforeKeys, afterKeys);
  const deletedKeys = _.difference(beforeKeys, afterKeys);
  const addedKeys = _.difference(afterKeys, beforeKeys);

  deletedKeys.forEach((key) => {
    diff[key] = { status: DELETED, before: before[key] };
  });

  addedKeys.forEach((key) => {
    diff[key] = { status: ADDED, after: after[key] };
  });

  commonKeys.forEach((key) => {
    if (_.isEqual(after[key], before[key])) {
      diff[key] = {
        status: UNCHANGED,
        before: before[key],
      };
    } else if (_.isObject(before[key]) && _.isObject(after[key])) {
      diff[key] = makeDiff(before[key], after[key]);
    } else {
      diff[key] = {
        status: MODIFIED,
        before: before[key],
        after: after[key],
      };
    }
  });

  return sortByKeys(diff);
};

export default (beforeFilepath, afterFilepath, outputFormat = 'stylish') => {
  const [beforeContentType, afterContentType] = [beforeFilepath, afterFilepath].map(getContentType);
  const [beforeContent, afterContent] = [beforeFilepath, afterFilepath].map(getContent);

  const before = parse({ content: beforeContent, type: beforeContentType });
  const after = parse({ content: afterContent, type: afterContentType });

  return format(makeDiff(before, after), outputFormat);
};
