import { exec } from '@actions/exec';
import { context, getOctokit } from '@actions/github';
import { Command, flags } from '@oclif/command';

async function deployPreview(
  directory: string,
  alias: string,
): Promise<string> {
  let stdout = '';

  const exitCode = await exec(
    'yarn',
    ['--silent', 'netlify', 'deploy', '--dir', directory, '--alias', alias],
    {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
      },
    },
  );

  if (exitCode !== 0) {
    throw new Error('Failed to deploy a preview.');
  }

  const match = /Website Draft URL: (.+)/.exec(stdout);

  if (!match) {
    throw new Error('Cannot find preview url from logs');
  }

  return match[1];
}

export default class DeployPreview extends Command {
  static description = 'Deploy preview';

  static flags = {
    help: flags.help(),

    dir: flags.string({
      required: true,
      description: 'Specify a folder to deploy',
    }),

    alias: flags.string({
      description: 'Specifies the alias for deployment',
    }),

    token: flags.string({
      required: true,
      env: 'GITHUB_TOKEN',
      description: 'GitHub token',
    }),
  };

  static args = [];

  async run() {
    const pullRequestNumber = context.payload.pull_request?.number;

    if (!pullRequestNumber) {
      throw new Error('Failed to resolve pull request number.');
    }

    const {
      flags: { dir, token, alias = `preview-${pullRequestNumber}` },
    } = this.parse(DeployPreview);

    const octokit = getOctokit(token);
    const previewURL = await deployPreview(dir, alias);

    const deployMessage = [
      'Preview is ready!',
      `Built with commit ${context.sha}`,
      previewURL,
    ].join('\n');

    this.log('Looking through pull request comments…');

    const { data: allComments } = await octokit.issues.listComments({
      ...context.repo,
      issue_number: pullRequestNumber,
    });

    this.log('Found %s comments', allComments.length);

    const previousComments = allComments.filter(
      (comment) =>
        comment.user.login === 'github-actions[bot]' &&
        comment.body.startsWith('Preview is ready!') &&
        comment.body.includes(previewURL),
    );

    this.log(
      'Filtered %s comments from current workflow',
      previousComments.length,
    );

    const firstComment = previousComments.shift();

    // Update exist comment or add new.
    if (firstComment) {
      this.log(
        'Updating previous deploy message with id "%s" …',
        firstComment.id,
      );

      await octokit.issues.updateComment({
        ...context.repo,
        body: deployMessage,
        comment_id: firstComment.id,
      });
    } else {
      this.log('Sending deploy message…');

      await octokit.issues.createComment({
        ...context.repo,
        body: deployMessage,
        issue_number: pullRequestNumber,
      });
    }

    // Remove old comments
    for (const { id } of previousComments) {
      this.log('Removing obsolete comment %s…', id);

      await octokit.issues.deleteComment({ ...context.repo, comment_id: id });
    }
  }
}
