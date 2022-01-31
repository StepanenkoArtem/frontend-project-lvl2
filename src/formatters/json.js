import _ from 'lodash';

export default (diff) => {
  const result = [];

  const diffKeys = _.keys(diff);

  diffKeys.forEach((key) => {
    const { status } = diff[key];
    const keyValue = `${key}: ${diff[key].value}`;
    switch (status) {
      case 'unchanged':
        result.push(`   ${keyValue}`); break;
      case 'added':
        result.push(` + ${keyValue}`); break;
      case 'deleted':
        result.push(` - ${keyValue}`); break;
      case 'changed': {
        result.push(` - ${key}: ${diff[key].value.from}`);
        result.push(` + ${key}: ${diff[key].value.to}`);
        break;
      }
      default:
    }
  });
  return `{\n${result.join('\n')}\n}`;
};
