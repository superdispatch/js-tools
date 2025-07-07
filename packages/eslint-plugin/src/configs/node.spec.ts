import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('base'),
    await getConfigData('node'),
  );

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

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
        "parser": undefined,
        "parserOptions": Object {
    +     "ecmaFeatures": Object {
    +       "globalReturn": true,
    +     },
          "ecmaVersion": 2020,
    +     "sourceType": "script",
        },
        "plugins": Array [
          "import",
    +     "node",
          "eslint-comments",
          "array-func",
        ],
        "settings": Object {},
      }
  `);
  expect(rules).toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

@@ --- --- @@
      },
    ],
    "import/no-duplicates": Array [
      "off",
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
      "error",
    ],
    "import/no-named-as-default": Array [
      "off",
@@ --- --- @@
    ],
    "no-confusing-arrow": Array [
      0,
    ],
    "no-console": Array [
-     "error",
+     "off",
    ],
    "no-const-assign": Array [
      "error",
    ],
    "no-constant-condition": Array [
@@ --- --- @@
      "error",
    ],
    "no-octal": Array [
      "error",
    ],
+   "no-process-exit": Array [
+     "error",
+   ],
    "no-prototype-builtins": Array [
      "error",
    ],
    "no-redeclare": Array [
      "error",
@@ --- --- @@
    ],
    "no-with": Array [
      "error",
    ],
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
+     "off",
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
+     "off",
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
      "off",
    ],
    "object-curly-newline": Array [
      "off",
@@ --- --- @@
    "standard/computed-property-even-spacing": Array [
      "off",
    ],
    "standard/object-curly-even-spacing": Array [
      "off",
+   ],
+   "strict": Array [
+     "error",
+     "global",
    ],
    "switch-colon-spacing": Array [
      "off",
    ],
    "template-curly-spacing": Array [
`);
});
