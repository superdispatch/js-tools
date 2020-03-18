import {
  getConfigValues,
  getDevConfigDiff,
} from '../__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = await getConfigValues('node-pkg', 'node');

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

it('not changes in dev mode', async () => {
  const rules = await getDevConfigDiff('node-pkg', 'node');

  expect(rules).toMatchInlineSnapshot(`
    Snapshot Diff:
    Compared values have no visual difference.
  `);
});
