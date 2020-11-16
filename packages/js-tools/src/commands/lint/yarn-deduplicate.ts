import { promises as fs } from 'fs';
import * as path from 'path';

import { BaseLintCommand } from '../../base/BaseLintCommand';

const LOCK_FILE_NAME = 'yarn.lock';

export default class LintYarnDeduplicate extends BaseLintCommand {
  static description = 'Run Prettier linters';

  async run() {
    const { fix, files } = this.options;
    const args: string[] = [];
    let lockFile: string | undefined = undefined;

    if (!fix) {
      args.push('--list');
      args.push('--fail');
    }

    if (files.length === 0) {
      const lockFileStats = await fs.lstat(LOCK_FILE_NAME);

      if (lockFileStats.isFile()) {
        lockFile = LOCK_FILE_NAME;
      }
    } else {
      lockFile = files.find((file) => path.basename(file) === LOCK_FILE_NAME);
    }

    if (lockFile) {
      await this.exec('yarn-deduplicate', [...args, lockFile]);
    }
  }
}
