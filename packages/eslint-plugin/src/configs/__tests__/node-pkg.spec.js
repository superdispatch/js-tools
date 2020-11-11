'use strict';

const {
  getConfigsDiff,
  getConfigValues,
} = require('../__testutils__/test-eslint-config');

it('extends dependencies', async () => {
  const [meta, rules] = getConfigsDiff(
    await getConfigValues('node'),
    await getConfigValues('node-pkg'),
  );

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
