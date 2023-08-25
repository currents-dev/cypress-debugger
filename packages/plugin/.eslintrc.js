module.exports = {
  extends: ['custom/eslint-node'],
  ignorePatterns: ['**/__tests__/*.ts'],
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
  },
};
