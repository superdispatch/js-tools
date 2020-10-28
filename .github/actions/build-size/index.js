'use strict';

const core = require('@actions/core');
const { exec } = require('@actions/exec');
const { saveCache } = require('@actions/cache');
const { context } = require('@actions/github');

const os = require('os');
const path = require('path');

function getSnapshotCacheKey(label) {
  return `build-size-v1-${label || 'default'}-${context.sha}`;
}

function getSnapshotPath(label) {
  return path.join(
    os.tmpdir(),
    'build-size-action',
    `${getSnapshotCacheKey(label)}.json`,
  );
}

async function snapshot(dir, label) {
  const snapshotPath = getSnapshotPath(label);
  const snapshotCacheKey = getSnapshotCacheKey(label);

  await exec('yarn', [
    'gh-scripts',
    `build-size:snapshot`,
    '--dir',
    dir,
    '--out',
    snapshotPath,
  ]);

  await saveCache([snapshotPath], snapshotCacheKey);
}

async function report() {
  throw new Error('Not implemented');
}

async function run() {
  const dir = core.getInput('dir');
  const step = core.getInput('step');
  const label = core.getInput('label');

  switch (step) {
    case 'snapshot':
      return snapshot(dir, label);
    case 'report':
      return report(dir, label);
    default: {
      throw new Error(`Unknown step "${step}"`);
    }
  }
}

run().catch((error) => {
  core.setFailed(error.message);
});
