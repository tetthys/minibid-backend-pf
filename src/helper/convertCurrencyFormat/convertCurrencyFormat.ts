const convertCurrencyFormat = (str: string) => {
  try {
    const number = str.replace(/[^0-9.]/g, "");
    return parseFloat(number);
  } catch (e) {
    throw new Error("convertCurrencyFormat error");
  }
};

export default convertCurrencyFormat;
