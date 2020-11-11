'use strict';

/**
 * @typedef {import("eslint").Linter.Config} Config
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 * */

const { getBaseConfig } = require('./configs/base');
const { getJestConfig } = require('./configs/jest');
const { getTSJestConfig } = require('./configs/ts-jest');
const { getTSCypressConfig } = require('./configs/ts-cypress');
const { getNodeConfig } = require('./configs/node');
const { getNodePackageConfig } = require('./configs/node-pkg');
const { getReactConfig } = require('./configs/react');
const { getTypeScriptConfig } = require('./configs/typescript');

const filenameRule = require('./rules/filename');
const camelcaseRule = require('./rules/camelcase');
const directoryNameRule = require('./rules/directory-name');
const preferDesignSystemColorsRule = require('./rules/prefer-design-system-colors');
const jsxNoSpreadObjectExpressionRule = require('./rules/jsx-no-spread-object-expression');

/**
 * @property {Record<string, Config>} [configs] The definition of plugin configs.
 * @property {Record<string, RuleEntry>} [rules] The definition of plugin rules.
 */
const plugin = {
  rules: {
    filename: filenameRule,
    camelcase: camelcaseRule,
    'directory-name': directoryNameRule,
    'prefer-design-system-colors': preferDesignSystemColorsRule,
    'jsx-no-spread-object-expression': jsxNoSpreadObjectExpressionRule,
  },

  configs: {
    base: getBaseConfig(),
    jest: getJestConfig(),
    'ts-jest': getTSJestConfig(),
    'ts-cypress': getTSCypressConfig(),
    node: getNodeConfig(),
    'node-pkg': getNodePackageConfig(),
    react: getReactConfig(),
    typescript: getTypeScriptConfig(),
  },
};

module.exports = plugin;
