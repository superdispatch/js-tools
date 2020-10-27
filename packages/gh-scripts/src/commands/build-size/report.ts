import { context, getOctokit } from '@actions/github';
import { Command, flags } from '@oclif/command';
import { CLIError } from '@oclif/errors';
import { readFileSync } from 'fs';
import { resolve as resolvePath } from 'path';
import { measureFileSizesBeforeBuild } from 'react-dev-utils/FileSizeReporter';

import { sendReport } from '../../utils/sendReport';

import prettyBytes = require('pretty-bytes');

const SIZE_REPORT_TITLE = '### Build Size Report';

function toFinite(value: unknown): number {
  return typeof value == 'number' && Number.isFinite(value) ? value : 0;
}

function formatRow(
  currentSize: number,
  previousSize: number,
): [size: string, delta: string, diff: string] {
  const formattedSize = prettyBytes(currentSize);

  const delta = currentSize - previousSize;
  const formattedDelta = prettyBytes(delta, {
    signed: true,
  });

  const diff = delta / currentSize;
  let formattedDiff = diff.toLocaleString('en-us', {
    style: 'percent',
  });

  if (diff > 0) {
    formattedDiff = `+${formattedDiff} 🔺`;
  } else if (diff < 0) {
    formattedDiff = `${formattedDiff} 🔽`;
  }

  return [formattedSize, formattedDelta, formattedDiff];
}

export default class BuildSizeSnapshot extends Command {
  static description = 'Saves build size snapshot';

  static flags = {
    help: flags.help(),
    dir: flags.string({
      required: true,
      description: 'Specify a build folder',
    }),
    snapshot: flags.string({
      required: true,
      description: 'Specify a path to the snapshot file',
    }),
    token: flags.string({
      required: true,
      env: 'GITHUB_TOKEN',
      description: 'GitHub access token',
    }),
  };

  async run() {
    const pullRequestNumber = context.payload.pull_request?.number;

    if (!pullRequestNumber) {
      throw new CLIError('Failed to resolve pull request number.');
    }

    const {
      flags: { dir, token, snapshot },
    } = this.parse(BuildSizeSnapshot);

    const cwd = process.cwd();
    const snapshotFile = resolvePath(cwd, snapshot);

    this.log('Reading from the snapshot file "%s"…', snapshotFile);

    const snapshotSizes = JSON.parse(
      readFileSync(snapshotFile, 'utf-8'),
    ) as Record<string, number>;

    this.log('Snapshot sizes:\n%O', snapshotSizes);

    const sourceDir = resolvePath(cwd, dir);

    this.log('Measuring files at "%s"…', sourceDir);

    const { sizes } = await measureFileSizesBeforeBuild(sourceDir);

    this.log('File sizes:\n%O', sizes);

    const allFiles = Object.keys({ ...sizes, ...snapshotSizes }).sort((a, b) =>
      a.localeCompare(b),
    );

    const reports = ['| Path | Size | Delta |', '| - | - | - |'];

    let totalCurrentSize = 0;
    let totalPreviousSize = 0;

    for (const file of allFiles) {
      const currentSize = toFinite(sizes[file]);
      const previousSize = toFinite(snapshotSizes[file]);

      totalCurrentSize += currentSize;
      totalPreviousSize += previousSize;

      const [size, delta, diff] = formatRow(currentSize, previousSize);

      reports.push(`| ${file} | ${size} | ${delta} (${diff}) |`);
    }

    const [totalSize, totalDelta, totalDiff] = formatRow(
      totalCurrentSize,
      totalPreviousSize,
    );

    reports.push(`| | ${totalSize} | ${totalDelta} (${totalDiff}) |`);

    const table = reports.join('\n');

    const octokit = getOctokit(token);
    const content = [SIZE_REPORT_TITLE, table].join('\n');

    await sendReport({
      octokit,
      content,
      pullRequestNumber,
      log: (message) => {
        this.log(message);
      },
      matcher: (body) => body.startsWith(SIZE_REPORT_TITLE),
    });
  }
}
