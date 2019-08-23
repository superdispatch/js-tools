### `@superdispatch/js-tools`

[![npm](https://img.shields.io/npm/v/@superdispatch/js-tools)](https://www.npmjs.com/package/@superdispatch/js-tools)

#### Installation

```bash
yarn add @superdispatch/js-tools -D
```

#### `$ js-tools <cmd>`

```
Commands:
  js-tools lint [files...]  Run linters

Options:
  --help  Show help                                                    [boolean]
```

#### `$ js-tools lint [files...]`

```
Run linters

Positionals:
  files  Files to lint                                     [array] [default: []]

Options:
  --help   Show help                                                   [boolean]
  --tools  Whitelist tools to run        [array] [choices: "eslint", "prettier"]
  --fix    Run auto-fixes                             [boolean] [default: false]
  --quiet  Do not emit warnings                       [boolean] [default: false]

Examples:
  js-tools                   lint all files
  js-tools --fix             lint and fix all files
  js-tools foo.js bar.js     lint only provided files
  js-tools --tools prettier  lint only with Prettier
```

##### With `lint-staged`:

```js
module.exports = { '*': 'js-tools lint --fix' };
```
