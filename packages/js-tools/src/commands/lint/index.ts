import { promises as fs } from 'fs';
import * as path from 'path';

import { BaseLintCommand } from '../../base/BaseLintCommand';

const yarnLockFileName = 'yarn.lock';
const esExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];

export default class LintAll extends BaseLintCommand {
  static description = 'Run all linters';

  async run() {
    const { fix, quiet, files } = this.options;

    const eslintArgs: string[] = ['--ext', esExtensions.join(',')];
    const eslintFiles: string[] = [];
    const prettierArgs: string[] = ['--ignore-unknown'];
    const prettierFiles: string[] = [];
    const yarnDeduplicateFiles: string[] = [];
    const yarnDeduplicateArgs: string[] = [];

    if (fix) {
      eslintArgs.push('--fix');
      prettierArgs.push('--write');
    } else {
      prettierArgs.push('--check');
      yarnDeduplicateArgs.push('--list', '--fail');
    }

    if (quiet) {
      eslintArgs.push('--quiet');
    }

    if (files.length === 0) {
      eslintFiles.push('.');
      prettierFiles.push('.');

      // Check yarn.lock file in root
      const stat = await fs.lstat(yarnLockFileName);

      if (stat.isFile()) {
        yarnDeduplicateFiles.push(yarnLockFileName);
      }
    } else {
      for (const file of files) {
        const ext = path.extname(file);
        const basename = path.basename(file);

        prettierFiles.push(file);

        if (esExtensions.includes(ext)) {
          eslintFiles.push(file);
        }

        if (basename === yarnLockFileName) {
          yarnDeduplicateFiles.push(file);
        }
      }
    }

    if (yarnDeduplicateFiles.length > 0) {
      await this.exec('yarn-deduplicate', [
        ...yarnDeduplicateArgs,
        ...yarnDeduplicateFiles,
      ]);
    }

    if (eslintFiles.length > 0) {
      await this.exec('eslint', [...eslintArgs, ...eslintFiles]);
    }

    if (prettierFiles.length > 0) {
      await this.exec('prettier', [...prettierArgs, ...prettierFiles]);
    }
  }
}
