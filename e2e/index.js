'use strict';

const { sync } = require('execa');
const { readdirSync } = require('fs');
const path = require('path');

run();

function run() {
  const files = readdirSync(__dirname, {
    withFileTypes: true,
  });

  for (const file of files) {
    if (file.isDirectory()) {
      const cwd = path.join(__dirname, file.name);

      sync('yarn', ['install', '--no-lockfile'], { cwd, stdio: 'inherit' });
      sync('yarn', ['start'], { cwd, stdio: 'inherit' });
    }
  }
}
