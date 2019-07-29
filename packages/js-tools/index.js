'use strict';

const execa = require('execa');
const yargs = require('yargs');

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

async function lint({ fix }) {
  await execLinter('eslint', [fix && '--fix'], eslintExtensions);
  await execLinter('prettier', [fix ? '--write' : '--list-different'], prettierExtensions);
}

function run(argv) {
  return new Promise(resolve => {
    yargs(argv.slice(2))
      .help()
      .strict()
      .version(false)
      .demandCommand()
      .usage('Usage: $0 <cmd>')
      .command(
        'lint',
        'Run linting',
        args => args.option('fix', { type: 'boolean', default: false }),
        ({ fix }) => resolve(lint({ fix })),
      )
      .parse();
  });
}

module.exports = { run };
