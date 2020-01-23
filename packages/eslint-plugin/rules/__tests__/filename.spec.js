'use strict';

const { RuleTester } = require('eslint');
const rule = require('../filename');

const parserOptions = { ecmaVersion: 2020, sourceType: 'module' };

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('filename', rule, {
  valid: [
    {
      code: 'import style from "module/Style.css";',
    },
    {
      code: 'import style from "./style.css";',
    },
    {
      code: 'const style = require("./style.css");',
    },
    {
      code: 'import("./style.css");',
    },
    {
      code: 'var foo; require(foo);',
    },
  ],
  invalid: ['png', 'jpg', 'css', 'sass', 'scss'].map(ext => ({
    code: `import asset from './assets/AssetFile.${ext}';`,
    errors: [
      `Asset files name must be in kebab-case. Please rename "AssetFile.${ext}" to "asset-file.${ext}"`,
    ],
  })),
});
