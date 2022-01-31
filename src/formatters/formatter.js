import formatAsJSON from './json.js';

export default (diff, format) => {
  switch (format) {
    default:
      return formatAsJSON(diff);
  }
};
