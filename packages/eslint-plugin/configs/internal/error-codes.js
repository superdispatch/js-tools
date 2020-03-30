'use strict';

const isDevMode =
  process.env.CI !== 'true' && process.env.NODE_ENV === 'development';

const OFF = 'off';
const ERROR = 'error';
const WARNING = 'warn'; // eslint-disable-line no-restricted-syntax
const DEPT = isDevMode ? OFF : WARNING;
const INCONSISTENCY = isDevMode ? WARNING : ERROR;

module.exports = { OFF, DEPT, ERROR, INCONSISTENCY };
