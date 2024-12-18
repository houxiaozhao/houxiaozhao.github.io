---
title: mpvue微信小程序开发入门：从环境搭建到实战应用
date: 2018-09-22 11:58:59.0
categories:
  - 前端开发
  - 小程序开发
  - Vue.js
tags:
  - mpvue
  - 微信小程序
  - Vue.js
  - JavaScript
  - 前端框架
  - WeUI
  - Flyio
  - 小程序开发
  - 用户授权
  - 组件开发
keywords:
  - mpvue开发
  - 微信小程序开发
  - Vue.js框架
  - mpvue教程
  - 小程序框架
  - 微信开发
  - 前端开发
  - WeUI组件库
  - Flyio网络请求
  - 小程序授权
  - 页面路由
  - 组件开发
  - 微信登录
  - 底部导航
  - Font Awesome
description: |
  本文详细介绍了使用mpvue框架进行微信小程序开发的全过程，涵盖了从环境搭建到实际应用的各个关键环节。文章系统地讲解了以下核心内容：

  开发环境搭建：
  1. 全局安装vue-cli并创建mpvue项目
  2. 项目依赖配置和开发环境启动
  3. 项目目录结构说明和最佳实践

  功能实现详解：
  1. 底部导航栏的配置和自定义
  2. 全局变量的设置和使用方法
  3. Flyio网络库的集成和接口调用
  4. WeUI组件库的引入和使用
  5. 用户登录授权的两种实现方式
  6. 页面路由和参数传递的处理
  7. Font Awesome图标的集成方案

  This article provides an in-depth guide to developing WeChat Mini Programs using the mpvue framework, covering the entire process from environment setup to practical application. The article systematically explains the following core content:

  Development Environment Setup:
  1. Global installation of vue-cli and mpvue project creation
  2. Project dependency configuration and development environment startup
  3. Project directory structure explanation and best practices

  Feature Implementation Details:
  1. Bottom navigation bar configuration and customization
  2. Global variable setup and usage methods
  3. Flyio network library integration and API calls
  4. WeUI component library implementation
  5. Two approaches to user login authorization
  6. Page routing and parameter passing
  7. Font Awesome icon integration solution

  The guide includes practical code examples, common pitfalls to avoid, and optimization techniques for better development efficiency.
---

> 需要了解一些原生小程序开发流程，主要是接口调用方式和目录结构。

## 安装

