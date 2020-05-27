/**
 * @typedef {import("eslint").Linter.Config} Config
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 * @typedef {import("eslint").Linter.ParserOptions} ParserOptions
 * */
'use strict';

const { CLIEngine } = require('eslint');
const snapshotDiff = require('snapshot-diff');
const stripANSI = require('strip-ansi');

const plugin = require('../../index');

/**
 * @param {string} name
 * @param {string} [fileName]
 * @param {ParserOptions} [parserOptions]
 * @returns {Promise<Config>}
 */
async function getFullConfig(name, fileName = 'config/foo.js', parserOptions) {
  const cli = new CLIEngine({
    parserOptions,
    useEslintrc: false,
    baseConfig: plugin.configs[/** @type {never} */ (name)],
  });

  const { parser, ...config } = cli.getConfigForFile(fileName);

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
 * @param {string} [fileName]
 * @param {ParserOptions} [parserOptions]
 * @returns {Promise<[object, object]>}
 */
async function getConfigValues(name, fileName, parserOptions) {
  const { rules = {}, ...meta } = await getFullConfig(
    name,
    fileName,
    parserOptions,
  );

  return [meta, rules];
}

/**
 * @param {[object, object]} baseConfig
 * @param {[object, object]} config
 * @returns {[string, string]}
 */
function getConfigsDiff([baseMeta, baseRules], [meta, rules]) {
  return [diff(baseMeta, meta), diff(baseRules, rules)];
}

module.exports = { getConfigsDiff, getConfigValues };
