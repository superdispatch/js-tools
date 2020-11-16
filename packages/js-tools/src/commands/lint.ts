'use strict';

import Command, { flags } from '@oclif/command';
import { promises as fs } from 'fs';
import path from 'path';
import execa = require('execa');

const yarnLockFileName = 'yarn.lock';
const esExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];

async function execLinter(cmd: string, args: string[]): Promise<void> {
  console.log(`${cmd} ${args.join(' ')}`);

  await execa(cmd, args, { stdio: 'inherit', preferLocal: true });
}

export default class Lint extends Command {
  static strict = false;

  static description = 'Run all linters';

  static flags = {
    help: flags.help(),

    fix: flags.boolean({
      default: false,
      description: 'Run auto-fixes',
    }),

    quiet: flags.boolean({
      default: false,
      description: 'Do not emit warnings',
    }),
  };

  static examples = [
    '$ js-tools lint --fix',
    '$ js-tools lint --quiet',
    '$ js-tools lint foo.js bar.js',
  ];

  async run() {
    const {
      argv: files,
      flags: { fix, quiet },
    } = this.parse(Lint);

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
      await execLinter('yarn-deduplicate', [
        ...yarnDeduplicateArgs,
        ...yarnDeduplicateFiles,
      ]);
    }

    if (eslintFiles.length > 0) {
      await execLinter('eslint', [...eslintArgs, ...eslintFiles]);
    }

    if (prettierFiles.length > 0) {
      await execLinter('prettier', [...prettierArgs, ...prettierFiles]);
    }
  }
}
