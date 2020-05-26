/**
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 * */
'use strict';

const path = require('path');
const execa = require('execa');
const snapshotDiff = require('snapshot-diff');

/**
 * @param {string} name
 */
async function getConfig(name) {
  const configPath = path.join(__dirname, '..', `${name}.js`);

  try {
    const { stdout } = await execa('eslint', [
      '--no-eslintrc',
      `--config=${configPath}`,
      '--print-config=config/foo.js',
    ]);

    const { parser, ...config } = JSON.parse(stdout);

    delete config.ignorePatterns;

    return {
      ...config,
      parser: parser && path.relative(process.cwd(), parser),
    };
  } catch (error) {
    if (error.stderr) {
      throw new Error(error.stderr);
    }

    throw error;
  }
}

/**
 *
 * @param {any} a
 * @param {any} b
 */
function diff(a, b) {
  return snapshotDiff(a, b, {
    colors: false,
    contextLines: 1,
    stablePatchmarks: true,
  });
}

/**
 * @param {string} configName
 * @param {string} [baseConfigName]
 */
async function getConfigValues(configName, baseConfigName) {
  const { rules, ...meta } = await getConfig(configName);

  if (!baseConfigName) {
    return [meta, rules];
  }

  const { rules: baseRules, ...baseMeta } = await getConfig(baseConfigName);

  return [diff(baseMeta, meta), diff(baseRules, rules)];
}

module.exports = { getConfigValues };
