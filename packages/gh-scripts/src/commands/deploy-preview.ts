import { context, getOctokit } from '@actions/github';
import { Command, flags } from '@oclif/command';
import { CLIError } from '@oclif/errors';

import { sendReport } from '../utils/sendReport';
import NetlifyAPI = require('netlify');

const DEPLOY_MESSAGE_TITLE = 'Preview is ready!';

export default class DeployPreview extends Command {
  static description = 'Deploy preview';

  static flags = {
    help: flags.help(),

    dir: flags.string({
      required: true,
      description: 'Folder to deploy',
    }),

    alias: flags.string({
      description: 'Alias for deployment',
    }),

    label: flags.string({
      description: 'Deployment label',
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

  async run() {
    const pullRequestNumber = context.payload.pull_request?.number;

    if (!pullRequestNumber) {
      throw new CLIError('Failed to resolve pull request number.');
    }

    const {
      flags: {
        dir,
        token,
        label,
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
    // Step 2: Report
    //

    const octokit = getOctokit(token);
    const previewURL = deploy_ssl_url || deploy_url;
    const content = [`Built with commit ${context.sha}`, previewURL].join('\n');

    await sendReport({
      label,
      octokit,
      content,
      pullRequestNumber,
      title: DEPLOY_MESSAGE_TITLE,
      log: (message) => {
        this.log(message);
      },
    });
  }
}
