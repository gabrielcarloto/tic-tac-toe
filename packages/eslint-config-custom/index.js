module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'linebreak-style': 0,
    'object-curly-newline': 0,
    '@typescript-eslint/non-nullable-type-assertion-style': 0,
  },
  settings: {
    next: {
      rootDir: ['apps/web'],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
        project: ['tsconfig.json', 'package/tsconfig.json'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json', 'package/tsconfig.json'],
      },
    },
  },
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', '.turbo'],
};
