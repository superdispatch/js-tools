import { Command, flags } from '@oclif/command';
import { request as octokit } from '@octokit/request';
import * as execa from 'execa';

function getPreviewURL(text: string): string {
  const match = /Website Draft URL: (.+)/.exec(text);

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
      description: 'Deploy build dir',
    }),

    alias: flags.string({
      required: true,
      description: 'Deploy alias',
    }),

    pr: flags.integer({
      required: true,
      description: 'Pull Request Number',
    }),

    token: flags.string({
      required: true,
      env: 'GITHUB_TOKEN',
      description: 'GitHub token',
    }),

    commit: flags.string({
      required: true,
      env: 'GITHUB_SHA',
      description: 'Commit SHA',
    }),

    repository: flags.string({
      required: true,
      env: 'GITHUB_REPOSITORY',
      description: 'GitHub Repository',
    }),
  };

  static args = [];

  async run() {
    const {
      flags: { dir, pr, alias, token, commit, repository },
    } = this.parse(DeployPreview);

    const [owner, repo] = repository.split('/');
    const request = octokit.defaults({
      headers: { authorization: `Token ${token}` },
    });

    const { data: allComments } = await request(
      'GET /repos/:owner/:repo/issues/:issue_number/comments',
      {
        repo,
        owner,
        issue_number: pr,
      },
    );

    const deployProcess = execa.command(
      `yarn --silent netlify deploy --dir=${dir} --alias=${alias}`,
    );

    deployProcess.stdout.pipe(process.stdout);
    deployProcess.stderr.pipe(process.stderr);

    const { stdout } = await deployProcess;
    const previewURL = getPreviewURL(stdout);
    const message = [
      'Preview is ready!',
      `Built with commit ${commit}`,
      previewURL,
    ].join('\n');

    const previousComments = allComments.filter(
      (comment) =>
        comment.user.login === 'github-actions[bot]' &&
        comment.body.startsWith('Preview is ready!') &&
        comment.body.includes(previewURL),
    );

    const firstComment = previousComments.shift();

    // Update exist comment or add new.
    if (firstComment) {
      await request('PATCH /repos/:owner/:repo/comments/:comment_id', {
        repo,
        owner,
        body: message,
        issue_number: pr,
        comment_id: firstComment.id,
      });
    } else {
      await request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
        repo,
        owner,
        body: message,
        issue_number: pr,
      });
    }

    // Remove old comments
    for (const comment of previousComments) {
      await request('DELETE /repos/:owner/:repo/issues/comments/:comment_id', {
        repo,
        owner,
        comment_id: comment.id,
      });
    }
  }
}
