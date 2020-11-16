import { BaseLintCommand } from '../../base/BaseLintCommand';

export default class LintPrettier extends BaseLintCommand {
  static description = 'Run Prettier';

  async run() {
    const { fix, files } = this.options;
    const args: string[] = [];

    args.push('--ignore-unknown');

    if (fix) {
      args.push('--write');
    } else {
      args.push('--check');
    }

    if (files.length === 0) {
      args.push('.');
    } else {
      args.push(...files);
    }

    await this.exec('prettier', args);
  }
}
