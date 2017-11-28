
## 脚手架名称：generator-spkg

## 使用说明
### 前置条件
* 安装yarn
    
    * window

            npm install -g yarn
    * MacOS

            curl -o- -L https://yarnpkg.com/install.sh | bash
    * 测试：输入yarn -v 可以看到版本号则安装成功

* 设置yarn的仓库 ,如果是内网，则指向内网cnpm仓库。请小伙伴们酌情配置。

* 安装yo工具
        npm install -g yo

* 测试安装成功yo

        yo --version

* 安装generator-spkg，一定全局安装,另外可能yarn的全局安装不给力，可以使用npm进行全局安装

        yarn global add generator-spkg
        npm  install -g generator-spkg
        

* 更新generator-spkg ,另外可能yarn的全局安装不给力，可以使用npm进行全局安装

        yarn global upgrade generator-spkg
        npm update -g generator-spkg
        

* 创建工程文件夹,比如test-spkg

* 进入test-spkg文件夹，在命令行中输入：

        yo spkg

* 如果执行 yo spkg 发现没有找到该脚手架，请使用 cnpm 或者 npm 来安装generator-spkg，具体使用命令是

        npm install -g generator-spkg
    或者 如果是cnpm下则使用：

        cnpm install -g generator-spkg
* 根据提示初始化组件结构

PS: 默认脚手架会帮助安装npm包的依赖，如果没有安装则可能是权限导致的需要手动安装。手动安装的方法是：

    yarn

如果存在权限问题请使用 sudo 或者管理员权限的命令行

## 目录说明
```
├── README.md  组件的readme文档，会显示在类似于http://cnpm.sina.com.cn/package/@mfelibs/generator-spkg的页面上，供大家查看，请将组件的api，调用方式，使用方式准确及时的更新到readme中
├── dist   存放组件输出的UMD脚本资源和demo的文件夹，本文件夹所有的文件都是通过npm run build生成的，不能进行手动更改，会被命令覆盖掉。
├── eslintrc.yml 验证静态脚本格式的eslint配置文件
├── marauder.config.js 工程化配置，目前暂时无用
├── package.json 本组件的 package.json文件
├── src  组件的开发环境src文件夹
│   ├── view 存放demo文件夹
│   │   └── index  demo文件夹(可以任意起英文字符的文件夹名称，如果不用，请删掉，以免生成出来无用的demo)
│   │   |  └── index.js  demo页面入口js(index.js 为关键字)
│   │   |  └── index.html  demo页面入口html(index.html 为关键字)
│   │   └── demo2  demo文件夹(可以任意起英文字符的文件夹名称，如果不用，请删掉，以免生成出来无用的demo)
│   │   |  └── index.js  demo页面入口js(index.js 为关键字)
│   │   |  └── index.html  demo页面入口html(index.html 为关键字)
│   └── index.js 本组件的cmd的出口文件（重要）
├── test (单元测试预留)
└── yarn.lock  通过yarn进行packagejson锁的锁文件，用于协同开发时的版本统一。
└── .gitgnore  用于声明给git的忽略文件，声明本文件夹下某一些匹配上的文件不受git版本控制
└── node_modules  存放本项目所有以来的组件，通过 yarn管理，不能自己修改或者复制。


```