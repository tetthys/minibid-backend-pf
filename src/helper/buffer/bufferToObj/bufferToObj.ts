const bufferToObj = (data: any) => {
  if (data === undefined) {
    throw new Error("data is undefined");
  }
  return JSON.parse(Buffer.from(data).toString());
};

export default bufferToObj;
