import request from "supertest";
import app from "../../src";
import Serene from "../../src/prisma/factory/Serene";
import Haven from "../../src/tool/Haven/Haven";

const createUserId1Card = async () => {
  await Serene.prisma().user.update({
    where: {
      id: 1,
    },
    data: {
      card: {
        create: {
          info: "1234",
        },
      },
    },
  });
};

const createUserId2Card = async () => {
  await Serene.prisma().user.update({
    where: {
      id: 2,
    },
    data: {
      card: {
        create: {
          info: "1234",
        },
      },
    },
  });
};

const deleteUserId1Card = async () => {
  const userId1 = await Serene.prisma().user.findFirst({
    where: {
      id: 1,
    },
    include: {
      card: true,
    },
  });

  if (userId1?.card) {
    await Serene.prisma().user.update({
      where: {
        id: 1,
      },
      data: {
        card: {
          delete: true,
        },
      },
    });
  }
};

const deleteUserId2Card = async () => {
  const userId2 = await Serene.prisma().user.findFirst({
    where: {
      id: 2,
    },
    include: {
      card: true,
    },
  });

  if (userId2?.card) {
    await Serene.prisma().user.update({
      where: {
        id: 2,
      },
      data: {
        card: {
          delete: true,
        },
      },
    });
  }
};

describe("card", () => {
  beforeEach(async () => {
    await deleteUserId1Card();
    await deleteUserId2Card();
  });

  it("user doesn't have a card can register card", async () => {
    const user = await Serene.user().getById(1);
    const token = await Haven.AccessToken().setUser(user).create();

    const res = await request(app)
      .post("/users/1/card")
      .set("Authorization", `${token}`)
      .send({
        info: "1234",
      });

    expect(res.status).toEqual(201);
  });
  it("user already have a card can't access", async () => {
    await createUserId2Card();

    const user = await Serene.user().getById(2);
    const token = await Haven.AccessToken().setUser(user).create();

    const res = await request(app)
      .post("/users/2/card")
      .set("Authorization", `${token}`)
      .send({
        info: "1234",
      });

    expect(res.status).toEqual(400);
    expect(res.body[0].message).toEqual("User already have a card");
  });
});
