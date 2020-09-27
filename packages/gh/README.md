# gh

Node scripts for GitHub actions

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gh.svg)](https://npmjs.org/package/@superdispatch/gh)
[![Downloads/week](https://img.shields.io/npm/dw/gh.svg)](https://npmjs.org/package/@superdispatch/gh)
[![License](https://img.shields.io/npm/l/gh.svg)](https://github.com/superdispatch/superdispatch/js-tools/blob/master/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g @superdispatch/gh
$ gh COMMAND
running command...
$ gh (-v|--version|version)
@superdispatch/gh/0.0.0 darwin-x64 node-v12.16.3
$ gh --help [COMMAND]
USAGE
  $ gh COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`gh deploy-preview`](#gh-deploy-preview)
- [`gh help [COMMAND]`](#gh-help-command)

## `gh deploy-preview`

deploy preview

```
USAGE
  $ gh deploy-preview

OPTIONS
  -d, --dir=dir        (required) build dir
  -h, --help           show CLI help
  -s, --domain=domain  (required) domain
```

_See code: [src/commands/deploy-preview.ts](https://github.com/superdispatch/js-tools/blob/v0.0.0/src/commands/deploy-preview.ts)_

## `gh help [COMMAND]`

display help for gh

```
USAGE
  $ gh help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

<!-- commandsstop -->
