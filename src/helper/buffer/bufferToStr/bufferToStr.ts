const bufferToStr = (data: any) => {
  if (data === undefined) {
    throw new Error("data is undefined");
  }
  return Buffer.from(data).toString();
};

export default bufferToStr;
