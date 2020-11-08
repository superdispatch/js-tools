'use strict';

const snapshotDiff = require('snapshot-diff');
const stripANSI = require('strip-ansi');

const preset = require('../index');

/**
 * @param {any} a
 * @param {any} b
 */
function diff(a, b) {
  return stripANSI(
    snapshotDiff(a, b, { contextLines: 2, stablePatchmarks: true }),
  );
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
  print: (value, serialize) =>
    serialize(String(value).replace(cwd, '<rootDir>')),
});

test('details', () => {
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
            "version": "7.12.5",
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
            "runtime": "classic",
            "useBuiltIns": true,
            "useSpread": true,
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
              "runtime": "classic",
              "useBuiltIns": true,
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
              "runtime": "classic",
              "useBuiltIns": true,
  `);
});

test('options.jsx', () => {
  expect(
    diff(getConfig('development'), getConfig('development', { jsx: false })),
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
    -         "runtime": "classic",
    -         "useBuiltIns": true,
    -         "useSpread": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(diff(getConfig('production'), getConfig('production', { jsx: false })))
    .toMatchInlineSnapshot(`
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
    -         "runtime": "classic",
    -         "useBuiltIns": true,
    -         "useSpread": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(diff(getConfig('test'), getConfig('test', { jsx: false })))
    .toMatchInlineSnapshot(`
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
    -         "runtime": "classic",
    -         "useBuiltIns": true,
    -         "useSpread": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(
    diff(
      getConfig('development'),
      getConfig('development', { jsx: 'runtime' }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "development": true,
    -         "runtime": "classic",
    +         "runtime": "automatic",
              "useBuiltIns": true,
              "useSpread": true,
  `);

  expect(
    diff(getConfig('production'), getConfig('production', { jsx: 'runtime' })),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "development": false,
    -         "runtime": "classic",
    +         "runtime": "automatic",
              "useBuiltIns": true,
              "useSpread": true,
  `);

  expect(diff(getConfig('test'), getConfig('test', { jsx: 'runtime' })))
    .toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "development": true,
    -         "runtime": "classic",
    +         "runtime": "automatic",
              "useBuiltIns": true,
              "useSpread": true,
  `);
});

test('options.typescript', () => {
  expect(
    diff(
      getConfig('development'),
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
      getConfig('production'),
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

  expect(diff(getConfig('test'), getConfig('test', { typescript: false })))
    .toMatchInlineSnapshot(`
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

test('options.optimize.react', () => {
  expect(
    diff(
      getConfig('development'),
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
      getConfig('production'),
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
    diff(getConfig('test'), getConfig('test', { optimize: { react: false } })),
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

test('options.optimize.runtime', () => {
  expect(
    diff(
      getConfig('development'),
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
    -         "version": "7.12.5",
    -       },
    -     ],
        ],
        "presets": Array [
  `);

  expect(
    diff(
      getConfig('production'),
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
    -         "version": "7.12.5",
    -       },
    -     ],
        ],
        "presets": Array [
  `);

  expect(
    diff(
      getConfig('test'),
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
    -         "version": "7.12.5",
    -       },
    -     ],
        ],
        "presets": Array [
  `);
});

test('options.optimize.pureCalls', () => {
  expect(
    diff(
      getConfig('development'),
      getConfig('development', { optimize: { pureCalls: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    +     "babel-plugin-annotate-pure-calls",
        ],
        "presets": Array [
  `);

  expect(
    diff(
      getConfig('production'),
      getConfig('production', { optimize: { pureCalls: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    +     "babel-plugin-annotate-pure-calls",
        ],
        "presets": Array [
  `);

  expect(
    diff(
      getConfig('test'),
      getConfig('test', { optimize: { pureCalls: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    +     "babel-plugin-annotate-pure-calls",
        ],
        "presets": Array [
  `);
});

test('options.optimize.devExpressions', () => {
  expect(
    diff(
      getConfig('development'),
      getConfig('development', { optimize: { devExpressions: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);

  expect(
    diff(
      getConfig('production'),
      getConfig('production', { optimize: { devExpressions: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
    +     "babel-plugin-dev-expression",
        ],
        "presets": Array [
  `);

  expect(
    diff(
      getConfig('test'),
      getConfig('test', { optimize: { devExpressions: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);
});
