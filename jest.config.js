'use strict';

module.exports = {
  testEnvironment: 'node',
  snapshotSerializers: [require.resolve('snapshot-diff/serializer.js')],
  roots: [
    '<rootDir>/packages/babel-preset',
    '<rootDir>/packages/eslint-plugin',
    '<rootDir>/packages/prettier-config',
  ],
};
