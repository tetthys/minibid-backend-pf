module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // testPathIgnorePatterns: ["./tests/prisma/.*"],
};
