'use strict';

const fs = require('fs');
const path = require('path');
const execa = require('execa');

const yarnLockFileName = 'yarn.lock';
const eslintExtensions = [
  //
  // JavaScript
  '.js',
  '._js',
  '.bones',
  '.es',
  '.es6',
  '.frag',
  '.gs',
  '.jake',
  '.jsb',
  '.jscad',
  '.jsfl',
  '.jsm',
  '.jss',
  '.mjs',
  '.njs',
  '.pac',
  '.sjs',
  '.ssjs',
  '.xsjs',
  '.xsjslib',
  //
  // JSX
  '.jsx',

  //
  // TypeScript
  '.ts',
  '.tsx',
];

const prettierExtensions = [
  ...eslintExtensions,

  //
  // CSS
  '.css',
  //
  // PostCSS
  '.pcss',
  //
  // Less
  '.less',
  //
  // SCSS
  '.scss',
  //
  // GraphQL
  '.graphql',
  '.gql',
  //
  // Handlebars
  '.handlebars',
  '.hbs',
  //
  // HTML
  '.html',
  '.htm',
  '.html.hl',
  '.inc',
  '.st',
  '.xht',
  '.xhtml',
  //
  // Vue
  '.vue',
  //
  // JSON
  '.json',
  '.avsc',
  '.geojson',
  '.gltf',
  '.JSON-tmLanguage',
  '.jsonl',
  '.tfstate',
  '.tfstate.backup',
  '.topojson',
  '.webapp',
  '.webmanifest',
  //
  // JSON5
  '.json5',
  //
  // Flow
  '.js.flow',
  //
  // Markdown
  '.md',
  '.markdown',
  '.mdown',
  '.mdwn',
  '.mkd',
  '.mkdn',
  '.mkdown',
  '.ronn',
  '.workbook',
  //
  // MDX,
  '.mdx',
  //
  // YAML
  '.yml',
  '.mir',
  '.reek',
  '.rviz',
  '.sublime-syntax',
  '.syntax',
  '.yaml',
  '.yaml-tmlanguage',
  '.yml.mysql',
];

function execLinter(cmd, args) {
  console.log(`${cmd} ${args.join(' ')}`);

  return execa(cmd, args, { stdio: 'inherit', preferLocal: true });
}

module.exports = async ({ fix, files, quiet, tools }) => {
  const skipESLint = tools != null && !tools.includes('eslint');
  const skipPettier = tools != null && !tools.includes('prettier');
  const skipYarnDeduplicate = tools != null && !tools.includes('yarn-deduplicate');

  const eslintArgs = [];
  const eslintFiles = [];
  const prettierArgs = [];
  const prettierFiles = [];
  const yarnDeduplicateFiles = [];
  const yarnDeduplicateArgs = [];

  if (fix) {
    eslintArgs.push('--fix');
    prettierArgs.push('--write');
  } else {
    yarnDeduplicateArgs.push('--list');
    prettierArgs.push('--list-different');
  }

  if (quiet) {
    eslintArgs.push('--quiet');
  }

  if (files.length === 0) {
    eslintFiles.push(`**/*{${eslintExtensions.join(',')}}`);
    prettierFiles.push(`**/*{${prettierExtensions.join(',')}}`);

    // Check yarn.lock file in root
    if (fs.existsSync(yarnLockFileName)) {
      yarnDeduplicateFiles.push(yarnLockFileName);
    }
  } else {
    files.forEach(file => {
      const ext = path.extname(file);
      const basename = path.basename(file);

      if (eslintExtensions.includes(ext)) {
        eslintFiles.push(file);
      }

      if (prettierExtensions.includes(ext)) {
        prettierFiles.push(file);
      }

      if (basename === yarnLockFileName) {
        yarnDeduplicateFiles.push(file);
      }
    });
  }

  if (!skipESLint && eslintFiles.length > 0) {
    await execLinter('eslint', [...eslintArgs, ...eslintFiles]);
  }

  if (!skipPettier && prettierFiles.length > 0) {
    await execLinter('prettier', [...prettierArgs, ...prettierFiles]);
  }

  if (!skipYarnDeduplicate && yarnDeduplicateFiles.length > 0) {
    await execLinter('yarn-deduplicate', [...yarnDeduplicateArgs, ...yarnDeduplicateFiles]);
  }
};
