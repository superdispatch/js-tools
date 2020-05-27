/**
 * @typedef {import("eslint").Linter.Config} Config
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 * */
'use strict';

const { CLIEngine } = require('eslint');
const snapshotDiff = require('snapshot-diff');
const stripANSI = require('strip-ansi');

const plugin = require('../../index');

/**
 * @param {string} name
 */
async function getFullConfig(name) {
  const cli = new CLIEngine({
    useEslintrc: false,
    baseConfig: plugin.configs[/** @type {never} */ (name)],
  });

  const { parser, ...config } = cli.getConfigForFile('config/foo.ts');

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
  return stripANSI(
    snapshotDiff(a, b, {
      colors: false,
      contextLines: 1,
      stablePatchmarks: true,
    }),
  );
}

/**
 * @param {string} name
 * @param {string} [baseName]
 */
async function getConfigValues(name, baseName) {
  const { rules, ...meta } = await getFullConfig(name);

  if (!baseName) {
    return [meta, rules];
  }

  const { rules: baseRules, ...baseMeta } = await getFullConfig(baseName);

  return [diff(baseMeta, meta), diff(baseRules, rules)];
}

module.exports = { getConfigValues };
