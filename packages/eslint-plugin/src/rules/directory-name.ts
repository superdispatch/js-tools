/**
 * @param {string} text
 */
import { Rule } from 'eslint';
import _ from 'lodash';
import path from 'path';

function isValidDirname(text: string) {
  return new RegExp(
    '^' +
      // Can possibly start with `__` (e.g: `__tests__`).
      '(__)?' +
      // Should start with alphanumeric symbols.
      '([a-z0-9]+)' +
      // Can be separated with only dash followed by alphanumeric symbols.
      '(-[a-z0-9]+)*' +
      // Can possibly end with `__` (e.g: `__tests__`).
      '(__)?' +
      '$',
  ).test(text);
}

const rule: Rule.RuleModule = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    const cwd = ((context as unknown) as { getCwd: () => string }).getCwd();
    const baseDir = _.trim(
      path.dirname(context.getFilename()).replace(cwd, ''),
      path.sep,
    )
      .split(path.sep)
      .pop();

    return {
      Program(node) {
        if (
          baseDir &&
          // `path.dirname` gives `.` for root file
          baseDir !== '.' &&
          !isValidDirname(baseDir)
        ) {
          context.report({
            node,
            message:
              'Directory name must be in kebab-case. Please rename "{{ invalid }}" to "{{ valid }}"',
            data: {
              invalid: baseDir,
              valid: baseDir.replace(
                /^(__)?(.*?)(__)?$/,
                (_match, m1: string, m2: string, m3: string) =>
                  [m1, _.kebabCase(m2), m3].filter(Boolean).join(''),
              ),
            },
          });
        }
      },
    };
  },
};

export default rule;
