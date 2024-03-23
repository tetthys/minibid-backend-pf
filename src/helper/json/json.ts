// This funtion is for solving BigInt issue
// https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields#serializing-bigint

const json = (param: any): string => {
  return JSON.stringify(
    param,
    (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
  );
};
export default json;
