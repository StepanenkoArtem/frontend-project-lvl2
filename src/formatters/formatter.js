import formatAsJSON from "./json.js";

export default (diff, format) => {
  switch (format) {
    case 'json':
      return formatAsJSON(diff);
  }
}
