import _ from 'lodash';

export default (diff) => {
  const result = [];

  const diffKeys = _.keys(diff);

  diffKeys.forEach((key) => {
    const keyValue = `${key} : ${diff[key].value}`
    if (diff[key].status == 'unchanged') {
      result.push(`   ${keyValue}`);
    }
    if (diff[key].status == 'added') {
      result.push(` + ${keyValue}`);
    }
    if (diff[key].status == 'deleted') {
      result.push(` - ${keyValue}`);
    }
    if (diff[key].status == 'changed') {
      result.push(` - ${key}: ${diff[key].value.from}`);
      result.push(` + ${key}: ${diff[key].value.to}`);
    }
  });
  return `{\n${result.join('\n')}\n}`
}
