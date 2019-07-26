const OFF = 0;
const ERROR = 2;
const WARNING = 1;
const INCONSISTENCY = process.env.NODE_ENV === 'development' ? WARNING : ERROR;

module.exports = { OFF, ERROR, WARNING, INCONSISTENCY };
