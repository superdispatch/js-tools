const OFF = 'off';
const ERROR = 'error';
const WARNING = 'warn';
const INCONSISTENCY = process.env.NODE_ENV === 'development' ? WARNING : ERROR;

module.exports = { OFF, ERROR, WARNING, INCONSISTENCY };
