import { Command, flags } from '@oclif/command';
import { request } from '@octokit/request';
import execa from 'execa';

function getPreviewURL(text: string): string {
  const match = /Website Draft URL: (.+)/.exec(text);

  if (!match) {
    throw new Error('Cannot find preview url from logs');
  }

  return match[1];
}

export default class DeployPreview extends Command {
  static description = 'deploy preview';

  static flags = {
    help: flags.help({ char: 'h' }),
    dir: flags.string({ char: 'd', description: 'build dir', required: true }),
    alias: flags.string({
      char: 'a',
      description: 'deploy alias',
      required: true,
    }),
  };

  static args = [];

  async run() {
    const {
      flags: { dir, alias },
    } = this.parse(DeployPreview);

    const {
      GITHUB_SHA,
      GITHUB_TOKEN,
      GITHUB_REPOSITORY,
      GITHUB_PULL_REQUEST_NUMBER,
    } = process.env;

    if (!GITHUB_SHA) {
      throw new Error('Please provide `GITHUB_TOKEN`.');
    }

    if (!GITHUB_TOKEN) {
      throw new Error('Please provide `GITHUB_TOKEN`.');
    }

    if (!GITHUB_REPOSITORY) {
      throw new Error('Please provide `GITHUB_REPOSITORY`.');
    }

    if (!GITHUB_PULL_REQUEST_NUMBER) {
      throw new Error('Please provide `GITHUB_PULL_REQUEST_NUMBER`.');
    }

    const [owner, repo] = GITHUB_REPOSITORY.split('/');
    const issueNumber = parseInt(GITHUB_PULL_REQUEST_NUMBER);

    const { data: comments } = await request(
      'GET /repos/:owner/:repo/issues/:issue_number/comments',
      {
        repo,
        owner,
        issue_number: issueNumber,
        headers: { authorization: `Token ${GITHUB_TOKEN}` },
      },
    );

    const { stdout } = await execa(
      'yarn',
      [
        '--silent',
        'netlify',
        'deploy',
        `--dir=${dir}`,
        `--alias=preview-${alias}`,
      ],
      { stdio: 'inherit' },
    );
    const previewURL = getPreviewURL(stdout);

    for (const comment of comments) {
      if (
        comment.user.login === 'github-actions[bot]' &&
        comment.body.startsWith('Preview is ready!') &&
        comment.body.includes(previewURL)
      ) {
        this.log('Found comment %d, removing…', comment.id);

        await request(
          'DELETE /repos/:owner/:repo/issues/comments/:comment_id',
          {
            repo,
            owner,
            comment_id: comment.id,
            headers: { authorization: `Token ${GITHUB_TOKEN}` },
          },
        );
      }
    }

    await request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
      repo,
      owner,
      issue_number: issueNumber,
      headers: { authorization: `Token ${GITHUB_TOKEN}` },
      body: [
        'Preview is ready!',
        `Built with commit ${GITHUB_SHA}`,
        previewURL,
      ].join('\n'),
    });
  }
}
