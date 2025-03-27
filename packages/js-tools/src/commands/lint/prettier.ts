import { BaseLintCommand } from '../../base/BaseLintCommand';

export default class LintPrettier extends BaseLintCommand {
  static description = 'Run Prettier';

  async run() {
    const options = await this.options();
    const { fix, files } = options as { fix: boolean; files: string[] };
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
