const throwUnless = (condition: boolean, error: Error) => {
  if (!condition) {
    throw error;
  }
};

export default throwUnless;
