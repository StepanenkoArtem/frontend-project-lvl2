import _ from 'lodash';

const hasStatus = (node) => _.has(node, 'status');

const formatValue = (value) => {
  if (_.isArray(value) || _.isObject(value)) return '[complex value]';
  if (_.isBoolean(value) || _.isNull(value)) return value;
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

const plain = (diff, path) => {
  const lines = Object.keys(diff).map(
    (key) => {
      const currentNode = diff[key];
      const currentPath = _.compact([path, key]).join('.');
      if (hasStatus(currentNode)) return formatLine(currentPath, currentNode);

      return plain(currentNode, currentPath);
    },
  );

  return _.compact(lines).join('\n');
};

export default plain;
