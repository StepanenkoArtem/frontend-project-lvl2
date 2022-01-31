export default (data) => {
  const { content, type } = data;

  switch (type) {
    case 'json':
      return JSON.parse(content);
  }
}
