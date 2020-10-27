import { context, getOctokit } from '@actions/github';

const GITHUB_ACTIONS_BOT_LOGIN = 'github-actions[bot]';

interface UpsertCommentOptions {
  content: string;
  octokit: ReturnType<typeof getOctokit>;
  pullRequestNumber: number;
  matcher: (body: string) => boolean;
  log?: (message: string) => void;
}

export async function sendReport({
  log,
  content,
  matcher,
  octokit,
  pullRequestNumber,
}: UpsertCommentOptions): Promise<void> {
  let previousCommentID: number | undefined = undefined;

  log?.('Looking for the previous report…');

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
      if (login === GITHUB_ACTIONS_BOT_LOGIN && matcher(body)) {
        if (previousCommentID == null) {
          log?.(`Found previous report with ID "${id}"`);

          previousCommentID = id;

          break;
        }
      }
    }
  }

  if (previousCommentID != null) {
    log?.(`Updating previous report with ID "${previousCommentID}"…`);

    await octokit.request(
      'PATCH /repos/:owner/:repo/issues/comments/:comment_id',
      {
        ...context.repo,
        body: content,
        comment_id: previousCommentID,
      },
    );
  } else {
    log?.('Sending new report…');

    await octokit.request(
      'POST /repos/:owner/:repo/issues/:issue_number/comments',
      {
        ...context.repo,
        body: content,
        issue_number: pullRequestNumber,
      },
    );
  }
}
