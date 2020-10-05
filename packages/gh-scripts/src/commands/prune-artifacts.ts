import { context, getOctokit } from '@actions/github';
import { Command, flags } from '@oclif/command';

export default class PruneArtifacts extends Command {
  static description = 'Prune artifacts';

  static flags = {
    help: flags.help(),

    token: flags.string({
      required: true,
      env: 'GITHUB_TOKEN',
      description: 'GitHub access token',
    }),

    pattern: flags.string({
      required: true,
      description: 'RegExp pattern string to match an artifact name',
    }),
  };

  async run() {
    const {
      flags: { token, pattern },
    } = this.parse(PruneArtifacts);
    const octokit = getOctokit(token);
    const matcher = new RegExp(pattern);

    this.log(
      'Iterating through the %s/%s…',
      context.repo.owner,
      context.repo.repo,
    );

    for await (const {
      data: artifacts,
    } of octokit.paginate.iterator(
      'GET /repos/:owner/:repo/actions/artifacts',
      { ...context.repo, per_page: 50 },
    )) {
      if (artifacts.length === 0) {
        this.log('There are no artifacts left.');

        return;
      }

      this.log('Found %s artifacts…', artifacts.length);

      for (const { id, name } of artifacts) {
        if (matcher.exec(name)) {
          this.log('Removing "%s" artifact with the id "%s"', name, id);

          await octokit.request(
            'DELETE /repos/:owner/:repo/actions/artifacts/:artifact_id',
            { ...context.repo, artifact_id: id },
          );
        }
      }
    }
  }
}
