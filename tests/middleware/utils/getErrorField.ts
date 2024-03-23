const getErrorField = (res: any) => {
  return JSON.parse(res.text)[0].field
    ? JSON.parse(res.text)[0].field
    : JSON.parse(res.text)[0].context.label;
};

export default getErrorField;
