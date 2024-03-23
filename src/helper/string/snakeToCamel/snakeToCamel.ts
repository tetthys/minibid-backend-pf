const snakeToCamel = (str: string) => {
  return str.replace(/([-_]\w)/g, (match) => {
    return match.toUpperCase().replace("-", "").replace("_", "");
  });
};

export default snakeToCamel;
