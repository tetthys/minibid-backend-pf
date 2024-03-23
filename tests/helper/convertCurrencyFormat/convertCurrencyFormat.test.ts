import convertCurrencyFormat from "../../../src/helper/convertCurrencyFormat/convertCurrencyFormat";

const testStringCase1 = "KRW 123,123,123.44";
const testStringCase2 = "KRW$ 123,123,123.44";
const testStringCase3 = "KRW$ 1,2,3,1,2,3,1,2,3.44";
const testNumber = 123123123.44;

describe("convertCurrencyFormat", () => {
  it(`${testStringCase1} to ${testNumber}`, async () => {
    expect(convertCurrencyFormat(testStringCase1)).toBe(testNumber);
  });
  it(`${testStringCase2} to ${testNumber}`, async () => {
    expect(convertCurrencyFormat(testStringCase2)).toBe(testNumber);
  });
  it(`${testStringCase3} to ${testNumber}`, async () => {
    expect(convertCurrencyFormat(testStringCase3)).toBe(testNumber);
  });
});
