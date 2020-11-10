import snapshotDiff from 'snapshot-diff';

import preset, { PresetOptions } from './preset';

function presetDiff(before: unknown, after: unknown) {
  return snapshotDiff(before, after, {
    contextLines: 2,
    stablePatchmarks: true,
  });
}

function createPreset(env?: string, options?: PresetOptions) {
  if (env) {
    process.env.NODE_ENV = env;
  } else {
    delete process.env.NODE_ENV;
  }

  const config = preset({}, options);

  process.env.NODE_ENV = 'test';

  return config;
}

test('basic', () => {
  const defaultPreset = createPreset();

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
          },
        ],
        "@babel/preset-typescript",
      ],
    }
  `);

  expect(presetDiff(defaultPreset, createPreset('test')))
    .toMatchInlineSnapshot(`
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

  expect(presetDiff(defaultPreset, createPreset('production')))
    .toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);

  expect(presetDiff(defaultPreset, createPreset('development')))
    .toMatchInlineSnapshot(`
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

test('errors', () => {
  expect(() => createPreset('noop')).toThrowErrorMatchingInlineSnapshot(
    `"Unknown \\"env\\", expected one of: \\"test\\", \\"production\\", \\"development\\" but got \\"noop\\"."`,
  );

  expect(() =>
    createPreset(undefined, {
      // @ts-expect-error unknown options
      foo: 1,
      bar: 2,
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Unknown options: [\\"foo\\",\\"bar\\"]"`,
  );

  expect(() =>
    createPreset(undefined, {
      optimize: {
        // @ts-expect-error unknown options
        foo: 1,
        bar: 2,
      },
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Unknown optimization options: [\\"foo\\",\\"bar\\"]"`,
  );

  expect(() =>
    createPreset(undefined, {
      // @ts-expect-error invalid target
      targets: { esmodules: true },
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Invalid \\"targets\\" option, expected \\"string\\", but got: {\\"esmodules\\":true}"`,
  );

  expect(() =>
    createPreset(undefined, { jsx: 'noop' }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Invalid \\"jsx\\" option, expected \\"boolean\\" or \\"runtime\\", but got: \\"noop\\""`,
  );
});

test('options.jsx', () => {
  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { jsx: false }),
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
    -         "runtime": "classic",
    -         "useBuiltIns": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(
    presetDiff(
      createPreset('production'),
      createPreset('production', { jsx: false }),
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
    -         "runtime": "classic",
    -         "useBuiltIns": true,
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(presetDiff(createPreset('test'), createPreset('test', { jsx: false })))
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
    -       },
    -     ],
          "@babel/preset-typescript",
        ],
  `);

  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { jsx: 'runtime' }),
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
            },
  `);

  expect(
    presetDiff(
      createPreset('production'),
      createPreset('production', { jsx: 'runtime' }),
    ),
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
            },
  `);

  expect(
    presetDiff(createPreset('test'), createPreset('test', { jsx: 'runtime' })),
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
            },
  `);
});

test('options.targets', () => {
  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { targets: '> 2%' }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
                "transform-typeof-symbol",
              ],
    -         "ignoreBrowserslistConfig": false,
    +         "ignoreBrowserslistConfig": true,
              "loose": false,
              "modules": false,
    -         "targets": undefined,
    +         "targets": Object {
    +           "browsers": "> 2%",
    +         },
              "useBuiltIns": "entry",
            },
  `);

  expect(
    presetDiff(
      createPreset('production'),
      createPreset('production', { targets: '> 2%' }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
                "transform-typeof-symbol",
              ],
    -         "ignoreBrowserslistConfig": false,
    +         "ignoreBrowserslistConfig": true,
              "loose": false,
              "modules": false,
    -         "targets": undefined,
    +         "targets": Object {
    +           "browsers": "> 2%",
    +         },
              "useBuiltIns": "entry",
            },
  `);

  expect(
    presetDiff(createPreset('test'), createPreset('test', { targets: '> 2%' })),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);

  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { targets: 'esmodules' }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
                "transform-typeof-symbol",
              ],
    -         "ignoreBrowserslistConfig": false,
    +         "ignoreBrowserslistConfig": true,
              "loose": false,
              "modules": false,
    -         "targets": undefined,
    +         "targets": Object {
    +           "esmodules": true,
    +         },
              "useBuiltIns": "entry",
            },
  `);

  expect(
    presetDiff(
      createPreset('production'),
      createPreset('production', { targets: 'esmodules' }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
                "transform-typeof-symbol",
              ],
    -         "ignoreBrowserslistConfig": false,
    +         "ignoreBrowserslistConfig": true,
              "loose": false,
              "modules": false,
    -         "targets": undefined,
    +         "targets": Object {
    +           "esmodules": true,
    +         },
              "useBuiltIns": "entry",
            },
  `);

  expect(
    presetDiff(
      createPreset('test'),
      createPreset('test', { targets: 'esmodules' }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);
});

test('options.typescript', () => {
  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { typescript: false }),
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
    presetDiff(
      createPreset('production'),
      createPreset('production', { typescript: false }),
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
    presetDiff(
      createPreset('test'),
      createPreset('test', { typescript: false }),
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

test('options.optimize.react', () => {
  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { optimize: { react: false } }),
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
    presetDiff(
      createPreset('production'),
      createPreset('production', { optimize: { react: false } }),
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
    presetDiff(
      createPreset('test'),
      createPreset('test', { optimize: { react: false } }),
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

test('options.optimize.runtime', () => {
  expect(
    presetDiff(
      createPreset('development'),
      createPreset('development', { optimize: { runtime: false } }),
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
    presetDiff(
      createPreset('production'),
      createPreset('production', { optimize: { runtime: false } }),
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
    presetDiff(
      createPreset('test'),
      createPreset('test', { optimize: { runtime: false } }),
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
    presetDiff(
      createPreset('development'),
      createPreset('development', { optimize: { pureCalls: true } }),
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
    presetDiff(
      createPreset('production'),
      createPreset('production', { optimize: { pureCalls: true } }),
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
    presetDiff(
      createPreset('test'),
      createPreset('test', { optimize: { pureCalls: true } }),
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
    presetDiff(
      createPreset('development'),
      createPreset('development', { optimize: { devExpressions: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);

  expect(
    presetDiff(
      createPreset('production'),
      createPreset('production', { optimize: { devExpressions: true } }),
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
    presetDiff(
      createPreset('test'),
      createPreset('test', { optimize: { devExpressions: true } }),
    ),
  ).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);
});
