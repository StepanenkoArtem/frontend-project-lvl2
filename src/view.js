import _ from 'lodash';
import genDiff from './gendiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';
import getContent from './readers/readFile.js';

const getContentType = (filename) => _.last(filename.split('.'));

export default (beforeFilepath, afterFilepath, outputFormat) => {
  const [beforeContentType, afterContentType] = [beforeFilepath, afterFilepath].map(getContentType);
  const [beforeContent, afterContent] = [beforeFilepath, afterFilepath].map(getContent);

  const before = parse({ content: beforeContent, type: beforeContentType });
  const after = parse({ content: afterContent, type: afterContentType });

  return format(genDiff(before, after), outputFormat);
};
