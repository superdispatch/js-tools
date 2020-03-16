'use strict';

const execa = require('execa');
const path = require('path');

execa('node', ['packages/js-tools/pkg/dist-node/index.bin.js', 'lint'], {
  cwd: path.join(__dirname, '..'),
  stdout: 'inherit',
  stdin: 'inherit',
});
