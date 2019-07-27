module.exports = {
  overrides: [
    { files: '*.js', extends: require.resolve('./node') },
    { files: '*.ts', extends: require.resolve('./typescript') },
    { files: '*.{jsx,tsx}', extends: require.resolve('./react') },
    {
      files: '**/{__tests__,__testutils__}/**/*.{js,ts,tsx}',
      extends: require.resolve('./jest'),
    },
  ],
};
