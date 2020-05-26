/**
 * @typedef {import("eslint").Linter.RulesRecord} RulesRecord
 * @typedef {import("eslint").Linter.RuleEntry} RuleEntry
 * */
'use strict';

const path = require('path');
const execa = require('execa');
const { isDeepStrictEqual } = require('util');
const snapshotDiff = require('snapshot-diff');

/**
 * @param {Partial<RulesRecord>} a
 * @param {Partial<RulesRecord>} b
 */
function omitEqualRules(a, b) {
  /**
   * @type {RulesRecord}
   * */
  const result = {};
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);

  allKeys.forEach((key) => {
    if (!isDeepStrictEqual(a[key], b[key])) {
      result[key] = /** @type {RuleEntry} */ (b[key]);
    }
  });

  return result;
}

/**
 * @param {string} name
 * @param {boolean} [dev]
 */
async function getConfig(name, dev) {
  const env = { ...process.env };
  const configPath = path.join(__dirname, '..', `${name}.js`);

  if (dev) {
    env.CI = 'false';
    env.NODE_ENV = 'development';
  }

  try {
    const { stdout } = await execa(
      'eslint',
      [
        '--no-eslintrc',
        `--config=${configPath}`,
        '--print-config=config/foo.js',
      ],
      { env },
    );

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

/**
 * @param {string} configName
 * @param {string} [baseConfigName]
 */
async function getDevConfigDiff(configName, baseConfigName) {
  const [{ rules }, { rules: devRules }] = await Promise.all([
    getConfig(configName),
    getConfig(configName, true),
  ]);

  if (!baseConfigName) {
    return diff(rules, devRules);
  }

  const [{ rules: baseRules }, { rules: baseDevRules }] = await Promise.all([
    getConfig(baseConfigName),
    getConfig(baseConfigName, true),
  ]);

  const rulesDiff = omitEqualRules(baseRules, rules);
  const devRulesDiff = omitEqualRules(baseDevRules, devRules);

  return diff(rulesDiff, devRulesDiff);
}

module.exports = { getConfigValues, getDevConfigDiff };
