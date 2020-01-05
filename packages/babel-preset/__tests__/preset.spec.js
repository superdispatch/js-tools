'use strict';

const snapshotDiff = require('snapshot-diff');

const preset = require('../index');

function diff(a, b) {
  return snapshotDiff(a, b, { stablePatchmarks: true });
}

function getConfig(env, options) {
  const { NODE_ENV } = process.env;

  process.env.NODE_ENV = env;

  const config = preset({}, options);

  process.env.NODE_ENV = NODE_ENV;

  return config;
}

const cwd = process.cwd();

expect.addSnapshotSerializer({
  test: value => typeof value === 'string' && value.includes(cwd),
  print: (value, serialize) => serialize(value.replace(cwd, '<rootDir>')),
});

it('exposes default settings', () => {
  const devPreset = getConfig('development');

  expect(devPreset).toMatchInlineSnapshot(`
    Object {
      "plugins": Array [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-numeric-separator",
        Array [
          "@babel/plugin-proposal-object-rest-spread",
          Object {
            "loose": false,
            "useBuiltIns": true,
          },
        ],
        Array [
          "@babel/plugin-proposal-optional-chaining",
          Object {
            "loose": false,
          },
        ],
        Array [
          "@babel/plugin-proposal-nullish-coalescing-operator",
          Object {
            "loose": false,
          },
        ],
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
            "version": "7.7.7",
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
            "development": true,
            "useBuiltIns": true,
          },
        ],
        "@babel/preset-typescript",
      ],
    }
  `);

  expect(diff(devPreset, getConfig('production'))).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            },
          ],
          Array [
            "@babel/preset-react",
            Object {
    -         "development": true,
    +         "development": false,
              "useBuiltIns": true,
            },
          ],
          "@babel/preset-typescript",
        ],
  `);

  expect(diff(devPreset, getConfig('test'))).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
      Object {
        "plugins": Array [
    -     "@babel/plugin-syntax-dynamic-import",
    +     "babel-plugin-dynamic-import-node",
          "@babel/plugin-proposal-numeric-separator",
          Array [
            "@babel/plugin-proposal-object-rest-spread",
            Object {
              "loose": false,
    @@ --- --- @@
        ],
        "presets": Array [
          Array [
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
          Array [
            "@babel/preset-react",
            Object {
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
              "modules": false,
              "targets": undefined,
              "useBuiltIns": "entry",
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
      }
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
              "modules": false,
              "targets": undefined,
              "useBuiltIns": "entry",
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
      }
  `);

  expect(
    diff(getConfig('test', { jsx: true }), getConfig('test', { jsx: false })),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
              "targets": Object {
                "node": "current",
              },
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
      }
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
            Object {
              "loose": false,
            },
          ],
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
              "mode": "wrap",
            },
          ],
    @@ --- --- @@
            Object {
              "development": true,
              "useBuiltIns": true,
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
            Object {
              "loose": false,
            },
          ],
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
              "mode": "wrap",
            },
          ],
    @@ --- --- @@
            Object {
              "development": false,
              "useBuiltIns": true,
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
            Object {
              "loose": false,
            },
          ],
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
              "mode": "wrap",
            },
          ],
    @@ --- --- @@
            Object {
              "development": true,
              "useBuiltIns": true,
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
            Object {
              "loose": false,
            },
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
              "helpers": true,
              "version": "7.7.7",
            },
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
            Object {
              "loose": false,
            },
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
              "helpers": true,
              "version": "7.7.7",
            },
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
            Object {
              "loose": false,
            },
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
              "helpers": true,
              "version": "7.7.7",
            },
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
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "mode": "wrap",
            },
          ],
    -     Array [
    -       "@babel/plugin-transform-runtime",
    -       Object {
    -         "helpers": true,
    -         "version": "7.7.7",
    -       },
    -     ],
        ],
        "presets": Array [
          Array [
            "@babel/preset-env",
            Object {
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
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "mode": "wrap",
            },
          ],
    -     Array [
    -       "@babel/plugin-transform-runtime",
    -       Object {
    -         "helpers": true,
    -         "version": "7.7.7",
    -       },
    -     ],
        ],
        "presets": Array [
          Array [
            "@babel/preset-env",
            Object {
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
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "mode": "wrap",
            },
          ],
    -     Array [
    -       "@babel/plugin-transform-runtime",
    -       Object {
    -         "helpers": true,
    -         "version": "7.7.7",
    -       },
    -     ],
        ],
        "presets": Array [
          Array [
            "@babel/preset-env",
            Object {
  `);
});
