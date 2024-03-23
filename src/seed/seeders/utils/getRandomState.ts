const getRandomState = () => {
  return ["queue", "failed", "completed"][Math.floor(Math.random() * 3)];
};

export default getRandomState;
