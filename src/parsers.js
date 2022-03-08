import * as yaml from 'js-yaml';

export default ({type, content}) => {
  const parsers = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load,
  };
  return parsers[type](content);
};
