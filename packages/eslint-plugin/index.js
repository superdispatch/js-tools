'use strict';

module.exports = {
  rules: {},
  configs: {
    app: { extends: './configs/app' },
    base: { extends: './configs/base' },
    node: { extends: './configs/node' },
    jest: { extends: './configs/jest' },
    react: { extends: './configs/react' },
    typescript: { extends: './configs/typescript' },
  },
};
