'use strict';

const path = require('path');
const execa = require('execa');
const { isDeepStrictEqual } = require('util');
const snapshotDiff = require('snapshot-diff');

function omitEqualRules(a, b) {
  const result = {};
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);

  allKeys.forEach(key => {
    if (!isDeepStrictEqual(a[key], b[key])) {
      result[key] = b[key];
    }
  });

  return result;
}

async function getConfig(name, dev) {
  const env = { ...process.env };
  const configPath = path.join(__dirname, '..', `${name}.js`);

  if (dev) {
    env.CI = 'false';
    env.NODE_ENV = 'development';
  }

  const { stdout } = await execa(
    'eslint',
    ['--no-eslintrc', `--config=${configPath}`, '--print-config=config/foo.js'],
    { env },
  );

  const { parser, ...config } = JSON.parse(stdout);

  return { ...config, parser: parser && path.relative(process.cwd(), parser) };
}

function diff(a, b) {
  return snapshotDiff(a, b, { contextLines: 1, stablePatchmarks: true });
}

function testInheritance(configName, baseConfigName) {
  it('properly extends all dependencies', async () => {
    const { rules, ...meta } = await getConfig(configName);

    if (!baseConfigName) {
      expect(meta).toMatchSnapshot();
      expect(rules).toMatchSnapshot();
    } else {
      const { rules: baseRules, ...baseMeta } = await getConfig(baseConfigName);

      expect(diff(baseMeta, meta)).toMatchSnapshot();
      expect(diff(baseRules, rules)).toMatchSnapshot();
    }
  });

  it('changes in dev environment', async () => {
    const [{ rules }, { rules: devRules }] = await Promise.all([
      getConfig(configName),
      getConfig(configName, true),
    ]);

    if (!baseConfigName) {
      expect(diff(rules, devRules)).toMatchSnapshot();
    } else {
      const [{ rules: baseRules }, { rules: baseDevRules }] = await Promise.all([
        getConfig(baseConfigName),
        getConfig(baseConfigName, true),
      ]);

      const rulesDiff = omitEqualRules(baseRules, rules);
      const devRulesDiff = omitEqualRules(baseDevRules, devRules);

      expect(diff(rulesDiff, devRulesDiff)).toMatchSnapshot();
    }
  });
}

module.exports = { testInheritance };
