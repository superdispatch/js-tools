'use strict';

const { RuleTester } = require('eslint');
const rule = require('../prefer-design-system-colors');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    designSystemColors: {
      '#6A707C': {
        source: '@superdispatch/ui',
        specifier: 'Color.Grey200',
      },
      '#5B6371': {
        source: '@superdispatch/ui',
        specifier: 'Color.Grey300',
      },
    },
  },
});

ruleTester.run('prefer-design-system-colors', rule, {
  valid: [
    { code: 'const color =  "#e4e7ea";' },
    { code: 'export const icon = <svg fill="#e4e7ea"></svg>;' },

    {
      code:
        'export const Placeholder = <p style={{backgroundColor: "#e4e7ea"}}>Hi</p>;',
    },
    {
      code: 'export const Placeholder = styled.p`background-color: #e4e7ea;`;',
    },
    {
      code:
        'export const Placeholder = <p css="background-color: #e4e7ea;">Hi</p>;',
    },
  ],
  invalid: [
    {
      code: 'const color =  "#6A707C";',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 16,
        },
      ],
    },
    {
      code: 'const color =  `#6A707C`;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 16,
        },
      ],
    },
    {
      code: 'const color =  "#6A707C";const color2 = "#5B6371";',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 16,
        },
        {
          message: 'Use Color.Grey300 from "@superdispatch/ui"',
          line: 1,
          column: 41,
        },
      ],
    },
    {
      code: 'export const icon = <svg fill="#6A707C"></svg>;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 31,
        },
      ],
    },
    {
      code: 'export const icon = <svg fill={"#6A707C"}></svg>;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 32,
        },
      ],
    },
    {
      code:
        'export const Placeholder = <p style={{backgroundColor: "#6A707C"}}>Hi</p>;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 56,
        },
      ],
    },

    {
      code: 'export const Placeholder = styled.p`background-color: #6A707C;`;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 36,
        },
      ],
    },
    {
      code:
        'export const Placeholder = <p css="background-color: #6A707C;color: #5B6371;">Hi</p>;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 35,
        },
        {
          message: 'Use Color.Grey300 from "@superdispatch/ui"',
          line: 1,
          column: 35,
        },
      ],
    },
    {
      code:
        "import { Color } from '@superdispatch/ui';\n" +
        'export const Placeholder = <p css={`background-color: #6A707C;color: ${Color.Grey200};`}>Hi</p>;',
      errors: [
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 2,
          column: 36,
        },
      ],
    },
  ],
});
