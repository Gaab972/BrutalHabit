// eslint-disable-next-line @typescript-eslint/no-var-requires
require("@typescript-eslint/parser");

module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: [".eslintrc.js", "lib/**"],
  rules: {
    quotes: ["error", "double"],
    indent: ["error", 2],
    "@typescript-eslint/no-non-null-assertion": "warn",
  },
};
