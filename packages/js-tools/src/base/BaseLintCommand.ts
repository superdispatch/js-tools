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
    this.log('%s %j', cmd, args);

    await execa(cmd, args, { stdio: 'inherit', preferLocal: true });
  }
}
