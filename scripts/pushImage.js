const shell = require('shelljs')
const utils = require('./utils')
const chalk = require('chalk');
// const https = require('https')

const fs = require('fs')
// 这行代码在cicd有问题
const gitHEAD = fs.readFileSync('.git/HEAD', 'utf-8').trim() // ref: refs/heads/develop
const ref = gitHEAD.split(': ')[1] // refs/heads/develop
const develop = gitHEAD.split('/')[2] // 环境：develop
const gitVersion = fs.readFileSync('.git/' + ref, 'utf-8').trim() // git版本号，例如：6ceb0ab5059d01fd444cf4e78467cc2dd1184a66
const gitCommitVersion = develop + '-' + gitVersion // 例如dev环境: "develop: 6ceb0ab5059d01fd444cf4e78467cc2dd1184a66"
// const gitCommitVersion = 'latest'
const args = require('minimist')(process.argv.slice(2))

//
const _tag = args['--tag'] || args.tag

// const _describetion = args['--d'] || args.d || 'test'

if (/[\u4e00-\u9fa5]/.test(_tag)) {
  console.log(chalk.yellow('命令参数:'))
  console.log(_tag)
  console.log(chalk.redBright('中文优雅、博大精深，但是docker并不支持'))
  process.exit(1)
}

const tag = _tag || gitCommitVersion

const build = shell.exec(`docker build -t resume:${tag} -f ./docker/Dockerfile .`)
if (build.code) {
  utils.error('npm run build failed……\n意外总比惊喜来得快~这就是生活吧\n我猜是你的小鲸鱼跪了')
} else {
  shell.exec(`docker tag resume:${tag} iamsblol/images_of_sb:${tag}`)
  const rst = shell.exec(`docker push iamsblol/images_of_sb:${tag}`)

  if (rst.code) {
    utils.error('镜像推送失败……')
  } else {
    utils.success(`
    -----------------------------------------------------------------------------------------------------------
    |    恭喜您推送镜像成功，具体地址请查看，https://xxxxxxxxxxxxxx      |
    -----------------------------------------------------------------------------------------------------------
    `);
    // const data = JSON.stringify({
    //   msg_type: 'post',
    //   content: {
    //     post: {
    //       zh_cn: {
    //         title: '前端镜像',
    //         content: [
    //           [
    //             {
    //               tag: 'text',
    //               text: 'tag:'
    //             },
    //             {
    //               tag: 'text',
    //               text: `hub.your.com/fe/your-web:${tag}`
    //             }
    //           ],
    //           [
    //             {
    //               tag: 'text',
    //               text: '备注:'
    //             },
    //             {
    //               tag: 'text',
    //               text: `${_describetion}`
    //             }
    //           ]
    //         ]
    //       }
    //     }
    //   }
    // })
    // const options = {
    //   hostname: 'open.feishu.cn',
    //   port: 443,
    //   path: 'yourpath',
    //   method: 'POST',
    //   'Content-Type': 'application/json',
    //   'Content-Length': Buffer.byteLength(data)
    // }

    // const req = https.request(options, res => {
    //   console.log(`状态码: ${res.statusCode}`)
    //   res.setEncoding('utf8');
    //   res.on('data', d => {
    //     console.log(d.toString())
    //     // const res = querystring.parse(d.toString())
    //     console.log(chalk.yellow('飞书群里的大佬此刻应该收到信息'))
    //   })
    // })
    // req.write(data);
    // req.on('error', (error) => {
    //   console.log(chalk.redBright(error))
    // })

    // req.end()
  }
}
