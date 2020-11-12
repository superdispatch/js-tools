'use strict';

import { RuleTester } from 'eslint';

import rule from './prefer-design-system-colors';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    designSystemColors: {
      '#fff': {
        source: '@superdispatch/ui',
        specifier: 'Color.White',
      },
      '#6a707c': {
        source: '@superdispatch/ui',
        specifier: 'Color.Grey200',
      },
    },
  },
});

ruleTester.run('prefer-design-system-colors', rule, {
  valid: [
    { code: 'const color = "#FFF8E7"' },
    { code: 'const Icon = () => <svg fill="#FFF8E7"/>' },
    { code: 'const Icon = () => <svg fill={`#FFF8E7`}/>' },
    { code: 'const Icon = ({ fill = "#FFF8E7" }) => <svg fill={fill}/>' },
    { code: 'const Icon = () => <svg style={{color: "#FFF8E7"}}/>' },
    { code: 'const Icon = () => <svg style={{color: `#FFF8E7`}}/>' },
    { code: 'const Icon = styled.svg`color: #FFF8E7;`' },
    { code: 'const Icon = () => <svg css="color: #FFF8E7"/>' },
    { code: 'const Icon = () => <svg css={`color: #FFF8E7`}/>' },
  ],
  invalid: [
    {
      code: 'const color = "#FFF"',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 15,
        },
      ],
    },
    {
      code: 'const a = "#FFF", b = "#fff", c = "#6A707C", d = "#6a707c"',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 11,
        },
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 23,
        },
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 35,
        },
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 50,
        },
      ],
    },

    {
      code: 'const Icon = () => <svg fill="#FFF"/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 30,
        },
      ],
    },

    {
      code: 'const Icon = () => <svg fill={`#FFF`}/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 31,
        },
      ],
    },

    {
      code: 'const Icon = ({ fill = "#FFF" }) => <svg fill={fill}/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 24,
        },
      ],
    },

    {
      code: 'const Icon = ({ fill = `#FFF` }) => <svg fill={fill}/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 24,
        },
      ],
    },

    {
      code: 'const Icon = () => <svg style={{color: "#FFF"}}/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 40,
        },
      ],
    },

    {
      code: 'const Icon = () => <svg style={{color: `#FFF`}}/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 40,
        },
      ],
    },

    {
      code: 'const Icon = styled.svg`color: #FFF;`',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 24,
        },
      ],
    },

    {
      code: 'const Icon = styled.svg`color: #FFF; background-color: #6a707c`',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 24,
        },
        {
          message: 'Use Color.Grey200 from "@superdispatch/ui"',
          line: 1,
          column: 24,
        },
      ],
    },

    {
      code:
        'import { Color } from "@superdispatch/ui";\n' +
        'const Icon = styled.svg`color: #FFF; background-color: ${Color.Grey200}`',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 2,
          column: 24,
        },
      ],
    },

    {
      code: 'const Icon = styled.svg`display: flex; ${() => "color: #FFF"}`',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 48,
        },
      ],
    },

    {
      code:
        'const Icon = styled.svg`display: flex; ${() => `color: ${"#FFF"}`}`',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 58,
        },
      ],
    },

    {
      code:
        'const Icon = styled.svg`display: flex; ${() => `color: ${`#FFF`}`}`',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 58,
        },
      ],
    },

    {
      code: 'const Icon = () => <svg css="color: #FFF"/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 29,
        },
      ],
    },

    {
      code: 'const Icon = () => <svg css={`color: #FFF`}/>',
      errors: [
        {
          message: 'Use Color.White from "@superdispatch/ui"',
          line: 1,
          column: 30,
        },
      ],
    },
  ],
});
