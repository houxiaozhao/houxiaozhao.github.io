---
title: Hybrid App 开发过程(Vue+Android)基于JavaScript的混合式APP开发
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2019-05-04 12:54:10.0
updated: 2022-03-08 10:43:21.393
url: /archives/hybridapp开发过程vueandroid基于javascript的混合式app开发
categories:
tags:
  - App Vue Cordova
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
