---
title: Vue.js与Cordova构建混合应用：从环境搭建到插件集成
date: 2019-05-04 12:54:10.0
categories:
  - 移动应用开发
  - 混合应用
  - 前端技术
tags:
  - Vue.js
  - Cordova
  - Android
  - Hybrid App
  - JavaScript
  - 移动开发
  - 跨平台开发
  - 插件开发
  - 前端框架
  - 应用打包
keywords:
  - Vue.js开发
  - Cordova框架
  - 混合应用开发
  - Android应用
  - 跨平台开发
  - 移动应用架构
  - 前端工程化
  - 插件集成
  - WebView开发
  - 原生功能
  - 开发环境配置
  - 应用调试
  - UI框架
  - 路由管理
  - 性能优化
description: |
  本文详细介绍了使用Vue.js和Cordova开发混合移动应用的完整流程，从环境搭建到功能实现的全过程：

  1. 开发环境搭建：
     - Node.js与前端工具链配置
     - Android开发环境准备
     - 开发工具选择与插件配置
     - JDK和SDK环境变量设置
     - VS Code编辑器优化

  2. 项目架构搭建：
     - Cordova项目初始化与配置
     - Vue.js项目创建与结构
     - Vuetify UI框架集成
     - 项目合并与配置优化
     - 开发环境调试设置

  3. 核心功能实现：
     - Cordova插件系统集成
     - 原生功能访问接口
     - 二维码扫描实现
     - 通讯录访问集成
     - 路由系统设计

  4. 构建与部署流程：
     - Vue项目构建配置
     - Cordova打包流程
     - Android应用编译
     - 调试工具使用
     - 性能优化方案

  This article provides a comprehensive walkthrough of developing hybrid mobile applications using Vue.js and Cordova:

  1. Development Environment Setup:
     - Node.js and frontend toolchain configuration
     - Android development environment preparation
     - Development tools selection and plugin setup
     - JDK and SDK environment variables
     - VS Code editor optimization

  2. Project Architecture:
     - Cordova project initialization and configuration
     - Vue.js project creation and structure
     - Vuetify UI framework integration
     - Project merger and configuration optimization
     - Development environment debugging

  3. Core Feature Implementation:
     - Cordova plugin system integration
     - Native functionality access
     - QR code scanning implementation
     - Contacts access integration
     - Routing system design

  4. Build and Deployment Process:
     - Vue project build configuration
     - Cordova packaging process
     - Android application compilation
     - Debugging tools usage
     - Performance optimization strategies
---

### 准备开发环境

- 前端开发环境

  - Node.js LTS
    - @vue/cli
    - cordova
    - yarn 推荐
  - 编辑器 VS code(墙裂推荐)
    - 各种插件

<!--more-->

- Android 环境（需要编译 Android 软件）
  - 安装 JDK
    - 设置环境变量
  - 安装 SDK?Android Studio - 设置环境变量
    <https://blog.csdn.net/pupilxiaoming/article/details/77801398>

###项目搭建

- 使用脚手架生成基础项目

  - cordova 项目
    - cordova create demo
    - cordova platform add android
    - cordova run android
    - 目录结构
      - www 存放网页代码
      - plugins 插件
      - platforms 平台
      - res 资源
    - 调试
      <chrome://inspect/#devices>
  - vue 项目
    - vue create demo
    - yarn
    - npm run serve
    - 目录结构
      - public 静态资源
      - src 源码
    - 安装一个 UI 框架 Vuetify
      - yarn add vuetify
      - 导入文件
        import Vuetify from 'vuetify'import 'vuetify/dist/vuetify.min.css'Vue.use(Vuetify)
      - 代码结构 app.vue
        <template> <v-app> <v-toolbar app> <v-spacer></v-spacer>这是一个 App <v-spacer></v-spacer> </v-toolbar> <v-content> <v-container fluid> <router-view></router-view> </v-container> </v-content> <v-bottom-nav app :active.sync="bottomNav" :value="true" fixed color="white"> <v-btn color="teal" flat value="recent" to="/"> <span>首页</span> <v-icon>home</v-icon> </v-btn> <v-btn color="teal" flat value="favorites" to="/about"> <span>关于</span> <v-icon>account_circle</v-icon> </v-btn> </v-bottom-nav> </v-app></template><script>export default { name: "App", data() { return { bottomNav: "recent" }; }};</script>
  - 把 vue 运行到 Android
    - npm run build
    - 复制文件
    - cordova run android
    - 配置 vue 项目
      - vue.config.js
        module.exports = { baseUrl: ""};
    - 重新 build、复制、run

  ### 合并两个项目

  - 复制 cordova 到 vue
    - /hooks
    - /platforms
    - /plugins
    - /res
    - /www
    - config.xml
  - 修改 package.json
  - ## 修改配置
  - npm run build
  - cordova run android

### cordova 插件使用

- 引入 cordova.js
  if (window.location.protocol === "file:" || window.location.port === "3000") { var cordovaScript = document.createElement("script"); cordovaScript.setAttribute("type", "text/javascript"); cordovaScript.setAttribute("src", "cordova.js"); document.body.appendChild(cordovaScript);}
- 安装 cordova 插件<http://cordova.axuer.com/plugins/>
  - 扫描二维码 <https://github.com/phonegap/phonegap-plugin-barcodescanner>
    - cordova plugin add phonegap-plugin-barcodescanner
    - 使用
      /_ global cordova:true _/ cordova.plugins.barcodeScanner.scan(result => { alert(result.text); });
  - 读取通讯录<https://github.com/apache/cordova-plugin-contacts>
    - cordova plugin add cordova-plugin-contacts
    - 使用
      navigator.contacts.find( ["displayName", "name", "phoneNumbers", "emails", "address"], e => { console.log(e); }, err => { console.log(err); }, { filter: "", multiple: true } );

### 路由整理，嵌套的路由
