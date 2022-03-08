import _ from 'lodash';
import parse from './parsers.js';
import getContent from './readers/readFile.js';
import format from './formatters/formatter.js';
import {DELETED, ADDED, MODIFIED} from "./constants.js";

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
    diff[key] = { status: DELETED, payload: before[key] };
  });
  addedKeys.forEach((key) => {
    diff[key] = { status: ADDED, payload: after[key] };
  });
  commonKeys.forEach((key) => {
    if (_.isEqual(after[key], before[key])) {
      diff[key] = { payload: after[key] };
    } else if (_.isObject(before[key]) && _.isObject(after[key])) {
      diff[key] = { payload: makeDiff(before[key], after[key]) }
    } else {
      diff[key] = {
        status: MODIFIED,
        payload: { from: before[key], to: after[key] },
      };
    }
  });

  return sortByKeys(diff);
};

export default (beforeFilepath, afterFilepath, outputFormat = 'json') => {
  const [beforeContentType, afterContentType] = [beforeFilepath, afterFilepath].map(getContentType);
  const [beforeContent, afterContent] = [beforeFilepath, afterFilepath].map(getContent);

  const before = parse({ content: beforeContent, type: beforeContentType });
  const after = parse({ content: afterContent, type: afterContentType });

  return format(makeDiff(before, after), outputFormat);
};
