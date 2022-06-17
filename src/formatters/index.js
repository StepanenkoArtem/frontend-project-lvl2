import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, format) => {
  switch (format) {
    case 'plain': return plain(diff);
    default: return stylish(diff);
  }
};
