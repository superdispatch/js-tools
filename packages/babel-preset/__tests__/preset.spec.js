'use strict';

const snapshotDiff = require('snapshot-diff');

const preset = require('../index');

function diff(a, b) {
  return snapshotDiff(a, b, { stablePatchmarks: true });
}

const apis = {
  test: { env: x => x === 'test' },
  dev: { env: x => x === 'development' },
  prod: { env: x => x === 'production' },
};

const cwd = process.cwd();

expect.addSnapshotSerializer({
  test: value => typeof value === 'string' && value.includes(cwd),
  print: (value, serialize) => serialize(value.replace(cwd, '<rootDir>')),
});

it('exposes default settings', () => {
  const devPreset = preset(apis.dev);

  expect(devPreset).toMatchInlineSnapshot(`
    Object {
      "plugins": Array [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-numeric-separator",
        Array [
          "@babel/plugin-proposal-object-rest-spread",
          Object {
            "loose": true,
            "useBuiltIns": true,
          },
        ],
        Array [
          "@babel/plugin-proposal-optional-chaining",
          Object {
            "loose": true,
          },
        ],
        Array [
          "@babel/plugin-proposal-nullish-coalescing-operator",
          Object {
            "loose": true,
          },
        ],
        Array [
          "@babel/plugin-proposal-decorators",
          Object {
            "decoratorsBeforeExport": true,
            "legacy": true,
          },
        ],
        Array [
          "@babel/plugin-proposal-class-properties",
          Object {
            "loose": true,
          },
        ],
        Array [
          "babel-plugin-transform-react-remove-prop-types",
          Object {
            "removeImport": true,
          },
        ],
        Array [
          "@babel/plugin-transform-runtime",
          Object {
            "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
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
            "loose": true,
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

  expect(diff(devPreset, preset(apis.prod))).toMatchInlineSnapshot(`
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

  expect(diff(devPreset, preset(apis.test))).toMatchInlineSnapshot(`
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
              "loose": true,
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
    -         "loose": true,
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
    diff(preset(apis.dev, { jsx: true }), preset(apis.dev, { jsx: false })),
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
    diff(preset(apis.prod, { jsx: true }), preset(apis.prod, { jsx: false })),
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
    diff(preset(apis.test, { jsx: true }), preset(apis.test, { jsx: false })),
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
      preset(apis.dev, { typescript: true }),
      preset(apis.dev, { typescript: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "loose": true,
            },
          ],
          Array [
    -       "@babel/plugin-proposal-decorators",
    -       Object {
    -         "decoratorsBeforeExport": true,
    -         "legacy": true,
    -       },
    -     ],
    -     Array [
    -       "@babel/plugin-proposal-class-properties",
    -       Object {
    -         "loose": true,
    -       },
    -     ],
    -     Array [
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "removeImport": true,
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
      preset(apis.prod, { typescript: true }),
      preset(apis.prod, { typescript: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "loose": true,
            },
          ],
          Array [
    -       "@babel/plugin-proposal-decorators",
    -       Object {
    -         "decoratorsBeforeExport": true,
    -         "legacy": true,
    -       },
    -     ],
    -     Array [
    -       "@babel/plugin-proposal-class-properties",
    -       Object {
    -         "loose": true,
    -       },
    -     ],
    -     Array [
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "removeImport": true,
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
      preset(apis.test, { typescript: true }),
      preset(apis.test, { typescript: false }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "loose": true,
            },
          ],
          Array [
    -       "@babel/plugin-proposal-decorators",
    -       Object {
    -         "decoratorsBeforeExport": true,
    -         "legacy": true,
    -       },
    -     ],
    -     Array [
    -       "@babel/plugin-proposal-class-properties",
    -       Object {
    -         "loose": true,
    -       },
    -     ],
    -     Array [
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "removeImport": true,
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
      preset(apis.dev, { optimize: { react: true } }),
      preset(apis.dev, { optimize: { react: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "loose": true,
            },
          ],
          Array [
    -       "babel-plugin-transform-react-remove-prop-types",
    -       Object {
    -         "removeImport": true,
    -       },
    -     ],
    -     Array [
            "@babel/plugin-transform-runtime",
            Object {
              "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
              "helpers": true,
              "version": "7.7.7",
  `);

  expect(
    diff(
      preset(apis.prod, { optimize: { react: true } }),
      preset(apis.prod, { optimize: { react: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "loose": true,
            },
          ],
          Array [
    -       "babel-plugin-transform-react-remove-prop-types",
    -       Object {
    -         "removeImport": true,
    -       },
    -     ],
    -     Array [
            "@babel/plugin-transform-runtime",
            Object {
              "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
              "helpers": true,
              "version": "7.7.7",
  `);

  expect(
    diff(
      preset(apis.test, { optimize: { react: true } }),
      preset(apis.test, { optimize: { react: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            Object {
              "loose": true,
            },
          ],
          Array [
    -       "babel-plugin-transform-react-remove-prop-types",
    -       Object {
    -         "removeImport": true,
    -       },
    -     ],
    -     Array [
            "@babel/plugin-transform-runtime",
            Object {
              "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
              "helpers": true,
              "version": "7.7.7",
  `);
});

it('configures `options.optimize.runtime`', () => {
  expect(
    diff(
      preset(apis.dev, { optimize: { runtime: true } }),
      preset(apis.dev, { optimize: { runtime: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "removeImport": true,
            },
          ],
    -     Array [
    -       "@babel/plugin-transform-runtime",
    -       Object {
    -         "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
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
      preset(apis.prod, { optimize: { runtime: true } }),
      preset(apis.prod, { optimize: { runtime: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "removeImport": true,
            },
          ],
    -     Array [
    -       "@babel/plugin-transform-runtime",
    -       Object {
    -         "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
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
      preset(apis.test, { optimize: { runtime: true } }),
      preset(apis.test, { optimize: { runtime: false } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
            "babel-plugin-transform-react-remove-prop-types",
            Object {
              "removeImport": true,
            },
          ],
    -     Array [
    -       "@babel/plugin-transform-runtime",
    -       Object {
    -         "absoluteRuntime": "<rootDir>/node_modules/@babel/runtime",
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