```javascript
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

  <!--more-->

## 设置底部导航栏

1.  添加一个页面

    ```bash
    mkdir demo
    cd demo
    touch index.vue
    touch main.js
    ```

    `main.js`

    ```javascript
    import Vue from "vue";
    import App from "./index";
    const app = new Vue(App);
    app.$mount();
    ```

    `index.vue`

    ```html
    <template>
      <div>index</div>
    </template>
    <script>
      export default {
        name: "index",
        data() {
          return {};
        },
        mounted() {},
        methods: {},
      };
    </script>
    ```

    新建页面后需要重新运行`npm run dev`

2.  准备素材，底部导航的图标（http://iconfont.cn/）

3.  在`app.json`设置

    ```json
    {
      "pages": ["pages/index/main", "pages/logs/main", "pages/counter/main", "pages/demo/main"],
      "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "WeChat",
        "navigationBarTextStyle": "black"
      },
      "tabBar": {
        "debug": true,
        "list": [
          {
            "pagePath": "pages/index/main",
            "text": "首页",
            "iconPath": "static/img/home.png",
            "selectedIconPath": "static/img/home_fill.png"
          },
          {
            "pagePath": "pages/logs/main",
            "text": "动态",
            "iconPath": "static/img/creative.png",
            "selectedIconPath": "static/img/creative_fill.png"
          },
          {
            "pagePath": "pages/counter/main",
            "text": "官网",
            "iconPath": "static/img/favor.png",
            "selectedIconPath": "static/img/favor_fill.png"
          },
          {
            "pagePath": "pages/demo/main",
            "text": "官网",
            "iconPath": "static/img/shop.png",
            "selectedIconPath": "static/img/shop_fill.png"
          }
        ]
      }
    }
    ```

## 设置全局变量`getApp();`

```javascript
Vue.prototype.globalData = getApp();
```

## 引入 flyio 网络库

1.  安装

    ```bash
    yarn add flyio
    ```

2.  `main.js`中加入

    ```
    var Fly=require("flyio/dist/npm/wx")
    var fly=new Fly
    Vue.prototype.$http=fly
    ```

3.  调用接口测试

    如果调用的本地服务可以先设置`不校验合法域名。。。`在微信开发者工具，点击右上角详情进行设置

    ```javascript
    this.$http
      .get("https://www.apiopen.top/journalismApi")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    ```

## 引入 weui.css

1.  下载地址：https://github.com/KuangPF/mpvue-weui/blob/master/static/weui/weui.css

2.  ```javascript
    ## main.js
    import './../static/weui.css';
    ```

3.  用法 https://kuangpf.com/mpvue-weui

## 登陆

1. https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01

2. 需要使用按钮主动获取用户授权

   目前用户授权方式需要主动获取授权。两种方式引导用户点击授权按钮

   - 进入小程序时判断是否有用户信息没有的话，不进入 tab 页，而是授权页面。写一些欢迎信息
   - 用户进入用户个人中心。判断是否有用户信息，没有则展示授权按钮

   1. 第一种方式

      `app.json`中添加 pages `"pages/welcome/main"`

      welcome 页面中

      ```html
      <template>
        <div>
          <button open-type="getUserInfo" type="primary" lang="zh_CN" @getuserinfo="onGotUserInfo">授权</button>
        </div>
      </template>
      <script>
        const app = getApp();
        export default {
          name: "index",
          data() {
            return {
              canIUse: wx.canIUse("button.open-type.getUserInfo"),
            };
          },
          methods() {},
          mounted() {
            wx.getUserInfo({
              success: res => {
                console.log("获取用户信息.....", res);
                this.globalData.userinfo = res.userInfo;
                wx.switchTab({
                  url: "./../../pages/index/main", // 这个地方很奇怪，写 url: 'pages/index/main'，会报错，不能跳到首页
                });
              },
              fail: res => {
                console.log("没有获取用户信息");
                if (this.canIUse) {
                  console.log("没有用户信息");
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  app.userInfoReadyCallback = res => {
                    console.log("回调里得到用户信息", res.userInfo);
                    this.globalData.userinfo = res.userInfo;
                    wx.switchTab({
                      url: "pages/index/main",
                    });
                  };
                } else {
                  console.log("低版本微信");
                  // 在没有 open-type=getUserInfo 版本的兼容处理
                  wx.getUserInfo({
                    success: res => {
                      console.log("得到用户信息", res.userInfo);
                      this.globalData.userinfo = res.userInfo;
                      wx.switchTab({
                        url: "pages/index/main",
                      });
                    },
                  });
                }
              },
            });
          },
          methods: {
            onGotUserInfo: function (e) {
              console.log("用户授权中得到用户信息", e.mp.detail.userInfo);
              this.globalData.userinfo = e.mp.detail.userInfo;
              wx.switchTab({
                url: "../../pages/index/main",
              });
            },
          },
        };
      </script>
      ```

      ![](https://i.loli.net/2018/09/22/5ba5bca695921.png)

      ```html
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权</button> 这里的原生小程序应该写bindgetuserinfo="onGotUserInfo" mpvue 中使用 @getuserinfo="onGotUserInfo"
      ```

   2. 第二种方式

      ......

   ## 自定义分享

   ```html
   <button type="default" open-type="share">自定义分享</button>
   ```

   当用户点击分享按钮后，会触发`onShareAppMessage`事件。这个方法不能定义到`methods`中。需要放到外层与`data` `methods`平级

   `onShareAppMessage`返回一个对象可以自定义分享内容。具体参数https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.htm

   在 path 参数中可以定义查询参数如`/pages/index/main?id=123`这样，当其他用户点击分享时，可以得到该参数。

   在 vue 中可以通过`console.log(this.$root.$mp.appOptions.query);`得到传递的参数

   ## 页面跳转传参

   ```javascript
   wx.navigateTo({
     url: "/pages/index/index2/main?id=111",
   });
   ```

   通过`this.$root.$mp.query`接收参数

   ## 使用 font-awesome 图标

   1. 安装`yarn add font-awesome`

   2. 在 main.js 中引用`import 'font-awesome/css/font-awesome.min.css';`

   3. 修改`build/webpack.base.conf.js`

      ```javascript
       {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                // limit: 10000, //注释掉
                name: utils.assetsPath('fonts/[name].[ext]')
              }
            }
      ```

   4. 重新编译运行`npm run dev`

   ## 源码

   https://github.com/houxiaozhao/mpvue-xiaochengxu
