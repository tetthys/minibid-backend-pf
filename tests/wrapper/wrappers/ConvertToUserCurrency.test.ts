import Serene from "../../../src/prisma/factory/Serene";
import Haven from "../../../src/tool/Haven/Haven";
import ConvertToUserCurrency from "../../../src/wrapper/wrappers/ConvertToUserCurrency";

const createMockRequestWithToken = async () => {
  const token = await Haven.AccessToken().setUser({ id: 1 }).create();
  const mockReq: any = {
    query: {
      page: 1,
    },
    headers: {
      authorization: token,
    },
  };
  return mockReq;
};

describe("ConvertToUserCurrency", () => {
  it("plural get", async () => {
    const mockReq = await createMockRequestWithToken();

    const originalResult: any = await Serene.products()
      .with({
        highestBiddingPrice: true,
        countOfUserBidding: true,
      })
      .get(20);

    const wrappedResult: any = await new ConvertToUserCurrency()
      .setRequest(mockReq)
      .setResult(originalResult)
      .get();

    expect(originalResult[0].startingPrice).not.toBe(
      wrappedResult[0].startingPrice
    );
    expect(originalResult[0].highestBiddingPrice).not.toBe(
      wrappedResult[0].highestBiddingPrice
    );
  });
  it("plural page + get", async () => {
    const mockReq = await createMockRequestWithToken();

    const originalResult: any = await Serene.products()
      .with({
        highestBiddingPrice: true,
        countOfUserBidding: true,
      })
      .page(1)
      .get(20);

    const wrappedResult: any = await new ConvertToUserCurrency()
      .setRequest(mockReq)
      .setResult(originalResult)
      .get();

    expect(originalResult.data[0].startingPrice).not.toBe(
      wrappedResult.data[0].startingPrice
    );
    expect(originalResult.data[0].highestBiddingPrice).not.toBe(
      wrappedResult.data[0].highestBiddingPrice
    );
  });
  it("singular get", async () => {
    const mockReq = await createMockRequestWithToken();

    const originalResult: any = await Serene.product()
      .where({
        id: 1,
      })
      .with({
        countOfUserBidding: true,
        highestBiddingPrice: true,
      })
      .get();

    const wrappedResult: any = await new ConvertToUserCurrency()
      .setRequest(mockReq)
      .setResult(originalResult)
      .get();

    expect(originalResult.startingPrice).not.toBe(wrappedResult.startingPrice);
    expect(originalResult.highestBiddingPrice).not.toBe(
      wrappedResult.highestBiddingPrice
    );
  });
});
