const isDevMode =
  process.env.CI !== 'true' && process.env.NODE_ENV === 'development';

const OFF = 'off';
const ERROR = 'error';
const WARNING = 'warn';
const DEPT = isDevMode ? OFF : WARNING;
const INCONSISTENCY = isDevMode ? WARNING : ERROR;

export { OFF, DEPT, ERROR, INCONSISTENCY };
