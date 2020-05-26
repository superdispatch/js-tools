/**
 * @typedef {import("eslint").Linter.Config} Config
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 * */
'use strict';

const { CLIEngine } = require('eslint');
const snapshotDiff = require('snapshot-diff');

/**
 * @param {Config} baseConfig
 */
async function getFullConfig(baseConfig) {
  const cli = new CLIEngine({ baseConfig, useEslintrc: false });

  const { parser, ...config } = cli.getConfigForFile('config/foo.js');

  delete config.ignorePatterns;
  delete config.noInlineConfig;
  delete config.reportUnusedDisableDirectives;

  return {
    ...config,
    parser: parser && parser.slice(parser.indexOf('node_modules')),
  };
}

/**
 *
 * @param {unknown} a
 * @param {unknown} b
 */
function diff(a, b) {
  return snapshotDiff(a, b, {
    colors: false,
    contextLines: 1,
    stablePatchmarks: true,
  });
}

/**
 * @param {Config} config
 * @param {Config} [baseConfig]
 */
async function getConfigValues(config, baseConfig) {
  const { rules, ...meta } = await getFullConfig(config);

  if (!baseConfig) {
    return [meta, rules];
  }

  const { rules: baseRules, ...baseMeta } = await getFullConfig(baseConfig);

  return [diff(baseMeta, meta), diff(baseRules, rules)];
}

module.exports = { getConfigValues };
