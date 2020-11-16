import { BaseLintCommand } from '../../base/BaseLintCommand';
import LintESLint from './eslint';
import LintPrettier from './prettier';
import LintYarnDeduplicate from './yarn-deduplicate';

export default class LintAll extends BaseLintCommand {
  static description = 'Run all linters';

  async run() {
    await LintYarnDeduplicate.run(this.argv, this.config);
    await LintESLint.run(this.argv, this.config);
    await LintPrettier.run(this.argv, this.config);
  }
}
