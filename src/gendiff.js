import _ from 'lodash';
import parse from "./parsers/json.js"
import getContent from "./readers/readFile.js";
import format from './formatters/formatter.js'

export default (beforeFilepath, afterFilepath, outputFormat='json') => {
  const [beforeContentType, afterContentType] = [beforeFilepath, afterFilepath].map(getContentType);
  const [beforeContent, afterContent] = [beforeFilepath, afterFilepath].map(getContent);

  const before = parse({ content: beforeContent, type: beforeContentType });
  const after = parse({ content: afterContent,  type: afterContentType });

  return format(
    makeDiff(before, after),
    outputFormat
  );
}

const getContentType = (filename) => _.last(filename.split('.'));

const makeDiff = (before, after) => {
  const diff = {};
  const beforeKeys = Object.keys(before);
  const afterKeys = Object.keys(after);

  const commonKeys = _.intersection( beforeKeys, afterKeys);
  const deletedKeys = _.difference(beforeKeys, afterKeys);
  const addedKeys = _.difference(afterKeys, beforeKeys);

  deletedKeys.forEach((key) => {
    diff[key] = {value: before[key], status: 'deleted'};
  });
  addedKeys.forEach((key) => {
    diff[key] = { value: after[key], status: 'added'};
  });
  commonKeys.forEach((key) => {
    if (after[key] === before[key]) {
      diff[key] = { value: after[key], status: 'unchanged'};
      return;
    }
    diff[key] = {
      value: {from: before[key], to: after[key]},
      status: 'changed',
    }
  })
  return sortByKeys(diff);
}

const sortByKeys = (obj) => Object.keys(obj).sort().reduce((acc, key) => ({...acc, [key]: obj[key]}), {})

