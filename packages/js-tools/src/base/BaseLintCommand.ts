import Command, { flags } from '@oclif/command';
import execa = require('execa');

export abstract class BaseLintCommand extends Command {
  static strict = false;

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

    cache: flags.boolean({
      default: false,
      description: 'Only check changed files',
    }),

    maxWarnings: flags.integer({
      default: 0,
      description:
        'Maximum number of warnings after which the command will exit with a non-zero exit code',
    }),
  };

  static examples = [
    '$ js-tools lint --fix',
    '$ js-tools lint --quiet',
    '$ js-tools lint foo.js bar.js',
  ];

  protected get options() {
    const parsed = this.parse(BaseLintCommand);

    return { ...parsed.flags, files: parsed.argv };
  }

  protected async exec(cmd: string, args: string[]): Promise<void> {
    this.log([cmd, ...args].join(' '));

    await execa(cmd, args, { stdio: 'inherit', preferLocal: true });
  }
}
