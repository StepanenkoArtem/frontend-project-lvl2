import * as yaml from 'js-yaml';

export default ({ type, content }) => {
  switch (type) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      console.error('Unsupported file format');
      process.exit(1);
  }
};
