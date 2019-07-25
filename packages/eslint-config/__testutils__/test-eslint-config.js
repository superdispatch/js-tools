const { CLIEngine } = require('eslint');
const snapshotDiff = require('snapshot-diff');

function createCLI(configFile) {
  return new CLIEngine({ configFile, useEslintrc: false });
}

function getConfigForFile(configFile, file) {
  const cli = createCLI(configFile);

  return cli.getConfigForFile(file);
}

function testInheritance(configFile) {
  describe('Inheritance', () => {
    const { rules, ...config } = getConfigForFile(configFile, 'foo/index.js');

    it('config', () => {
      expect(config).toMatchSnapshot();
    });

    it('rules', () => {
      expect(rules).toMatchSnapshot();
    });

    it('dev rules', () => {
      process.env.NODE_ENV = 'development';
      jest.resetModules();

      const { rules: devRules } = getConfigForFile(configFile, 'bar/index.js');

      process.env.NODE_ENV = 'test';

      expect(
        snapshotDiff(rules, devRules, { contextLines: 1, stablePatchmarks: true }),
      ).toMatchSnapshot();
    });
  });
}

module.exports = {
  createCLI,
  testInheritance,
};
