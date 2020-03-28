'use strict';

const snapshotDiff = require('snapshot-diff');

const preset = require('../index');

/**
 * @param {any} a
 * @param {any} b
 */
function diff(a, b) {
  return snapshotDiff(a, b, { contextLines: 2, stablePatchmarks: true });
}

/**
 * @param {string | undefined} env
 * @param {import("../index").PresetOptions | undefined} [options]
 */
function getConfig(env, options) {
  const { NODE_ENV } = process.env;

  if (env) {
    process.env.NODE_ENV = env;
  } else {
    delete process.env.NODE_ENV;
  }

  // @ts-ignore
  const config = preset({}, options);

  process.env.NODE_ENV = NODE_ENV;

  return config;
}

const cwd = process.cwd();

expect.addSnapshotSerializer({
  test: (value) => typeof value === 'string' && value.includes(cwd),
  print: (value, serialize) => serialize(value.replace(cwd, '<rootDir>')),
});

it('exposes default settings', () => {
  const defaultPreset = getConfig(undefined);

  expect(defaultPreset).toMatchInlineSnapshot(`
    Object {
      "plugins": Array [
        "@babel/plugin-proposal-numeric-separator",
        Array [
          "@babel/plugin-proposal-decorators",
          Object {
            "legacy": true,
          },
        ],
        Array [
          "@babel/plugin-proposal-class-properties",
          Object {
            "loose": false,
          },
        ],
        Array [
          "babel-plugin-transform-react-remove-prop-types",
          Object {
            "mode": "wrap",
          },
        ],
        Array [
          "@babel/plugin-transform-runtime",
          Object {
            "helpers": true,
            "version": "7.9.0",
          },
        ],
      ],
      "presets": Array [
        Array [
          "@babel/preset-env",
          Object {
            "corejs": 3,
            "exclude": Array [
              "transform-typeof-symbol",
            ],
            "ignoreBrowserslistConfig": false,
            "loose": false,
            "modules": false,
            "targets": undefined,
            "useBuiltIns": "entry",
          },
        ],
        Array [
          "@babel/preset-react",
          Object {
            "development": false,
            "useBuiltIns": true,
          },
        ],
        "@babel/preset-typescript",
      ],
    }
  `);

  expect(diff(defaultPreset, getConfig('test'))).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            "@babel/preset-env",
            Object {
    -         "corejs": 3,
    -         "exclude": Array [
    -           "transform-typeof-symbol",
    -         ],
    -         "ignoreBrowserslistConfig": false,
    -         "loose": false,
    -         "modules": false,
    -         "targets": undefined,
    -         "useBuiltIns": "entry",
    +         "targets": Object {
    +           "node": "current",
    +         },
            },
          ],
    @@ --- --- @@
            "@babel/preset-react",
            Object {
    -         "development": false,
    +         "development": true,
              "useBuiltIns": true,
            },
  `);

  expect(diff(defaultPreset, getConfig('production'))).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);

  expect(diff(defaultPreset, getConfig('development'))).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            "@babel/preset-react",
            Object {
    -         "development": false,
    +         "development": true,
              "useBuiltIns": true,
            },
  `);
});

