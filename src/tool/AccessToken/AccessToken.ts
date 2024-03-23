import Serene from "../../prisma/factory/Serene";
import InvalidAccessTokenError from "./error/InvalidAccessTokenError";

export default class AccessToken {
  private user: any;

  public setUser(user: any) {
    this.user = user;
    return this;
  }

  private generateRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    // first letter is alphabet
    result += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
      Math.floor(Math.random() * 52)
    );

    for (let i = 1; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  public async create() {
    try {
      await this.isUserValid();
      const token = await Serene.prisma().accessToken.create({
        data: {
          userId: this.user.id,
          token: this.generateRandomString(255),
          expiredAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
        },
      });
      return token.token;
    } catch (e) {
      throw e;
    }
  }

  public async deleteAll() {
    try {
      await this.isUserValid();
      await Serene.prisma().accessToken.deleteMany({
        where: {
          userId: this.user.id,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  public async delete(token: string | undefined) {
    try {
      await this.isTokenValid(token);
      await Serene.prisma().accessToken.delete({
        where: {
          token: token,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  public async findUserByToken(token: string | undefined) {
    try {
      await this.isTokenValid(token);
      const t = await Serene.prisma().accessToken.findFirstOrThrow({
        where: {
          token: token,
        },
      });
      const u = await Serene.prisma().user.findFirstOrThrow({
        where: {
          id: t.userId,
        },
        include: {
          admin: true,
          card: true,
          bankAccount: true,
        }
      });
      return u;
    } catch (e) {
      throw e;
    }
  }

  private async isTokenValid(tokenFromRequest: string | undefined) {
    if (tokenFromRequest === undefined)
      throw new InvalidAccessTokenError("Token is undefined", "error", {});

    const isTokenExistOnDB = await Serene.prisma().accessToken.findFirst({
      where: { token: tokenFromRequest },
    });
    if (!isTokenExistOnDB)
      throw new InvalidAccessTokenError("Token doesn't exist", "error", {});

    const t = await Serene.prisma().accessToken.findFirstOrThrow({
      where: { token: tokenFromRequest },
    });
    const isTokenValid = t.expiredAt >= new Date();
    if (!isTokenValid)
      throw new InvalidAccessTokenError("Token is expired", "error", {});
  }

  private async isUserValid() {
    const isUserExistOnDB = await Serene.prisma().user.findFirst({
      where: {
        id: this.user.id,
      },
    });
    if (!isUserExistOnDB)
      throw new InvalidAccessTokenError("User doesn't exist", "error", {});
  }

  public reqHasToken(req: any) {
    if (req.headers.authorization) {
      return true;
    }
    return false;
  }
}
