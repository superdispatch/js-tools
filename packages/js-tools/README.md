### `@superdispatch/js-tools`

[![npm](https://img.shields.io/npm/v/@superdispatch/js-tools)](https://www.npmjs.com/package/@superdispatch/js-tools)

#### Installation

```bash
yarn add @superdispatch/js-tools -D
```

#### `js-tools lint`

Run linting

```
Options:
  --help   Show help                                                   [boolean]
  --fix    Run auto-fixes                             [boolean] [default: false]
  --quiet  Do not emit warnings                       [boolean] [default: false]
```

##### Usage

```bash
# Run checks
yarn js-tools lint

# With autofixes
yarn js-tools lint --fix
```

With `lint-staged`:

```js
module.exports = { '*': 'js-tools lint --fix' };
```
