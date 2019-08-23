'use strict';

module.exports = {
  rules: {
    'jsx-no-spread-object-expression': require('./rules/jsx-no-spread-object-expression'),
  },
  configs: {
    base: require('./configs/base'),
    node: require('./configs/node'),
    'node-pkg': require('./configs/node-pkg'),
    jest: require('./configs/jest'),
    react: require('./configs/react'),
    typescript: require('./configs/typescript'),
  },
};
