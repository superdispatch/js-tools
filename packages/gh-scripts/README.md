# gh-scripts

Node scripts for GitHub actions

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@superdispatch/gh-scripts.svg)](https://npmjs.org/package/@superdispatch/gh-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/@superdispatch/gh-scripts.svg)](https://npmjs.org/package/@superdispatch/gh-scripts)
[![License](https://img.shields.io/npm/l/@superdispatch/gh-scripts.svg)](https://github.com/superdispatch/superdispatch/js-tools/blob/master/packages/gh-scripts/package.json)

<!-- toc -->

- [gh-scripts](#gh-scripts)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @superdispatch/gh-scripts
$ gh-scripts COMMAND
running command...
$ gh-scripts (-v|--version|version)
@superdispatch/gh-scripts/0.2.1 darwin-x64 node-v12.16.3
$ gh-scripts --help [COMMAND]
USAGE
  $ gh-scripts COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`gh-scripts deploy-preview`](#gh-scripts-deploy-preview)
- [`gh-scripts help [COMMAND]`](#gh-scripts-help-command)

## `gh-scripts deploy-preview`

deploy preview

```
USAGE
  $ gh-scripts deploy-preview

OPTIONS
  -a, --alias=alias  (required) deploy alias
  -d, --dir=dir      (required) build dir
  -h, --help         show CLI help
```

_See code: [lib/commands/deploy-preview.js](https://github.com/superdispatch/js-tools/blob/v0.2.1/lib/commands/deploy-preview.js)_

## `gh-scripts help [COMMAND]`

display help for gh-scripts

```
USAGE
  $ gh-scripts help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

<!-- commandsstop -->
