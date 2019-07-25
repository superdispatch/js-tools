const { resolveConfig } = require('prettier');

it('exposes config', async () => {
  await expect(resolveConfig(__filename)).resolves.toMatchInlineSnapshot(`
          Object {
            "printWidth": 100,
            "singleQuote": true,
            "trailingComma": "all",
          }
        `);
});
