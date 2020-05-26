'use strict';

const { getConfigValues } = require('../__testutils__/test-eslint-config');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues('node-pkg', 'node');

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    [2mCompared values have no visual difference.[22m
  `);
  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    - First value
    + Second value

    @@ --- --- @@
        "node/no-unpublished-require": Array [
    -     "off",
    +     "error",
        ],
  `);
});
