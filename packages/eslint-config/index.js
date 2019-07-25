'use strict';

module.exports = {
  overrides: [
    // JS files
    { files: ['*.js'], extends: './node' },
    { files: ['*.ts'], extends: './typescript' },
    { files: ['*.ts', '*.tsx'], extends: './react' },
    { files: ['*-spec.ts', '*-spec.tsx'], extends: './jest' },
  ],
};
