module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'turbo',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  ignorePatterns: ['**/*.json', 'node_modules', '.turbo', 'dist', 'public'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/no-array-index-key': 1,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/no-shadow': 1,
    '@typescript-eslint/no-empty-interface': 1,
    'default-case': 1,
    'consistent-return': 1,
    'prefer-destructuring': 1,
  },
};
