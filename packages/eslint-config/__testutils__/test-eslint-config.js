const { CLIEngine } = require('eslint');

function createCLI(configFile) {
  return new CLIEngine({ configFile, useEslintrc: false });
}

function testInheritance(configFile) {
  describe('Inheritance', () => {
    const cli = createCLI(configFile);
    const { rules, ...config } = cli.getConfigForFile(configFile);

    it('config', () => {
      expect(config).toMatchSnapshot();
    });

    it('rules', () => {
      expect(rules).toMatchSnapshot();
    });
  });
}

module.exports = {
  createCLI,
  testInheritance,
};
