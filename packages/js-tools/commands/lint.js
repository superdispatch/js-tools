'use strict';

const fs = require('fs');
const path = require('path');
const execa = require('execa');

const yarnLockFileName = 'yarn.lock';
const esExtensions = ['.js', '.cjs', '.mjs', '.jsx', '.ts', '.tsx'];

/**
 * @param {string} cmd
 * @param {string[]} args
 */
function execLinter(cmd, args) {
  console.log(`${cmd} ${args.join(' ')}`);

  return execa(cmd, args, { stdio: 'inherit', preferLocal: true });
}

/**
 * @typedef {Object} LintOptions
 * @property {boolean} fix
 * @property {string[]} files
 * @property {boolean} quiet
 * @property {string | undefined} tools
 */

/**
 * @param {LintOptions} options
 * @return {Promise<void>}
 * */
module.exports = async ({ fix, files, quiet, tools }) => {
  const skipESLint = tools != null && !tools.includes('eslint');
  const skipPettier = tools != null && !tools.includes('prettier');
  const skipYarnDeduplicate =
    tools != null && !tools.includes('yarn-deduplicate');

  const eslintArgs = ['--ext', esExtensions.join(',')];
  const eslintFiles = [];
  const prettierArgs = ['--ignore-unknown'];
  const prettierFiles = [];
  const yarnDeduplicateFiles = [];
  const yarnDeduplicateArgs = [];

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
    if (fs.existsSync(yarnLockFileName)) {
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

  if (!skipYarnDeduplicate && yarnDeduplicateFiles.length > 0) {
    await execLinter('yarn-deduplicate', [
      ...yarnDeduplicateArgs,
      ...yarnDeduplicateFiles,
    ]);
  }

  if (!skipESLint && eslintFiles.length > 0) {
    await execLinter('eslint', [...eslintArgs, ...eslintFiles]);
  }

  if (!skipPettier && prettierFiles.length > 0) {
    await execLinter('prettier', [...prettierArgs, ...prettierFiles]);
  }
};
