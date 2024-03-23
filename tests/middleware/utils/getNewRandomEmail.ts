import getNewRandomUsername from "./getNewRandomUsername";

const getNewRandomEmail = () => {
  return getNewRandomUsername() + "@test.com";
};

export default getNewRandomEmail;
