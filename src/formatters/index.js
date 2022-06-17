import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, format) => {
  switch (format) {
    case 'plain': return plain(diff);
    case 'json': return json(diff);
    default: return stylish(diff);
  }
};
