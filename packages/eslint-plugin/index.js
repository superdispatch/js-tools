'use strict';

module.exports = {
  rules: {
    'jsx-no-spread-object-expression': require('./rules/jsx-no-spread-object-expression'),
  },
  configs: {
    base: { extends: './configs/base' },
    node: { extends: './configs/node' },
    jest: { extends: './configs/jest' },
    react: { extends: './configs/react' },
    typescript: { extends: './configs/typescript' },
  },
};
