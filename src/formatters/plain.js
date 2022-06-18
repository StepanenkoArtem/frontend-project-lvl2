import _ from 'lodash';

const formatValue = (value) => {
  if (_.isArray(value) || _.isObject(value)) return '[complex value]';
  if (_.isBoolean(value) || _.isNull(value) || _.isNumber(value)) return value;
  return `'${value}'`;
};

const formatLine = (path, node) => {
  const { before, after, status } = node;

  const line = {
    MODIFIED: `Property '${path}' was updated. From ${formatValue(before)} to ${formatValue(after)}`,
    DELETED: `Property '${path}' was removed`,
    ADDED: `Property '${path}' was added with value: ${formatValue(after)}`,
  };

  return line[status];
};

const view = (diff, path) => {
  const lines = Object.keys(diff).map(
    (key) => {
      const currentNode = diff[key];
      const currentPath = _.compact([path, key]).join('.');
      if (_.has(currentNode, 'status')) return formatLine(currentPath, currentNode);

      return view(currentNode, currentPath);
    },
  );

  return _.compact(lines).join('\n');
};

export default view;
