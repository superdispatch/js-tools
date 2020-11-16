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
          task: () =>
            execa(bin, ['lint:yarn-deduplicate', ...args], {
              stderr: 'inherit',
            }),
        },

        {
          title: 'eslint',
          task: () =>
            execa(bin, ['lint:eslint', ...args], {
              env: { FORCE_COLOR: 'true' },
            }),
        },

        {
          title: 'prettier',
          task: () =>
            execa(bin, ['lint:prettier', ...args], {
              stderr: 'inherit',
            }),
        },
      ],
      {
        concurrent: !fix,
      },
    );

    await tasks.run();
  }
}
