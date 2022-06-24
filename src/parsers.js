import * as yaml from 'js-yaml';

export default ({ type, content }) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error(`Format '${type}' is not supported`);
  }
};
