'use strict';

module.exports = {
  rules: {
    filename: require('./rules/filename'),
    camelcase: require('./rules/camelcase'),
    'no-index-file': require('./rules/no-index-file'),
    'directory-name': require('./rules/directory-name'),
    'no-custom-color': require('./rules/no-custom-color'),
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
