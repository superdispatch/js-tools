const { testInheritance } = require('../__testutils__/test-eslint-config');

const configFile = require.resolve('../base');

testInheritance(configFile);
