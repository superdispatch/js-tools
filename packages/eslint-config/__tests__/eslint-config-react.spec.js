const { testInheritance } = require('../__testutils__/test-eslint-config');

const configFile = require.resolve('../react');
const baseConfigFile = require.resolve('../base');

testInheritance(configFile, baseConfigFile);