it('configures `options.jsx`', () => {
  expect(
    diff(
      getConfig('development', { jsx: true }),
      getConfig('development', { jsx: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    -     Array [
    -       "@babel/preset-react",
    -       Object {
    -         "development": true,
    -         "useBuiltIns": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(
    diff(
      getConfig('production', { jsx: true }),
      getConfig('production', { jsx: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    -     Array [
    -       "@babel/preset-react",
    -       Object {
    -         "development": false,
    -         "useBuiltIns": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(
    diff(getConfig('test', { jsx: true }), getConfig('test', { jsx: false })),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    -     Array [
    -       "@babel/preset-react",
    -       Object {
    -         "development": true,
    -         "useBuiltIns": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);
});

it('configures `options.typescript`', () => {
  expect(
    diff(
      getConfig('development', { typescript: true }),
      getConfig('development', { typescript: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          "@babel/plugin-proposal-numeric-separator",
          Array [
    -       "@babel/plugin-proposal-decorators",
    -       Object {
    -         "legacy": true,
    -       },
    -     ],
    -     Array [
    -       "@babel/plugin-proposal-class-properties",
    -       Object {
    -         "loose": false,
    -       },
    -     ],
    -     Array [
            "babel-plugin-transform-react-remove-prop-types",
            Object {
    @@ --- --- @@
            },
          ],
    -     "@babel/preset-typescript",
        ],
      }
  `);

  expect(
    diff(
      getConfig('production', { typescript: true }),
      getConfig('production', { typescript: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          "@babel/plugin-proposal-numeric-separator",
          Array [
    -       "@babel/plugin-proposal-decorators",
    -       Object {
    -         "legacy": true,
    -       },
    -     ],
    -     Array [
    -       "@babel/plugin-proposal-class-properties",
    -       Object {
    -         "loose": false,
    -       },
    -     ],
    -     Array [
            "babel-plugin-transform-react-remove-prop-types",
            Object {
    @@ --- --- @@
            },
          ],
    -     "@babel/preset-typescript",
        ],
      }
  `);

  expect(
    diff(
      getConfig('test', { typescript: true }),
      getConfig('test', { typescript: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          "@babel/plugin-proposal-numeric-separator",
          Array [
    -       "@babel/plugin-proposal-decorators",
    -       Object {
    -         "legacy": true,
    -       },
    -     ],
    -     Array [
    -       "@babel/plugin-proposal-class-properties",
    -       Object {
    -         "loose": false,
    -       },
    -     ],
    -     Array [
            "babel-plugin-transform-react-remove-prop-types",
            Object {
    @@ --- --- @@
            },
          ],
    -     "@babel/preset-typescript",
        ],
      }
  `);
});

it('configures `options.optimize.react`', () => {
  expect(
    diff(
      getConfig('development', { optimize: { react: true } }),
      getConfig('development', { optimize: { react: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          ],
          Array [
    -       "babel-plugin-transform-react-remove-prop-types",
    -       Object {
    -         "mode": "wrap",
    -       },
    -     ],
    -     Array [
            "@babel/plugin-transform-runtime",
            Object {
  `);

  expect(
    diff(
      getConfig('production', { optimize: { react: true } }),
      getConfig('production', { optimize: { react: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          ],
          Array [
    -       "babel-plugin-transform-react-remove-prop-types",
    -       Object {
    -         "mode": "wrap",
    -       },
    -     ],
    -     Array [
            "@babel/plugin-transform-runtime",
            Object {
  `);

  expect(
    diff(
      getConfig('test', { optimize: { react: true } }),
      getConfig('test', { optimize: { react: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
          ],
          Array [
    -       "babel-plugin-transform-react-remove-prop-types",
    -       Object {
    -         "mode": "wrap",
    -       },
    -     ],
    -     Array [
            "@babel/plugin-transform-runtime",
            Object {
  `);
});

it('configures `options.optimize.runtime`', () => {
  expect(
    diff(
      getConfig('development', { optimize: { runtime: true } }),
      getConfig('development', { optimize: { runtime: false } }),
    ),
  ).toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

@@ --- --- @@
        },
      ],
-     Array [
-       "@babel/plugin-transform-runtime",
-       Object {
-         "helpers": true,
-         "version": "7.9.0",
-       },
-     ],
    ],
    "presets": Array [
`);

  expect(
    diff(
      getConfig('production', { optimize: { runtime: true } }),
      getConfig('production', { optimize: { runtime: false } }),
    ),
  ).toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

@@ --- --- @@
        },
      ],
-     Array [
-       "@babel/plugin-transform-runtime",
-       Object {
-         "helpers": true,
-         "version": "7.9.0",
-       },
-     ],
    ],
    "presets": Array [
`);

  expect(
    diff(
      getConfig('test', { optimize: { runtime: true } }),
      getConfig('test', { optimize: { runtime: false } }),
    ),
  ).toMatchInlineSnapshot(`
Snapshot Diff:
- First value
+ Second value

@@ --- --- @@
        },
      ],
-     Array [
-       "@babel/plugin-transform-runtime",
-       Object {
-         "helpers": true,
-         "version": "7.9.0",
-       },
-     ],
    ],
    "presets": Array [
`);
});
