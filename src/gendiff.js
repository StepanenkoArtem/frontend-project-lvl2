import _ from 'lodash';
import difftree from './difftree.js';
import parse from './parsers.js';
import format from './formatters/index.js';
import getContent from './readers/readFile.js';

const getContentType = (filename) => _.last(filename.split('.'));

export default (firstFilepath, secondFilepath, outputFormat) => {
  const first = parse(
    getContent(firstFilepath),
    getContentType(firstFilepath),
  );

  const second = parse(
    getContent(secondFilepath),
    getContentType(secondFilepath),
  );

  return format(difftree(first, second), outputFormat);
};
