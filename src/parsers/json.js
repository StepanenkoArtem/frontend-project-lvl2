export default (data) => {
  const { content, type } = data;

  switch (type) {
    default:
      return JSON.parse(content);
  }
};
