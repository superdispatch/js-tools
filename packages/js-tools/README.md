### `@superdispatch/js-tools`

[![npm](https://img.shields.io/npm/v/@superdispatch/js-tools)](https://www.npmjs.com/package/@superdispatch/js-tools)

#### Installation

```bash
yarn add @superdispatch/js-tools -D
```

#### Usage

<!-- usage -->

```sh-session
$ npm install -g @superdispatch/js-tools
$ js-tools COMMAND
running command...
$ js-tools (-v|--version|version)
@superdispatch/js-tools/0.9.0 darwin-arm64 node-v20.0.0
$ js-tools --help [COMMAND]
USAGE
  $ js-tools COMMAND
...
```

<!-- usagestop -->

##### With `lint-staged`:

```js
module.exports = { '*': 'js-tools lint --fix' };
```

#### Commands

<!-- commands -->

- [`js-tools lint`](#js-tools-lint)
- [`js-tools lint:eslint`](#js-tools-linteslint)
- [`js-tools lint:prettier`](#js-tools-lintprettier)
- [`js-tools lint:yarn-deduplicate`](#js-tools-lintyarn-deduplicate)

## `js-tools lint`

Run all linters

```
USAGE
  $ js-tools lint

OPTIONS
  --cache                    Only check changed files
  --fix                      Run auto-fixes
  --help                     show CLI help

  --maxWarnings=maxWarnings  [default: -1] Maximum number of warnings after which the command will exit with a non-zero
                             exit code

  --quiet                    Do not emit warnings

EXAMPLES
  $ js-tools lint --fix
  $ js-tools lint --quiet
  $ js-tools lint foo.js bar.js
```

_See code: [dist/commands/lint/index.js](https://github.com/superdispatch/js-tools/blob/v0.9.0/dist/commands/lint/index.js)_

## `js-tools lint:eslint`

Run ESLint

```
USAGE
  $ js-tools lint:eslint

OPTIONS
  --cache                    Only check changed files
  --fix                      Run auto-fixes
  --help                     show CLI help

  --maxWarnings=maxWarnings  [default: -1] Maximum number of warnings after which the command will exit with a non-zero
                             exit code

  --quiet                    Do not emit warnings

EXAMPLES
  $ js-tools lint --fix
  $ js-tools lint --quiet
  $ js-tools lint foo.js bar.js
```

_See code: [dist/commands/lint/eslint.js](https://github.com/superdispatch/js-tools/blob/v0.9.0/dist/commands/lint/eslint.js)_

## `js-tools lint:prettier`

Run Prettier

```
USAGE
  $ js-tools lint:prettier

OPTIONS
  --cache                    Only check changed files
  --fix                      Run auto-fixes
  --help                     show CLI help

  --maxWarnings=maxWarnings  [default: -1] Maximum number of warnings after which the command will exit with a non-zero
                             exit code

  --quiet                    Do not emit warnings

EXAMPLES
  $ js-tools lint --fix
  $ js-tools lint --quiet
  $ js-tools lint foo.js bar.js
```

_See code: [dist/commands/lint/prettier.js](https://github.com/superdispatch/js-tools/blob/v0.9.0/dist/commands/lint/prettier.js)_

## `js-tools lint:yarn-deduplicate`

Deduplicate yarn dependencies

```
USAGE
  $ js-tools lint:yarn-deduplicate

OPTIONS
  --cache                    Only check changed files
  --fix                      Run auto-fixes
  --help                     show CLI help

  --maxWarnings=maxWarnings  [default: -1] Maximum number of warnings after which the command will exit with a non-zero
                             exit code

  --quiet                    Do not emit warnings

EXAMPLES
  $ js-tools lint --fix
  $ js-tools lint --quiet
  $ js-tools lint foo.js bar.js
```

_See code: [dist/commands/lint/yarn-deduplicate.js](https://github.com/superdispatch/js-tools/blob/v0.9.0/dist/commands/lint/yarn-deduplicate.js)_

<!-- commandsstop -->
