import { BaseLintCommand } from '../../base/BaseLintCommand';
import Listr = require('listr');
import execa = require('execa');

export default class LintAll extends BaseLintCommand {
  static description = 'Run all linters';

  async run() {
    const { fix } = this.options;
    const [, bin, , ...args] = process.argv;

    if (!bin) {
      throw new Error('Missing required bin command.');
    }

    const tasks = new Listr(
      [
        {
          title: 'eslint',
          task: () =>
            execa(bin, ['lint:eslint', ...args], {
              env: { FORCE_COLOR: 'true' },
            }),
        },

        {
          title: 'prettier',
          task: () => execa(bin, ['lint:prettier', ...args]),
        },
      ],
      {
        concurrent: !fix,
      },
    );

    await tasks.run();
  }
}
