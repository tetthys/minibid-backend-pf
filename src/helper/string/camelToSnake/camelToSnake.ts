const camelToSnake = (str: string) => {
  return str.replace(/[A-Z]/g, (match) => {
    return "_" + match.toLowerCase();
  });
};

export default camelToSnake;
