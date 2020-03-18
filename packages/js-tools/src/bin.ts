#!/usr/bin/env node

import { run } from './index';

run(process.argv).catch(error => {
  if (error.exitCode) {
    process.exitCode = error.exitCode;
  } else {
    // eslint-disable-next-line no-console
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  }
});
