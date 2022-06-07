const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
// 注意要和webpack css 的一致
const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';
const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'entry',
      corejs: 3,
      exclude: [
        'transform-typeof-symbol'
      ]
    }
  ],
  ['@babel/preset-react', {
    runtime: 'automatic'
  }],
  '@babel/preset-typescript'
];
const plugins = [
  '@babel/plugin-syntax-dynamic-import',
  'babel-plugin-macros',
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true
    }
  ],
  [
    '@babel/plugin-proposal-pipeline-operator',
    {
      proposal: 'minimal'
    }
  ],
  ['@babel/plugin-transform-runtime', {
    corejs: false,
    regenerator: true,
    version: require('@babel/runtime/package.json').version,

  }],
  [
    '@dr.pogodin/babel-plugin-react-css-modules',
    {

      filetypes: {
        '.less': {
          syntax: 'postcss-less',
        }
      },
      generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,

    }
  ],
  // [
  //   require.resolve('babel-plugin-named-asset-import'),
  //   {
  //     loaderMap: {
  //       svg: {
  //         ReactComponent:
  //           '@svgr/webpack?-svgo,+titleProp,+ref![path]',
  //       },
  //     },
  //   },
  // ],
  ['import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }],
  // 默认开启这个热更新
  isEnvDevelopment && require.resolve('react-refresh/babel'),
  isEnvProduction && [
    // Remove PropTypes from production build
    require('babel-plugin-transform-react-remove-prop-types').default,
    {
      removeImport: true,
    },
  ],

  isEnvProduction && ['babel-plugin-clean-code', {
    clearConsole: true,
    consoleLevel: ['log', 'error', 'info', 'warn'],
    clearDebugger: true,
  }]
].filter(Boolean)
module.exports = { presets, plugins };
