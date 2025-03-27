import { execa } from 'execa';
import { Command, Flags } from '@oclif/core';

export abstract class BaseLintCommand extends Command {
  static strict = false;

  static flags = {
    help: Flags.help(),

    fix: Flags.boolean({
      default: false,
      description: 'Run auto-fixes',
    }),

    quiet: Flags.boolean({
      default: false,
      description: 'Do not emit warnings',
    }),

    cache: Flags.boolean({
      default: false,
      description: 'Only check changed files',
    }),
  };

  static examples = [
    '$ js-tools lint --fix',
    '$ js-tools lint --quiet',
    '$ js-tools lint foo.js bar.js',
  ];

  protected async options() {
    const parsed = await this.parse(BaseLintCommand);

    return { ...parsed.flags, files: parsed.argv };
  }

  protected async exec(cmd: string, args: string[]): Promise<void> {
    this.log([cmd, ...args].join(' '));

    await execa(cmd, args, { stdio: 'inherit', preferLocal: true });
  }
}
