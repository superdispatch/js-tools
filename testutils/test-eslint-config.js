const { CLIEngine } = require('eslint');

const cleanupNodePath = x => x && x.replace(/(.*)node_modules/, 'node_modules');

module.exports = configFile => {
  const createCli = () => new CLIEngine({ configFile, useEslintrc: false });

  it('not throws on init', () => {
    expect(createCli).not.toThrow();
  });

  it('runs on multiple extensions', () => {
    const cli = createCli();
    const configs = ['js', 'ts', 'tsx'].map(x => cli.getConfigForFile(`index.${x}`));
    const firstConfig = configs.pop();

    configs.forEach(x => {
      expect(x).toEqual(firstConfig);
    });
  });

  describe('inheritance', () => {
    const cli = createCli();
    const config = cli.getConfigForFile('./index.js');
    const keys = Object.keys(config);

    it('inherits keys', () => {
      expect(keys).toMatchInlineSnapshot(`
        Array [
          "env",
          "globals",
          "parser",
          "parserOptions",
          "plugins",
          "rules",
          "settings",
        ]
      `);
    });

    keys.forEach(key => {
      it(key, () => {
        expect(config[key]).toMatchSnapshot(key);
      });
    });
  });
};
