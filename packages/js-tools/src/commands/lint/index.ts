import { BaseLintCommand } from '../../base/BaseLintCommand';
import Listr = require('listr');
import execa = require('execa');

export default class LintAll extends BaseLintCommand {
  static description = 'Run all linters';

  async run() {
    const { fix } = this.options;
    const [, bin, , ...args] = process.argv;

    const tasks = new Listr(
      [
        {
          title: 'yarn-deduplicate',
          task: () => execa(bin, ['lint:yarn-deduplicate', ...args]),
        },

        {
          title: 'lint',
          task: () =>
            new Listr(
              [
                {
                  title: 'eslint',
                  task: () => execa(bin, ['lint:eslint', ...args]),
                },
                {
                  title: 'prettier',
                  task: () => execa(bin, ['lint:prettier', ...args]),
                },
              ],

              { concurrent: !fix },
            ),
        },
      ],
      {
        concurrent: true,
      },
    );

    await tasks.run();
  }
}
