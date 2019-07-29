'use strict';

const path = require('path');
const execa = require('execa');

const eslintExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const prettierExtensions = [
  '.js',
  '.jsx',
  '.json',
  '.ts',
  '.tsx',
  '.css',
  '.less',
  '.scss',
  '.graphql',
  '.md',
  '.markdown',
];

function execLinter(cmd, args) {
  console.log(`${cmd} ${args.join(' ')}`);

  return execa(cmd, args, { stdio: 'inherit', preferLocal: true });
}

module.exports = async ({ fix, files }) => {
  const eslintArgs = [];
  const eslintFiles = [];
  const prettierArgs = [];
  const prettierFiles = [];

  if (fix) {
    eslintArgs.push('--fix');
    prettierArgs.push('--write');
  } else {
    prettierArgs.push('--list-different');
  }

  if (files.length === 0) {
    eslintFiles.push(`**/*{${eslintExtensions.join(',')}`);
    prettierFiles.push(`**/*{${prettierExtensions.join(',')}`);
  } else {
    files.forEach(file => {
      const ext = path.extname(file);

      if (eslintExtensions.includes(ext)) {
        eslintFiles.push(file);
      }

      if (prettierExtensions.includes(ext)) {
        prettierFiles.push(file);
      }
    });
  }

  if (eslintFiles.length > 0) {
    await execLinter('eslint', [...eslintArgs, ...eslintFiles]);
  }

  if (prettierFiles.length > 0) {
    await execLinter('prettier', [...prettierArgs, ...prettierFiles]);
  }
};
