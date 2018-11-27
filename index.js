#!/usr/bin/env node
const program = require('commander')
const shell = require('shelljs')


program
    .version('1.0.0')
    .description('react-xui构建工具');
program.command('start')
    .action(function(){
        shell.exec(`npm start`)
    })
program
    .command('create <project> [otherDirs...]')
    .action(function(project,otherDirs) {
        let type = otherDirs[0]||'less';
        console.log(otherDirs)
        console.log(type)
        console.info('欢迎使用react-xui的自动构建工具：create 、start、build、publish')
        console.info('使用例子：xui create myproject')
        // switch(actionType){
            // case 'create':{
                let pwd = shell.pwd()
                console.info(`正在拉取模板代码，下载位置：${pwd}/${project}/ ...`)
                shell.rm('-rf', `${pwd}/${project}`)
                if (shell.exec(`git clone -b ${type} https://github.com/React-xui/x-seed.git ${project}`).code !== 0) {
                    shell.echo('Error: git clone 失败，请检查网络')
                    shell.exit(1)
                }
                shell.cd(`${pwd}/${project}/`)
                console.info(`使用${type}样式构建`)
                // shell.exec(`checkout ${type}`)
                console.info(`2/3创建项目，文件清理 ...`)
                shell.rm('-rf', `${pwd}/${project}/.git`)
                if (!shell.which('npm')) {
                    shell.echo('Error：未检测到npm工具，请先安装npm')
                    shell.exit(1)
                }
                console.info(`3/3开始执行：npm install安装工程依赖 ...`)
                shell.exec(`npm install`)
                console.info(`初始化项目工程完成，请进入您的项目工程 cd ${project} 后执行 xui start 运行`)
                console.info('')
            // }break;
            // case 'start':{
            //     shell.exec(`npm start`)
            // }break;
            // case 'build':{
            //     shell.exec(`npm run build`)
            // }break;
            // case 'publish':{
            //     shell.exec(`npm run publish`)
            // }break;
        // }
    })
program.parse(process.argv)
