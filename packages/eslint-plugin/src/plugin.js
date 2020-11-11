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

/**
 * @property {Record<string, Config>} [configs] The definition of plugin configs.
 * @property {Record<string, RuleEntry>} [rules] The definition of plugin rules.
 */
const plugin = {
  rules: {
    filename: require('./rules/filename'),
    camelcase: require('./rules/camelcase'),
    'directory-name': require('./rules/directory-name'),
    'prefer-design-system-colors': require('./rules/prefer-design-system-colors'),
    'jsx-no-spread-object-expression': require('./rules/jsx-no-spread-object-expression'),
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