### `@superdispatch/eslint-plugin`

[![npm](https://img.shields.io/npm/v/@superdispatch/eslint-plugin)](https://www.npmjs.com/package/@superdispatch/eslint-plugin)

#### Installation

```bash
yarn add eslint prettier typescript @superdispatch/eslint-plugin -D
```

#### Usage

Add to `.eslintrc.js`:

```js
module.exports = {
  settings: {
    // Require for `eslint-plugin-react`.
    react: { version: 'detect' },
  },
  overrides: [
    { files: '*.js', extends: 'plugin:@superdispatch/node' },
    { files: ['*.ts', '*.tsx'], extends: 'plugin:@superdispatch/typescript' },
    { files: '*.tsx', extends: 'plugin:@superdispatch/react' },
    {
      files: ['**/__tests__/**/*.ts', '**/__tests__/**/*.ts'],
      extends: 'plugin:@superdispatch/jest',
    },
  ],
};
```
