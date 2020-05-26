'use strict';

const { getConfigValues } = require('../__testutils__/test-eslint-config');
const config = require('../node-pkg');
const baseConfig = require('../node');

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues(config, baseConfig);

  expect(meta).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
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
