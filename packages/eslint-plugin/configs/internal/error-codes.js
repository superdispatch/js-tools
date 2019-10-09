'use strict';

const OFF = 'off';
const ERROR = 'error';
const WARNING = 'warn';
const DEPT = !process.env.CI && process.env.NODE_ENV === 'development' ? OFF : WARNING;
const INCONSISTENCY = !process.env.CI && process.env.NODE_ENV === 'development' ? WARNING : ERROR;

module.exports = { OFF, DEPT, ERROR, INCONSISTENCY };
