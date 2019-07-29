#!/usr/bin/env node

'use strict';

const { run } = require('./index');

run(process.argv).catch(error => {
  if (error.exitCode) {
    process.exitCode = error.exitCode;
  } else {
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  }
});
