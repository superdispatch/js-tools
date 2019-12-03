'use strict';

const forbidden = [
  'ClassDeclaration',
  'MethodDefinition',
  'FunctionDeclaration',
  'VariableDeclarator',
  'TSInterfaceDeclaration',
  'TSMethodSignature',
  'TSTypeParameter',
  'TSTypeParameterDeclaration',
];

module.exports = {
  meta: {
    schema: [],
    type: 'suggestion',
  },

  create(context) {
    function isException(node) {
      if (node.parent.type === 'Property') {
        // Skip: { foo_bar, foo_bar: fooBar }
        if (node.parent.key === node) {
          return true;
        }

        // Skip: { bar_baz: bar_baz }
        if (node.parent.key.name === node.parent.value.name) {
          return true;
        }

        return false;
      }

      if (node.parent.type === 'AssignmentPattern') {
        // Skip: (fooBar = foo_bar)
        if (node.parent.right === node) {
          return true;
        }

        // Skip: const { foo_bar = 1 } = {}
        if (node.parent.parent && node.parent.parent.type === 'Property') {
          return true;
        }

        return false;
      }

      if (
        node.parent.type === 'ClassProperty' ||
        node.parent.type === 'TSPropertySignature' ||
        node.parent.type === 'TSAbstractClassProperty'
      ) {
        // Bail: class { static foo_bar }
        if (node.parent.static) {
          return false;
        }

        // Bail: class { b_c = () => {} }
        if (
          node.parent.value &&
          node.parent.value.type === 'ArrowFunctionExpression'
        ) {
          return false;
        }

        const { typeAnnotation } = node.parent;

        // Skip: type Foo { bar_baz }
        if (typeAnnotation) {
          // Bail: type Foo { bar_baz: () => void }
          if (typeAnnotation.typeAnnotation.type === 'TSFunctionType') {
            return false;
          }
        }

        return true;
      }

      if (node.parent.type === 'TSPropertySignature') {
        return false;
      }

      return !forbidden.includes(node.parent.type);
    }

    return {
      Identifier(node) {
        const isValid =
          !node.name.includes('_') || node.name === node.name.toUpperCase();

        if (isValid) {
          return;
        }

        if (isException(node)) {
          return;
        }

        context.report(node, 'Do not use snake_case.');
      },
    };
  },
};
