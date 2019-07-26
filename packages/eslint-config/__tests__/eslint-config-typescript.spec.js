const { testInheritance } = require('../__testutils__/test-eslint-config');

const configFile = require.resolve('../typescript');
const baseConfigFile = require.resolve('../base');

testInheritance(configFile, baseConfigFile);
