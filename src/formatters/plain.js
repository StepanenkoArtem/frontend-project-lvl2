import _ from 'lodash';

const formatValueToString = (value) => {
  if (_.isArray(value) || _.isObject(value)) {
    return '[complex value]';
  }
  if (_.isBoolean(value) || _.isNull(value) || _.isNumber(value)) {
    return `${value}`;
  }
  return `'${value}'`;
};

const addLine = (path, node) => {
  const { first, second, status } = node;

  const line = {
    MODIFIED: `Property '${path}' was updated. From ${formatValueToString(first)} to ${formatValueToString(second)}`,
    DELETED: `Property '${path}' was removed`,
    ADDED: `Property '${path}' was added with value: ${formatValueToString(second)}`,
    UNCHANGED: null,
  };

  return line[status];
};

const renderPlain = (diff, path) => {
  const lines = Object.keys(diff).map(
    (key) => {
      const currentNode = diff[key];
      const currentPath = _.compact([path, key]).join('.');
      if (_.has(currentNode, 'status')) {
        return addLine(currentPath, currentNode);
      }

      return renderPlain(currentNode, currentPath);
    },
  );

  return _.compact(lines).join('\n');
};

export default renderPlain;
