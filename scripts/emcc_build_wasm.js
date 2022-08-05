const fs = require('fs')
const path = require('path')
const chalk = require('chalk');
const shell = require('shelljs')
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

if (fs.existsSync(resolveApp('src/wasm'))) {
  console.log('yes')
  // emcc hello.c -O3 -s SIDE_MODULE=1 -o hello.wasm
  if (shell.exec('emcc --version').code !== 0) {
    shell.echo('Error: You need to install emcc, you can see my fucking document: https://zhuanlan.zhihu.com/p/495213548');
    shell.exit(1);
  } else {
    // shell.cd('./cpp')
    shell.exec('emcc src/wasm/cpp/helloword.cpp -O3 -s SIDE_MODULE=1 -s ENVIRONMENT=web -o src/wasm/lib/helloword.wasm')
  }
} else {
//   fs.mkdirSync(resolveApp('src/wasm'))
  chalk.redBright('no direactory : src/wasm')
}
