'use strict';

module.exports = {
  testEnvironment: 'node',
  snapshotSerializers: [require.resolve('snapshot-diff/serializer.js')],
  roots: ['<rootDir>/packages/eslint-config', '<rootDir>/packages/prettier-config'],
};
