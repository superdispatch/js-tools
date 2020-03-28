'use strict';

const yargs = require('yargs');
const lint = require('./commands/lint');

/**
 * @param {string[]} argv
 */
module.exports = (argv) =>
  new Promise((resolve) =>
    yargs(argv.slice(2))
      .help()
      .strict()
      .version(false)
      .demandCommand()
      .usage('Usage: $0 <cmd>')
      .command(
        'lint [files...]',
        'Run linters',
        (args) =>
          args
            .example('$0', 'lint all files')
            .example('$0 --fix', 'lint and fix all files')
            .example('$0 foo.js bar.js', 'lint only provided files')
            .example('$0 --tools prettier', 'lint only with Prettier')
            .positional('files', { default: [], describe: 'Files to lint' })
            .option('tools', {
              type: 'array',
              description: 'Whitelist tools to run',
            })
            .choices('tools', ['eslint', 'prettier', 'yarn-deduplicate'])
            .option('fix', {
              type: 'boolean',
              default: false,

              description: 'Run auto-fixes',
            })
            .option('quiet', {
              type: 'boolean',
              default: false,
              description: 'Do not emit warnings',
            }),
        ({ fix, quiet, files, tools }) =>
          resolve(lint({ fix, quiet, files, tools })),
      )
      .parse(),
  );
