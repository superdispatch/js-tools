'use strict';

const {
  getConfigValues,
  getDevConfigDiff,
} = require('../__testutils__/test-eslint-config');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues('node', 'base');

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
      Object {
    -   "env": Object {},
    -   "globals": Object {},
    +   "env": Object {
    +     "node": true,
    +   },
    +   "globals": Object {
    +     "ArrayBuffer": "readonly",
    +     "Atomics": "readonly",
    +     "BigInt": "readonly",
    +     "BigInt64Array": "readonly",
    +     "BigUint64Array": "readonly",
    +     "Buffer": "readonly",
    +     "DataView": "readonly",
    +     "Float32Array": "readonly",
    +     "Float64Array": "readonly",
    +     "GLOBAL": "readonly",
    +     "Int16Array": "readonly",
    +     "Int32Array": "readonly",
    +     "Int8Array": "readonly",
    +     "Intl": "readonly",
    +     "Map": "readonly",
    +     "Promise": "readonly",
    +     "Proxy": "readonly",
    +     "Reflect": "readonly",
    +     "Set": "readonly",
    +     "SharedArrayBuffer": "readonly",
    +     "Symbol": "readonly",
    +     "TextDecoder": "readonly",
    +     "TextEncoder": "readonly",
    +     "URL": "readonly",
    +     "URLSearchParams": "readonly",
    +     "Uint16Array": "readonly",
    +     "Uint32Array": "readonly",
    +     "Uint8Array": "readonly",
    +     "Uint8ClampedArray": "readonly",
    +     "WeakMap": "readonly",
    +     "WeakSet": "readonly",
    +     "WebAssembly": "readonly",
    +     "__dirname": "readonly",
    +     "__filename": "readonly",
    +     "clearImmediate": "readonly",
    +     "clearInterval": "readonly",
    +     "clearTimeout": "readonly",
    +     "console": "readonly",
    +     "exports": "writable",
    +     "global": "readonly",
    +     "globalThis": "readonly",
    +     "module": "readonly",
    +     "process": "readonly",
    +     "queueMicrotask": "readonly",
    +     "require": "readonly",
    +     "root": "readonly",
    +     "setImmediate": "readonly",
    +     "setInterval": "readonly",
    +     "setTimeout": "readonly",
    +   },
        "ignorePatterns": Array [
    @@ --- --- @@
        "parserOptions": Object {
    -     "ecmaVersion": 2018,
    +     "ecmaFeatures": Object {
    +       "globalReturn": true,
    +     },
    +     "ecmaVersion": 2019,
    +     "sourceType": "script",
        },
    @@ --- --- @@
          "import",
    +     "node",
        ],
  `);
  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
        ],
    +   "import/no-extraneous-dependencies": Array [
    +     "error",
    +     Object {
    +       "devDependencies": true,
    +       "optionalDependencies": false,
    +       "peerDependencies": false,
    +     },
    +   ],
        "import/no-mutable-exports": Array [
    @@ --- --- @@
        "no-console": Array [
    -     "error",
    +     "off",
        ],
    @@ --- --- @@
        ],
    +   "no-process-exit": Array [
    +     "error",
    +   ],
        "no-prototype-builtins": Array [
    @@ --- --- @@
        "no-wrap-func": Array [
    +     "off",
    +   ],
    +   "node/exports-style": Array [
    +     "error",
    +   ],
    +   "node/no-deprecated-api": Array [
    +     "error",
    +   ],
    +   "node/no-exports-assign": Array [
    +     "error",
    +   ],
    +   "node/no-extraneous-import": Array [
    +     "error",
    +   ],
    +   "node/no-extraneous-require": Array [
    +     "off",
    +   ],
    +   "node/no-missing-import": Array [
    +     "error",
    +   ],
    +   "node/no-missing-require": Array [
    +     "error",
    +   ],
    +   "node/no-unpublished-bin": Array [
    +     "error",
    +   ],
    +   "node/no-unpublished-import": Array [
    +     "error",
    +   ],
    +   "node/no-unpublished-require": Array [
          "off",
    +   ],
    +   "node/no-unsupported-features/es-builtins": Array [
    +     "error",
    +   ],
    +   "node/no-unsupported-features/es-syntax": Array [
    +     "error",
    +     Object {
    +       "ignores": Array [],
    +     },
    +   ],
    +   "node/no-unsupported-features/node-builtins": Array [
    +     "error",
    +   ],
    +   "node/prefer-global/buffer": Array [
    +     "error",
    +   ],
    +   "node/prefer-global/console": Array [
    +     "error",
    +   ],
    +   "node/prefer-global/process": Array [
    +     "error",
    +   ],
    +   "node/prefer-global/text-decoder": Array [
    +     "error",
        ],
    +   "node/prefer-global/text-encoder": Array [
    +     "error",
    +   ],
    +   "node/prefer-global/url": Array [
    +     "error",
    +   ],
    +   "node/prefer-global/url-search-params": Array [
    +     "error",
    +   ],
    +   "node/prefer-promises/dns": Array [
    +     "error",
    +   ],
    +   "node/prefer-promises/fs": Array [
    +     "error",
    +   ],
    +   "node/process-exit-as-throw": Array [
    +     "error",
    +   ],
    +   "node/shebang": Array [
    +     "error",
    +   ],
        "nonblock-statement-body-position": Array [
    @@ --- --- @@
          "off",
    +   ],
    +   "strict": Array [
    +     "error",
    +     "global",
        ],
  `);
});

it('not changes in dev mode', async () => {
  const rules = await getDevConfigDiff('node', 'base');

  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);
});
