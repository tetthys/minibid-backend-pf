const getError = (res: any) => {
  return JSON.parse(res.text)[0];
};

export default getError;
