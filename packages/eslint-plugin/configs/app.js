module.exports = {
  overrides: [
    // JS files will be treated as Node files.
    { files: ['*.js'], extends: require.resolve('./node') },
    // TS files can be both server and client side, so keep it as separate.
    { files: ['*.ts'], extends: require.resolve('./typescript') },
    // Turn on React checks only for some file extensions.
    { files: ['*.tsx', '*.jsx'], extends: require.resolve('./react') },
    // // Run tests only against `spec` files.
    { files: ['*.spec.js', '*.spec.ts', '*.spec.tsx'], extends: require.resolve('./jest') },
  ],
};
