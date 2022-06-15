import stylish from './formatters/stylish.js';

export default (diff, format) => {
  switch (format) {
    default: return stylish(diff);
  }
};
