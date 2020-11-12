'use strict';

import { RuleTester } from 'eslint';

import rule from './filename';

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
  invalid: [
    {
      code: "import asset from './assets/AssetFile.svg';",
      errors: [
        'Asset files name must be in kebab-case. Please rename "AssetFile.svg" to "asset-file.svg"',
      ],
    },
    {
      code: "import asset from './assets/AssetFile.jpg';",
      errors: [
        'Asset files name must be in kebab-case. Please rename "AssetFile.jpg" to "asset-file.jpg"',
      ],
    },
    {
      code: "const asset = require('./assets/AssetFile.png');",
      errors: [
        'Asset files name must be in kebab-case. Please rename "AssetFile.png" to "asset-file.png"',
      ],
    },
  ],
});
