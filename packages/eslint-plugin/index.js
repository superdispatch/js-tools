'use strict';

module.exports = {
  rules: {},
  configs: {
    base: { extends: './configs/base' },
    node: { extends: './configs/node' },
    jest: { extends: './configs/jest' },
    react: { extends: './configs/react' },
    typescript: { extends: './configs/typescript' },
    app: {
      overrides: [
        // JS files will be treated as Node files.
        { files: ['*.js'], extends: './configs/node' },
        // TS files can be both server and client side, so keep it as separate.
        { files: ['*.ts'], extends: './configs/typescript' },
        // Turn on React checks only for some file extensions.
        { files: ['*.tsx', '*.jsx'], extends: './configs/react' },
        // Run tests only against `spec` files.
        { files: ['*.spec.js', '*.spec.ts', '*.spec.tsx'], extends: './configs/jest' },
      ],
    },
  },
};
