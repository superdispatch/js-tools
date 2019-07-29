'use strict';

const execa = require('execa');

const eslintExtensions = ['js', 'jsx', 'ts', 'tsx'];
const prettierExtensions = [
  'js',
  'jsx',
  'json',
  'ts',
  'tsx',
  'css',
  'less',
  'scss',
  'graphql',
  'md',
  'markdown',
];

function execLinter(cmd, args, extensions) {
  const glob = `**/*.{${extensions.join(',')}}`;
  const cleanArgs = [...args.filter(Boolean), glob];

  console.log(`${cmd} ${cleanArgs.join(' ')}`);

  return execa(cmd, cleanArgs, { stdio: 'inherit', preferLocal: true });
}

module.exports = async ({ fix }) => {
  await execLinter('eslint', [fix && '--fix'], eslintExtensions);
  await execLinter('prettier', [fix ? '--write' : '--list-different'], prettierExtensions);
};
