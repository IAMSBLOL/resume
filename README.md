# A Simple Resume Web


## 简述
搞简历是个琐碎的事情，还是写个模板后边更新json就好了。



### `yarn start`

启动项目

### `yarn build`
打包

参数

名称 | 描述
---|---
--stats | 是否写构建信息（主要还是给BundleAnalyzerPlugin用，不过没做主动启动这个服务）
--profile | webpack分析打包

### `yarn lint`
eslint检测，但是没加fix，自己手动fix吧

### `yarn image`
构建镜像

参数

名称 | 描述
---|---
--tag \ --t | 镜像tag
--d | 镜像描述

==*备注：CICD或许是clone镜像方式问题，脚本.git文件不一致，所以不在cicd自动构建镜像*==

### `yarn bnp`
打包+构建镜像
参数同上

### `yarn test` 
暂未添加，正经前端搞啥自动化测试，是需求不够多吗





## 相关文档链接
 [Create React App](https://github.com/facebook/create-react-app)
 
 [babel](https://www.babeljs.cn/docs/)
 
 [WEBPACK 5.X](https://webpack.docschina.org/guides/getting-started/#creating-a-bundle).

 [react router v6](https://reactrouter.com/docs/en/v6).
 
 [cpp wasm ,别看官网了，我写了个文档](https://zhuanlan.zhihu.com/p/495213548?).