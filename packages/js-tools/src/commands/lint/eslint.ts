import * as path from 'path';

import { BaseLintCommand } from '../../base/BaseLintCommand';

const esExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];

export default class LintESLint extends BaseLintCommand {
  static description = 'Run ESLint linters';

  async run() {
    const { fix, quiet, files } = this.options;
    const args: string[] = [];
    const esFiles: string[] = [];

    args.push('--ext', esExtensions.join(','));

    if (fix) {
      args.push('--fix');
    }

    if (quiet) {
      args.push('--quiet');
    }

    if (files.length === 0) {
      esFiles.push('.');
    } else {
      for (const file of files) {
        const ext = path.extname(file);

        if (esExtensions.includes(ext)) {
          esFiles.push(file);
        }
      }
    }

    if (esFiles.length > 0) {
      await this.exec('eslint', [...args, ...esFiles]);
    }
  }
}
