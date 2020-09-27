import { Command, flags } from '@oclif/command';
import { request } from '@octokit/request';
import execa from 'execa';

export default class DeployPreview extends Command {
  static description = 'deploy preview';

  static flags = {
    help: flags.help({ char: 'h' }),
    dir: flags.string({ char: 'd', description: 'build dir', required: true }),
    domain: flags.string({
      char: 's',
      description: 'domain',
      required: true,
    }),
  };

  static args = [];

  async run() {
    const {
      flags: { dir, domain },
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
    const previewDomain = domain.replace(
      'https://',
      `https://preview-${issueNumber}--`,
    );

    const { data: comments } = await request(
      'GET /repos/:owner/:repo/issues/:issue_number/comments',
      {
        repo,
        owner,
        issue_number: issueNumber,
        headers: { authorization: `Token ${GITHUB_TOKEN}` },
      },
    );

    for (const comment of comments) {
      if (
        comment.user.login === 'github-actions[bot]' &&
        comment.body.startsWith('Preview is ready!') &&
        comment.body.includes(previewDomain)
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

    await execa(
      'yarn',
      [
        '--silent',
        'netlify',
        'deploy',
        `--dir=${dir}`,
        `--alias=preview-${issueNumber}`,
      ],
      { stdio: 'inherit' },
    );

    await request('POST /repos/:owner/:repo/issues/:issue_number/comments', {
      repo,
      owner,
      issue_number: issueNumber,
      headers: { authorization: `Token ${GITHUB_TOKEN}` },
      body: [
        'Preview is ready!',
        `Built with commit ${GITHUB_SHA}`,
        previewDomain,
      ].join('\n'),
    });
  }
}
