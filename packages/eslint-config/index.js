'use strict';

module.exports = {
  overrides: [
    // JS files will be treated as Node files.
    { files: ['*.js'], extends: './node' },

    { files: ['*.ts'], extends: './typescript' },
    { files: ['*.ts', '*.tsx', '*.jsx'], extends: './react' },

    { files: ['*.spec.js', '*.spec.ts', '*.spec.tsx'], extends: './jest' },
  ],
};
