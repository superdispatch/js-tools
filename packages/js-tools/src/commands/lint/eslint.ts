import * as path from 'path';
import { BaseLintCommand } from '../../base/BaseLintCommand';

import findCacheDir = require('find-cache-dir');

const esExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];

export default class LintESLint extends BaseLintCommand {
  static description = 'Run ESLint';

  async run() {
    const options = await this.options();
    const { fix, quiet, files, cache } = options;
    const args: string[] = [];
    const esFiles: string[] = [];

    args.push('--ext', esExtensions.join(','));

    if (fix) {
      args.push('--fix');
    }

    if (quiet) {
      args.push('--quiet');
    }

    if (cache) {
      const cacheLocation = findCacheDir({ name: 'eslint', create: true });

      if (cacheLocation) {
        args.push('--cache');
        args.push('--cache-location', cacheLocation);
      } else {
        this.warn('Failed to find cache directory.');
      }
    }

    if (files.length === 0) {
      esFiles.push('.');
    } else {
      for (const file of files) {
        const ext = path.extname(file as string);

        if (esExtensions.includes(ext)) {
          esFiles.push(file as string);
        }
      }
    }

    if (esFiles.length > 0) {
      await this.exec('eslint', [...args, ...esFiles]);
    }
  }
}
