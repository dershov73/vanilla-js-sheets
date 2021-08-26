module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'google'],
  plugins: ['jest'],
  rules: {
    'require-jsdoc': 'off',
    'operator-linebreak': 'off',
  },
};
