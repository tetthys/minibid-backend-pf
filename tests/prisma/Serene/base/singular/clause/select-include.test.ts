/**
 * Why does this test exist???
 *
 * Reference:
 * 1. https://www.prisma.io/docs/orm/reference/prisma-client-reference#findfirst
 * 2. https://www.prisma.io/docs/orm/prisma-client/queries/select-fields
 * 3. https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
 *
 * Prisma supports relation on 'select' clause. It's a bit weird.
 *
 * While 'include' clause do exact the same thing.
 *
 * And we can't use select and include at the same time in pure prisam client.
 *
 * Serene merges selectClause and includeClause in the this.buildArgs method of BaseModel.ts and BaseModels.ts.
 *
 * It is assumed that if they are multi-dimensional objects, incorrect object may appear.
 *
 * Although we don't recommend to use relation on 'select' clause,
 *
 * Serene should act the reasonable and flexible way as possible.
 */

import Serene from "../../../../../../src/prisma/factory/Serene";

describe("select-include", () => {
  /**
   * What 'select' can read,
   *
   * s : scalar
   * sr : scalar with relation
   * r : relation
   */

  /**
   * What 'include' can read,
   *
   * r : relation
   * rselect : relation with select
   * rr : relation with relation
   */

  it("s r", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
      })
      .include({
        user: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(3);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.user).toBeTruthy();
  });
  it("s rselect", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
      })
      .include({
        productImages: {
          select: {
            id: true,
            path: true,
          },
        },
      })
      .get();
    expect(Object.keys(result).length).toBe(3);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.productImages[0].id).toBeTruthy();
    expect(result.productImages[0].path).toBeTruthy();
  });
  it("s rr", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
      })
      .include({
        user: {
          include: {
            products: true,
          },
        },
      })
      .get();
    expect(Object.keys(result).length).toBe(3);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.user.products).toBeTruthy();
  });

  it("sr r", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
        user: true,
      })
      .include({
        productImages: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(4);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.user).toBeTruthy();
    expect(result.productImages).toBeTruthy();
  });
  it("sr rselect", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
        user: true,
      })
      .include({
        productImages: {
          select: {
            id: true,
            path: true,
          },
        },
      })
      .get();
    expect(Object.keys(result).length).toBe(4);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.user).toBeTruthy();
    expect(result.productImages[0].id).toBeTruthy();
    expect(result.productImages[0].path).toBeTruthy();
  });
  it("sr rr", async () => {
    const result: any = await Serene.product()
      .select({
        id: true,
        name: true,
        user: true,
      })
      .include({
        checkouts: {
          include: {
            user: true,
          },
        },
      })
      .get();
    expect(Object.keys(result).length).toBe(4);
    expect(result.id).toBeTruthy();
    expect(result.name).toBeTruthy();
    expect(result.user).toBeTruthy();
    expect(result.checkouts[0].user).toBeTruthy();
  });

  it("r r", async () => {
    const result: any = await Serene.product()
      .select({
        user: true,
      })
      .include({
        productImages: true,
      })
      .get();
    expect(Object.keys(result).length).toBe(2);
    expect(result.user).toBeTruthy();
    expect(result.productImages).toBeTruthy();
  });
  it("r rselect", async () => {
    const result: any = await Serene.product()
      .select({
        user: true,
      })
      .include({
        productImages: {
          select: {
            id: true,
            path: true,
          },
        },
      })
      .get();
    expect(Object.keys(result).length).toBe(2);
    expect(result.user).toBeTruthy();
    expect(result.productImages[0].id).toBeTruthy();
    expect(result.productImages[0].path).toBeTruthy();
  });
  it("r rr", async () => {
    const result: any = await Serene.product()
      .select({
        user: true,
      })
      .include({
        checkouts: {
          include: {
            user: true,
          },
        },
      })
      .get();
    expect(Object.keys(result).length).toBe(2);
    expect(result.user).toBeTruthy();
    expect(result.checkouts[0].user).toBeTruthy();
  });
});
