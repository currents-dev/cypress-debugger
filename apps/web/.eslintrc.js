module.exports = {
  extends: ['custom/eslint-react'],
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
};
