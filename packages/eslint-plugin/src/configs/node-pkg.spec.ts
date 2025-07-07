import {
  getConfigData,
  getConfigDataDiff,
} from './__testutils__/test-eslint-config';

it('extends dependencies', async () => {
  const [meta, rules] = getConfigDataDiff(
    await getConfigData('node'),
    await getConfigData('node-pkg'),
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
        ],
        "node/no-unpublished-import": Array [
          "off",
        ],
        "node/no-unpublished-require": Array [
    -     "off",
    +     "error",
        ],
        "node/no-unsupported-features/es-builtins": Array [
          "error",
        ],
        "node/no-unsupported-features/es-syntax": Array [
  `);
});
