import camelCaseRule from './rules/camelcase';
import directoryNameRule from './rules/directory-name';
import fileNameRule from './rules/filename';
import jsxNoSpreadObjectExpressionRule from './rules/jsx-no-spread-object-expression';
import noIndexFileRule from './rules/no-index-file';

module.exports = {
  rules: {
    filename: fileNameRule,
    camelcase: camelCaseRule,
    'no-index-file': noIndexFileRule,
    'directory-name': directoryNameRule,
    'jsx-no-spread-object-expression': jsxNoSpreadObjectExpressionRule,
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
