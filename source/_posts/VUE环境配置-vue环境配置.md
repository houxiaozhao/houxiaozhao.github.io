---
title: VUE环境配置
date: 2018-03-07 17:03:36.0
updated: 2022-03-08 10:42:49.192
url: /archives/vue环境配置
categories: 
tags: 
- vue
---



# 安装 vue

1. 在 vue[官网](https://cn.vuejs.org/v2/guide/installation.html#%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7-CLI)，使用 cli 命令行脚手架创建基本项目

   ```shell
   # 全局安装 vue-cli
   npm install --global vue-cli
   # 创建一个基于 webpack 模板的新项目
   vue init webpack my-project
   # 安装依赖，走你
   cd my-project
   # 或者 yarn
   npm install
   npm run dev
   ```

   <!--more-->

2. 运行`npm run dev` 打开浏览器http://localhost:8080

# 配置

### 开发环境 vscode

1. 使用 eslint 规范代码质量

2. vscode 安装插件 eslint

3. 配置代码格式化规则 eslint

   ```json
   "eslint.autoFixOnSave": true,
   "eslint.validate": [
     "javascript",
     "javascriptreact",
     {
       "language": "html",
       "autoFix": true
     },
     {
       "language": "vue",
       "autoFix": true
     }
   ],
   ```

4. 安装 vetur,配置

   ```json
   "vetur.format.defaultFormatter.html": "js-beautify-html",
   "vetur.format.defaultFormatter.js": "vscode-typescript",
   ```

### axios

1. 安装`yarn add axios`

2. 在 main.js 中导入并应用

   ```javascript
   import axios from 'axios'
   Vue.prototype.$http = axios
   ```

### muse-ui

1. 安装`yarn add muse-ui`

2. 加载*main.js*

   ```javascript
   import Vue from 'vue'
   import MuseUI from 'muse-ui'
   import 'muse-ui/dist/muse-ui.css'
   Vue.use(MuseUI)
   ```

3. 图标显示

   下载[图标](https://github.com/google/material-design-icons/releases)

   解压复制 iconfont 到 static 中，然后在 index.html 引用

### mdui

1. 安装`yarn add mdui`

2. 引入 css

   ```javascript
   import 'mdui/dist/css/mdui.css'
   ```

3. 在需要用 mdui api 时，引入

   ```javascript
   import mdui from 'mdui'
   ```

### 开发环境和生产环境

利用 webpack 区分两种环境

1. `build/webpack.dev.conf.js`文件

   在 new webpack.DefinePlugin 附近

   ```javascript
    new webpack.DefinePlugin({
         'process.env': require('../config/dev.env'),
         MONITOR_IP: "'http://127.0.0.1:8360/'",
       }),
   ```

   注意：如果配置时字符串的时候，一定要套两层引号，或者使用`JSON.stringify("XXXXX")`

   下面是集中配置方式

   ```javascript
   new webpack.DefinePlugin({
     PRODUCTION: JSON.stringify(true),
     VERSION: JSON.stringify('5fa3b9'),
     BROWSER_SUPPORTS_HTML5: true,
     TWO: '1+1',
     'typeof window': JSON.stringify('object')
   })
   ```

   参考https://segmentfault.com/a/1190000006952432

   `DefinePlugin`可能会被误认为其作用是在 webpack 配置文件中为编译后的代码上下文环境设置全局变量，但其实不然。它真正的机制是：`DefinePlugin`的参数是一个 object，那么其中会有一些`key-value`对。在 webpack 编译的时候，会把业务代码中没有定义（使用 var/const/let 来预定义的）而变量名又与`key`相同的变量（直接读代码的话的确像是全局变量）替换成`value`。例如上面的官方例子，`PRODUCTION`就会被替换为`true`；`VERSION`就会被替换为`'5fa3b9'`（注意单引号）；`BROWSER_SUPPORTS_HTML5`也是会被替换为`true`；`TWO`会被替换为`1+1`（相当于是一个数学表达式）；`typeof window`就被替换为`'object'`了。

2. 配置完成后，就可以在代码中直接使用，但是因为 eslint 的关系，会提示变量没有定义，但其实是可以直接用的。需要手动指定变量为全局变量

   ```javascript
   /* global MONITOR_IP:true */
   ```

### 简单基于 token 的身份认证

1. 页面跳转时，判断 localStorage 是否有 token，有则 next(),没有跳转到登陆

2. 本应用使用 cas 单点登录方式，所以跳转到 cas 登陆页面

3. 登陆成功自动跳转到应用的登陆页面，登陆应用获取 token

4. 获取 token 后，把 token 放到 localStorage

5. 然后跳转到首页

6. 配置 axios 请求拦截器，如果 localStorage 里有 token 则在头部加入 Authorization

   ```javascript
   http.interceptors.request.use(config => {
     if (localStorage.token) {
       config.headers = {
         Authorization: `Bearer ${localStorage.token}`
       }
     }
     return config
   })
   ```

   ​