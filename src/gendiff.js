import _ from 'lodash';
import difftree from './difftree.js';
import parse from './parsers.js';
import format from './formatters/index.js';
import getContent from './readers/readFile.js';

const getContentType = (filename) => _.last(filename.split('.'));

export default (beforeFilepath, afterFilepath, outputFormat) => {
  const beforeContentType = getContentType(beforeFilepath);
  const afterContentType = getContentType(afterFilepath);

  const beforeContent = getContent(beforeFilepath);
  const afterContent = getContentType(afterFilepath);

  const before = parse({ content: beforeContent, type: beforeContentType });
  const after = parse({ content: afterContent, type: afterContentType });

  return format(difftree(before, after), outputFormat);
};
