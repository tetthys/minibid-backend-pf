const getNewRandomUsername = () => {
  return "user" + Math.floor(Math.random() * 1000000);
};

export default getNewRandomUsername;
