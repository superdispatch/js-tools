import { context, getOctokit } from '@actions/github';
import { Command, flags } from '@oclif/command';
import NetlifyAPI, { DeployStatus } from 'netlify';

interface DeployConfig {
  alias: string;
  token: string;
  siteID: string;
  buildDirectory: string;
  onStatusChange: (status: DeployStatus) => void;
}

async function deploy({
  alias,
  token,
  siteID,
  buildDirectory,
  onStatusChange,
}: DeployConfig): Promise<string> {
  const netlify = new NetlifyAPI(token);

  const {
    deploy: { deploy_url, deploy_ssl_url },
  } = await netlify.deploy(siteID, buildDirectory, {
    branch: alias,
    statusCb: onStatusChange,
  });

  return deploy_ssl_url || deploy_url;
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
      throw new Error('Failed to resolve pull request number.');
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

    const octokit = getOctokit(token);

    const previewURL = await deploy({
      alias,
      token: netlifyToken,
      siteID: netlifySite,
      buildDirectory: dir,
      onStatusChange: ({ msg, phase }) => {
        this.log('%s %s', phase === 'start' ? '…' : '✔', msg);
      },
    });

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
