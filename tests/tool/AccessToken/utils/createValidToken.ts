import Serene from "../../../../src/prisma/factory/Serene";
import Helper from "../../../../src/tool/Helper/Helper";

const createValidToken = async () => {
  const result = await Serene.prisma().accessToken.create({
    data: {
      userId: 1,
      token: Helper.faker().string.alpha(255),
      expiredAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  return result.token;
};

export default createValidToken;
