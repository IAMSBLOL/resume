'use strict';

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');
const devServerConfig = require('../config/server.config')
const paths = require('../config/config-utils/paths')
const webpackDevConfig = require('../config/webpack.config.dev');
// const ignoredFiles = require('react-dev-utils/ignoredFiles');
const openBrowser = require('react-dev-utils/openBrowser');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
// const fs = require('fs');
// const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware');
// const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
// const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware');
const chalk = require('chalk');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

choosePort(HOST, DEFAULT_PORT).then(port => {
  const urls = prepareUrls(
    protocol,
    HOST,
    port,
    paths.publicUrlOrPath.slice(0, -1)
  );

  const options = {
    https: process.env.HTTPS,
    historyApiFallback: true,
    // contentBase: paths.appPublic,
    compress: true,
    // watchContentBase: true,
    hot: true,
    // publicPath: '/',
    host: HOST,
    port,
    open: false,
    // writeToDisk: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    static: {
      // By default WebpackDevServer serves physical files from current directory
      // in addition to all the virtual build products that it serves from memory.
      // This is confusing because those files won’t automatically be available in
      // production build folder unless we copy them. However, copying the whole
      // project directory is dangerous because we may expose sensitive files.
      // Instead, we establish a convention that only files in `public` directory
      // get served. Our build script will copy `public` into the `build` folder.
      // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
      // Note that we only recommend to use `public` folder as an escape hatch
      // for files like `favicon.ico`, `manifest.json`, and libraries that are
      // for some reason broken when imported through webpack. If you just want to
      // use an image, put it in `src` and `import` it from JavaScript instead.
      directory: paths.appPublic,
      publicPath: [paths.publicUrlOrPath],
      // By default files from `contentBase` will not trigger a page reload.
      watch: {
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebook/create-react-app/issues/293
        // src/node_modules is not ignored to support absolute imports
        // https://github.com/facebook/create-react-app/issues/1065
        ignored: ignoredFiles(paths.appSrc),
      },
    },
    devMiddleware: {
      // It is important to tell WebpackDevServer to use the same "publicPath" path as
      // we specified in the webpack config. When homepage is '.', default to serving
      // from the root.
      // remove last slash so user can land on `/test` instead of `/test/`
      publicPath: paths.publicUrlOrPath.slice(0, -1),
    },

    client: {

      overlay: {
        errors: true,
        warnings: false,
      },
    },
  };

  const _options = merge(options, devServerConfig);

  // WebpackDevServer.addDevServerEntrypoints(webpackDevConfig, _options);

  const compiler = webpack(webpackDevConfig);

  // function clearConsole () {
  //   process.stdout.write(
  //     process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  //   );
  // }

  function printInstructions (appName, urls, useYarn) {
    // clearConsole()
    console.log('------------------------------------------------------------');
    console.log(`你现在可以在浏览器中查看 ${chalk.blueBright(appName)} 项目.`);
    console.log('------------------------------------------------------------');

    if (urls.lanUrlForTerminal) {
      console.log('------------------------------------------------------------');
      console.log(
        `  ${chalk.bold('本地:')}  ${urls.localUrlForTerminal}`
      );
      console.log(
        `  ${chalk.bold('网络:')}  ${urls.lanUrlForTerminal}`
      );
      console.log('------------------------------------------------------------');
    } else {
      console.log('------------------------------------------------------------');
      console.log(chalk.bold(`  ${urls.localUrlForTerminal}`));
      console.log('------------------------------------------------------------');
    }
  }

  compiler.hooks.done.tap('done', stats => {
    printInstructions('REACT-CLI', urls)
  })

  const devServer = new WebpackDevServer(_options, compiler);

  // const runServer = async () => {
  //   console.log('Starting server...');
  //   await devServer.start();
  // };

  // runServer();

  devServer.startCallback(() => {
    openBrowser(urls.localUrlForBrowser);
  });

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      devServer.close();
      process.exit();
    });
  });

  if (process.env.CI !== 'true') {
    // Gracefully exit when stdin ends
    process.stdin.on('end', function () {
      devServer.close();
      process.exit();
    });
  }
});
