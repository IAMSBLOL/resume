module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    es6: true
  },
  extends: [
    'standard',
    'standard-react',

    'plugin:react-hooks/recommended',
    'plugin:react/recommended'
  ],

  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
      jsx: true,
      legacyDecorators: true,
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    'babel',
    'react',
    'promise'
  ],
  rules: {
    'multiline-ternary': 'off',
    camelcase: 0,
    'no-empty': ['off', { allowEmptyCatch: true }],
    indent: [
      'error',
      2,
      {
        // ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute']
      }
    ],
    'react/jsx-indent': [0, 2],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: 0,
    'react/no-unused-prop-types': 0,
    'react/display-name': ['off', { ignoreTranspilerName: false }],
    'react/prop-types': 0,
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true
      }
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'import/no-named-default': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },

  overrides: [{
    files: ['**/*.ts', '**/*.tsx'],
    env: {
      browser: true,
      commonjs: true,
      es2021: true,
      es6: true
    },
    extends: [
      'standard',
      'standard-react',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/recommended'
    ],
    // globals: { Atomics: 'readonly', SharedArrayBuffer: 'readonly' },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
        legacyDecorators: true
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      project: './tsconfig.json'
    },
    plugins: [
      'babel',
      'react',
      'promise',
      '@typescript-eslint'
    ],
    rules: {
      camelcase: 0,
      'react/display-name': ['off', { ignoreTranspilerName: false }],
      indent: [
        'error',
        2,
        {
          // ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute']
        }
      ],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'multiline-ternary': 'off',
      'react/jsx-curly-brace-presence': [2, { props: 'never', children: 'never' }],
      'no-empty': ['off', { allowEmptyCatch: true }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-var-requires': 0,
      'react/jsx-indent': [0, 2],
      semi: 0,
      'react/no-unused-prop-types': 0,
      'react/prop-types': 0,
      'generator-star-spacing': [
        'error',
        {
          before: false,
          after: true
        }
      ],
      'comma-dangle': ['error', 'only-multiline'],
      'import/no-named-default': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    },

  }]
};
