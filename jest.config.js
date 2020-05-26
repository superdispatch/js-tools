'use strict';

module.exports = {
  testTimeout: 30 * 1000,
  testEnvironment: 'node',
  snapshotSerializers: [require.resolve('snapshot-diff/serializer.js')],
  roots: [
    '<rootDir>/packages/babel-preset',
    '<rootDir>/packages/eslint-plugin',
    '<rootDir>/packages/prettier-config',
  ],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};
