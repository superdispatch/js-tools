'use strict';

module.exports = {
  testEnvironment: 'node',
  snapshotSerializers: [require.resolve('snapshot-diff/serializer.js')],
  roots: [
    '<rootDir>/packages/babel-preset',
    '<rootDir>/packages/eslint-plugin',
    '<rootDir>/packages/prettier-config',
  ],

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '<rootDir>/**/__tests__/**/*.ts',
    '<rootDir>/**/?(*.)(spec|test).ts',
  ],

  // A map from regular expressions to paths to transformers
  transform: { '\\.ts$': require.resolve('babel-jest') },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  modulePathIgnorePatterns: ['.+/pkg/.+'],
};
