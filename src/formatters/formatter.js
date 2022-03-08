import stylish from "./stylish.js";

export default (diff, format) => {
  switch (format) {
    default:
      return stylish(diff);
  }
};
