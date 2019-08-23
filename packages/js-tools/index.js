'use strict';

const yargs = require('yargs');
const lint = require('./commands/lint');

module.exports = argv =>
  new Promise(resolve => {
    yargs(argv.slice(2))
      .help()
      .strict()
      .version(false)
      .demandCommand()
      .usage('Usage: $0 <cmd>')
      .command(
        'lint [files...]',
        'Run linting',
        args =>
          args
            .option('fix', { type: 'boolean', default: false, description: 'Run auto-fixes' })
            .option('quiet', {
              type: 'boolean',
              default: false,
              description: 'Do not emit warnings',
            }),
        ({ fix, quiet, files }) => resolve(lint({ fix, quiet, files })),
      )
      .parse();
  });
