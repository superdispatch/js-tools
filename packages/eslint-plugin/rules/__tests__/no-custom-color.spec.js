'use strict';

const { RuleTester } = require('eslint');
const rule = require('../no-custom-color');

const parserOptions = {
  ecmaVersion: 2020,
  sourceType: 'module',
  ecmaFeatures: { jsx: true },
};

const ruleTester = new RuleTester({ parserOptions });

ruleTester.run('no-custom-color', rule, {
  valid: [
    {
      code: 'const color =  "#e4e7ea";',
    },
    {
      code: 'export const icon = <svg fill="#e4e7ea"></svg>;',
    },

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
      output:
        "import { Color } from '@superdispatch/ui';" +
        'const color =  Color.Grey200;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
    {
      code: 'const color =  `#6A707C`;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'const color =  Color.Grey200;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
    {
      code: 'const color =  "#6A707C";const color2 =  "#6A707C";',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'const color =  Color.Grey200;' +
        'const color2 =  Color.Grey200;',
      errors: [
        'Use Color.Grey200 from "@superdispatch/ui"',
        'Use Color.Grey200 from "@superdispatch/ui"',
      ],
    },
    {
      code: 'export const icon = <svg fill="#6A707C"></svg>;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'export const icon = <svg fill={Color.Grey200}></svg>;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
    {
      code: 'export const icon = <svg fill={"#6A707C"}></svg>;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'export const icon = <svg fill={Color.Grey200}></svg>;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
    {
      code:
        'export const Placeholder = <p style={{backgroundColor: "#6A707C"}}>Hi</p>;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'export const Placeholder = <p style={{backgroundColor: Color.Grey200}}>Hi</p>;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },

    {
      code: 'export const Placeholder = styled.p`background-color: #6A707C;`;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'export const Placeholder = styled.p`background-color: ${Color.Grey200};`;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
    {
      code:
        'export const Placeholder = <p css="background-color: #6A707C;color: #6A707C;">Hi</p>;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'export const Placeholder = <p css={`background-color: ${Color.Grey200};color: ${Color.Grey200};`}>Hi</p>;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
    {
      code:
        "import { Color } from '@superdispatch/ui';" +
        'export const Placeholder = <p css={`background-color: #6A707C;color: ${Color.Grey200};`}>Hi</p>;',
      output:
        "import { Color } from '@superdispatch/ui';" +
        'export const Placeholder = <p css={`background-color: ${Color.Grey200};color: ${Color.Grey200};`}>Hi</p>;',
      errors: ['Use Color.Grey200 from "@superdispatch/ui"'],
    },
  ],
});
