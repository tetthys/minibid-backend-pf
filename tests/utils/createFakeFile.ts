const createFakeFile = () => {
  return Buffer.alloc(100 * 1024, ".");
};

export default createFakeFile;
