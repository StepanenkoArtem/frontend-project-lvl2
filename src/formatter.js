import stylish from './stylish.js';

const formatter = (diff, format) => {
  switch (format) {
    default: return stylish(diff);
  }
};

export default formatter;
