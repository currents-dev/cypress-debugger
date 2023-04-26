module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'turbo',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.json', 'packages/*/tsconfig.json'],
      },
    },
  },
  ignorePatterns: [
    '**/*.json',
    'node_modules',
    '.turbo',
    'dist',
    'eslintrc.js',
  ],
  rules: {
    'import/prefer-default-export': 'off',
  },
};
