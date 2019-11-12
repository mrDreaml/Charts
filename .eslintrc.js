module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  extends: ['airbnb', 'plugin:mocha/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'mocha',
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "react/prop-types": 0,
    "prefer-arrow-callback": 0,
    "mocha/prefer-arrow-callback": 2,
    "func-names": "off",
    "max-len": [
      2,
      {
        "code": 120,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
  },
};
