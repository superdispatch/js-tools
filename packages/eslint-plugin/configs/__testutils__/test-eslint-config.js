'use strict';

const path = require('path');
const { isDeepStrictEqual } = require('util');
const { CLIEngine } = require('eslint');
const snapshotDiff = require('snapshot-diff');

function excludeEqual(val1, val2) {
  if (!val1 || !val2) {
    return !val1 && !val2 ? null : val1 || val2;
  }

  const result = {};

  Object.keys(val1).forEach(key => {
    if (!isDeepStrictEqual(val1[key], val2[key])) {
      result[key] = val2[key];
    }
  });

  return result;
}

function createCLI(name) {
  return new CLIEngine({
    useEslintrc: false,
    baseConfig: { extends: `plugin:@superdispatch/${name}` },
  });
}

function getConfigForFile(file, configFile) {
  const cli = createCLI(configFile);

  const { parser, ...config } = cli.getConfigForFile(file);

  return { ...config, parser: parser && path.relative(process.cwd(), parser) };
}

function testInheritance(configName, baseConfigName) {
  describe('Inheritance', () => {
    const { rules, ...config } = getConfigForFile('foo/index.js', configName);
    const { rules: baseRules, ...baseConfig } = !baseConfigName
      ? {}
      : getConfigForFile('foo/index.js', baseConfigName);

    it('config', () => {
      expect(!baseConfigName ? config : snapshotDiff(baseConfig, config)).toMatchSnapshot();
    });

    it('rules', () => {
      expect(
        !baseConfigName
          ? rules
          : snapshotDiff(baseRules, rules, {
              contextLines: 1,
              stablePatchmarks: true,
            }),
      ).toMatchSnapshot();
    });

    it('dev rules', () => {
      const { CI, NODE_ENV } = process.env;

      delete process.env.CI;
      process.env.NODE_ENV = 'development';
      jest.resetModules();

      const { rules: devRules } = getConfigForFile('foo/index.js', configName);
      const { rules: baseDevRules } = !baseConfigName
        ? {}
        : getConfigForFile('foo/index.js', baseConfigName);

      process.env.CI = CI;
      process.env.NODE_ENV = NODE_ENV;

      expect(
        snapshotDiff(excludeEqual(baseRules, rules), excludeEqual(baseDevRules, devRules), {
          contextLines: 1,
          stablePatchmarks: true,
        }),
      ).toMatchSnapshot();
    });
  });
}

module.exports = {
  testInheritance,
};
