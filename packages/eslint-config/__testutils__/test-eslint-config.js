const path = require('path');
const { CLIEngine } = require('eslint');
const snapshotDiff = require('snapshot-diff');
const { isDeepStrictEqual } = require('util');

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

function createCLI(configFile) {
  return new CLIEngine({ configFile, useEslintrc: false });
}

function getConfigForFile(file, configFile) {
  const cli = createCLI(configFile);

  const { parser, ...config } = cli.getConfigForFile(file);

  return { ...config, parser: parser && path.relative(process.cwd(), parser) };
}

function testInheritance(configFile, baseConfigFile) {
  describe('Inheritance', () => {
    const { rules, ...config } = getConfigForFile('foo/index.js', configFile);
    const { rules: baseRules, ...baseConfig } = !baseConfigFile
      ? {}
      : getConfigForFile('foo/index.js', baseConfigFile);

    it('config', () => {
      expect(!baseConfigFile ? config : snapshotDiff(baseConfig, config)).toMatchSnapshot();
    });

    it('rules', () => {
      expect(
        !baseConfigFile
          ? rules
          : snapshotDiff(baseRules, rules, {
              contextLines: 1,
              stablePatchmarks: true,
            }),
      ).toMatchSnapshot();
    });

    it('dev rules', () => {
      process.env.NODE_ENV = 'development';
      jest.resetModules();

      const { rules: devRules } = getConfigForFile('foo/index.js', configFile);
      const { rules: baseDevRules } = !baseConfigFile
        ? {}
        : getConfigForFile('foo/index.js', baseConfigFile);

      process.env.NODE_ENV = 'test';

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
