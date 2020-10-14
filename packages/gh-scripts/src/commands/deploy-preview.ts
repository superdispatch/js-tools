import { context, getOctokit } from '@actions/github';
import { Command, flags } from '@oclif/command';
import { CLIError } from '@oclif/errors';
import NetlifyAPI = require('netlify');

const DEPLOY_MESSAGE_TITLE = 'Preview is ready!';

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
      description: 'GitHub access token',
    }),

    netlifySite: flags.string({
      required: true,
      env: 'NETLIFY_SITE_ID',
      description: 'Netlify site ID to deploy to',
    }),

    netlifyToken: flags.string({
      required: true,
      env: 'NETLIFY_AUTH_TOKEN',
      description: 'Netlify access token',
    }),
  };

  static args = [];

  async run() {
    const pullRequestNumber = context.payload.pull_request?.number;

    if (!pullRequestNumber) {
      throw new CLIError('Failed to resolve pull request number.');
    }

    const {
      flags: {
        dir,
        token,
        netlifySite,
        netlifyToken,
        alias = `preview-${pullRequestNumber}`,
      },
    } = this.parse(DeployPreview);

    //
    // Step 1: Deploy to Netlify
    //

    const netlify = new NetlifyAPI(netlifyToken);

    const {
      deploy: { deploy_url, deploy_ssl_url },
    } = await netlify.deploy(netlifySite, dir, {
      branch: alias,
      statusCb: ({ msg, phase }) => {
        this.log('%s %s', phase === 'start' ? '-' : '✔', msg);
      },
    });

    //
    // Step 2: Check previous deploy message
    //

    const octokit = getOctokit(token);
    const previewURL = deploy_ssl_url || deploy_url;
    let previousCommentID: number | undefined = undefined;

    this.log('Looking for the previous deploy message…');

    for await (const { data: comments } of octokit.paginate.iterator(
      'GET /repos/:owner/:repo/issues/:issue_number/comments',
      {
        ...context.repo,
        per_page: 100,
        issue_number: pullRequestNumber,
      },
    )) {
      for (const {
        id,
        body,
        user: { login },
      } of comments) {
        if (
          login === 'github-actions[bot]' &&
          body.startsWith(DEPLOY_MESSAGE_TITLE) &&
          body.includes(previewURL)
        ) {
          if (previousCommentID == null) {
            this.log('Found previous deploy message with ID "%s"', id);

            previousCommentID = id;

            break;
          }
        }
      }
    }

    //
    // Step 2: Create or update a deploy message
    //

    const deployMessage = [
      DEPLOY_MESSAGE_TITLE,
      `Built with commit ${context.sha}`,
      previewURL,
    ].join('\n');

    if (previousCommentID != null) {
      this.log(
        'Updating previous deploy message with ID "%s"…',
        previousCommentID,
      );

      await octokit.request(
        'PATCH /repos/:owner/:repo/issues/comments/:comment_id',
        {
          ...context.repo,
          body: deployMessage,
          comment_id: previousCommentID,
        },
      );
    } else {
      this.log('Sending new deploy message…');

      await octokit.request(
        'POST /repos/:owner/:repo/issues/:issue_number/comments',
        {
          ...context.repo,
          body: deployMessage,
          issue_number: pullRequestNumber,
        },
      );
    }
  }
}
