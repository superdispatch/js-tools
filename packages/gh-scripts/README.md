# gh-scripts

Node scripts for GitHub actions

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@superdispatch/gh-scripts.svg)](https://npmjs.org/package/@superdispatch/gh-scripts)
[![Downloads/week](https://img.shields.io/npm/dw/@superdispatch/gh-scripts.svg)](https://npmjs.org/package/@superdispatch/gh-scripts)
[![License](https://img.shields.io/npm/l/@superdispatch/gh-scripts.svg)](https://github.com/superdispatch/superdispatch/js-tools/blob/master/packages/gh-scripts/package.json)

<!-- toc -->

- [gh-scripts](#gh-scripts)
- [Commands](#commands)
<!-- tocstop -->

# Commands

<!-- commands -->

- [`gh-scripts build-size:report`](#gh-scripts-build-sizereport)
- [`gh-scripts build-size:snapshot`](#gh-scripts-build-sizesnapshot)
- [`gh-scripts deploy-preview`](#gh-scripts-deploy-preview)
- [`gh-scripts help [COMMAND]`](#gh-scripts-help-command)
- [`gh-scripts prune-artifacts`](#gh-scripts-prune-artifacts)

## `gh-scripts build-size:report`

Saves build size snapshot

```
USAGE
  $ gh-scripts build-size:report

OPTIONS
  --dir=dir            (required) Specify a build folder
  --help               show CLI help
  --snapshot=snapshot  (required) Specify a path to the snapshot file
  --token=token        (required) GitHub access token
```

_See code: [lib/commands/build-size/report.js](https://github.com/superdispatch/js-tools/blob/v0.2.6/lib/commands/build-size/report.js)_

## `gh-scripts build-size:snapshot`

Saves build size snapshot

```
USAGE
  $ gh-scripts build-size:snapshot

OPTIONS
  --dir=dir  (required) Specify a build folder
  --help     show CLI help
  --out=out  (required) Specify a path for the snapshot file
```

_See code: [lib/commands/build-size/snapshot.js](https://github.com/superdispatch/js-tools/blob/v0.2.6/lib/commands/build-size/snapshot.js)_

## `gh-scripts deploy-preview`

Deploy preview

```
USAGE
  $ gh-scripts deploy-preview

OPTIONS
  --alias=alias                Specifies the alias for deployment
  --dir=dir                    (required) Specify a folder to deploy
  --help                       show CLI help
  --netlifySite=netlifySite    (required) Netlify site ID to deploy to
  --netlifyToken=netlifyToken  (required) Netlify access token
  --token=token                (required) GitHub access token
```

_See code: [lib/commands/deploy-preview.js](https://github.com/superdispatch/js-tools/blob/v0.2.6/lib/commands/deploy-preview.js)_

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

## `gh-scripts prune-artifacts`

Prune artifacts

```
USAGE
  $ gh-scripts prune-artifacts

OPTIONS
  --help             show CLI help
  --pattern=pattern  [default: .*] RegExp pattern string to match an artifact name
  --token=token      (required) GitHub access token
```

_See code: [lib/commands/prune-artifacts.js](https://github.com/superdispatch/js-tools/blob/v0.2.6/lib/commands/prune-artifacts.js)_

<!-- commandsstop -->
