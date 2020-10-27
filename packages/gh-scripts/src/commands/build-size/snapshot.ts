import { Command, flags } from '@oclif/command';
import { ux } from 'cli-ux';
import { writeFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import { measureFileSizesBeforeBuild } from 'react-dev-utils/FileSizeReporter';

export default class BuildSizeSnapshot extends Command {
  static description = 'Saves build size snapshot';

  static flags = {
    help: flags.help(),
    dir: flags.string({
      required: true,
      description: 'Specify a build folder',
    }),
    out: flags.string({
      required: true,
      description: 'Specify a path for the snapshot file',
    }),
  };

  async run() {
    const {
      flags: { dir, out },
    } = this.parse(BuildSizeSnapshot);

    const cwd = process.cwd();
    const sourceDir = resolvePath(cwd, dir);

    this.log('Measuring files at "%s"…', sourceDir);

    const { sizes } = await measureFileSizesBeforeBuild(sourceDir);

    ux.styledObject(sizes);

    const outFile = resolvePath(cwd, out);

    this.log('Writing file to "%s"…', outFile);

    writeFileSync(outFile, JSON.stringify(sizes), 'utf-8');
  }
}
