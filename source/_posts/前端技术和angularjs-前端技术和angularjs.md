---
title: 前端技术和angularjs
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2017-06-03 12:02:10.0
updated: 2022-03-08 10:43:14.1
url: /archives/前端技术和angularjs
categories:
tags:
  - 前端
---

### 前端技术栈

- 浏览器/渲染引擎

  - IE
  - chrome
  - firefox
  - Safari
  - QQ/360???????
    <!--more-->

- 前端核心

  - HTML/HTML5,

    ![img](https://img.mubu.com/document_image/09890fbd-d90f-4a86-83a6-9a9190baeeea.jpg)

    - DOM 树
    - 元素
    - 属性

  - JavaScript

    - 原型（prototype）
    - Scope
    - JSON <https://baike.baidu.com/item/JSON/2462549?fr=aladdin>
    - AJAX
    - Promise(解决回调函数嵌套过多的问题)
      - <http://callbackhell.com/>
      - <http://liubin.org/promises-book/>

  - CSS

    - 使用浏览器调试样式

- 编辑器

  - sublime text 3
  - WebStorm
  - VSCode（推荐！！）

- 构建工具/生成器

  ![img](https://img.mubu.com/document_image/4c09e92d-1472-4bd1-983a-c8f076c85d5a.jpg)

  - Yeoman <http://yeoman.io/generators/>
  - Grunt
  - gulp//在用
  - webpack//在用

- 调试

  - Developer Tools
  - Firebug

- 包管理

  - npm
  - bower

- 框架和库

  - JavaScript 基本库
    - Jquery
  - JavaScript 框架
    - angularjs/Angular
    - react
    - vue
  - UI 框架
    - BootStrap
    - ionic
    - Material
  - 数据可视化
    - Echarts
    - G2
  - CSS3 动画
    - Animate.css
  - 实用工具
    - lodash <https://lodash.com/><https://www.kancloud.cn/wizardforcel/lodash-doc-45/144108>
    - Moment <http://momentjs.cn/>
  - 编译器
    - babel <http://babeljs.cn/repl/#>
  - 模板引擎
    - Jade-express
    - Ejs-thinkjs
  - 中间语言
    - Typescript
    - JSX
  - 手机应用
    - Cordova
    - React Native
  - 桌面应用
    - Electron

### angularjs

- 搭建一个最简单的 angular 项目

- $scope、$rootScope、var

  - \$scope 是一个 js 对象，包含属性和方法，可以在视图中使用。作用域范围当前的 controller
  - \$rootScope 根作用域，范围是被 ng-app 包含的所有 controller
  - var 定义变量关键词。var 的作用域取决于定义变量的位置。在 controller 里面用 var 定义的变量只在这个 controller 里面有效

- `&#123;&#123;&#125;&#125;`

  - 在`&#123;&#123;&#125;&#125;`里面是可以写 js 表达式的，而不仅仅是写一个变量。

- 页面传参

  - 利用 ui-router 传参（常用）
  - \$cacheFactory、service 或 factory、本地存储、全局变量

- 错误（ReferenceError,SyntaxError,TypeError）

  <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError>

  - HelloCtrl 没有注册

    ![img](https://img.mubu.com/document_image/f6f78e2a-edaf-4717-8cb3-5bd81a451b55.jpg)

  - a 没有被定义

    ![img](https://img.mubu.com/document_image/362a3d98-b926-40cc-9b75-9363791ecf59.jpg)

  - 不能读取 undefined 的属性 d

    ![img](https://img.mubu.com/document_image/d25df15e-d055-44c5-ab2a-39afd68e472a.jpg)

  - myApp.contoller 不是一个函数

    ![img](https://img.mubu.com/document_image/5798992a-432e-4eea-8423-05b64fd39778.jpg)

  - 语法错误

    ![img](https://img.mubu.com/document_image/90f7b0eb-21a0-44d6-b724-e4adaaf25b64.jpg)

- angular 自带过滤器

  - 时间格式化`&#123;&#123;1502099966443| date:"yyyy-MM-dd HH:mm:ss"&#125;&#125;`

- angular 常用的一些方法，指令等

- http 请求的两种写法<https://docs.angularjs.org/api/ng/service/$http><https://code.angularjs.org/1.4.3/docs/api/ng/service/$http>

- angular select

- 常用插件

  - smart-table <https://github.com/lorenzofox3/Smart-Table>
  - ngDialog <https://github.com/likeastore/ngDialog>
  - ui.bootstrap <http://angular-ui.github.io/bootstrap/>
  - ngMaterial <https://github.com/angular/material>
  - ng-file-upload <https://github.com/danialfarid/ng-file-upload>
  - toastr <https://github.com/Foxandxss/angular-toastr>
  - oc.lazyLoad <https://oclazyload.readme.io/>
  - satellizer <https://github.com/sahat/satellizer>
  - vxWamp <https://github.com/voryx/angular-wamp>

### 我经常逛的网站

- 掘金 <https://juejin.im/>
- awesomes <https://www.awesomes.cn/>
