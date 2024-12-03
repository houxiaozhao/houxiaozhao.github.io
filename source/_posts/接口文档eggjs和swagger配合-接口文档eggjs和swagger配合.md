---
title: Egg.js 与 Swagger 集成：构建自动化 API 文档系统
date: 2021-04-14 10:56:56.0
categories:
  - 后端开发
  - API文档
  - Node.js
tags:
  - Egg.js
  - Swagger
  - RESTful API
  - API文档
  - Node.js
  - YApi
  - 自动化工具
  - 接口管理
  - JavaScript
  - 后端开发
keywords:
  - Swagger集成
  - Egg.js框架
  - API文档生成
  - RESTful接口
  - 文档自动化
  - egg-swagger-doc
  - YApi平台
  - 接口测试
  - 文档管理
  - 代码生成
  - 接口规范
  - 开发效率
  - 接口描述
  - 文档更新
  - 自动化工具
description: |
  本文详细介绍了如何在 Egg.js 框架中集成 Swagger 实现 API 文档的自动化生成和管理。文章涵盖了完整的实现流程，包括 Swagger 的安装配置、注释规范、文档生成等核心内容。主要特性包括：使用 egg-swagger-doc 插件实现接口文档自动生成、通过代码注释定义 API 信息、配置 Swagger UI 在线文档界面、集成 YApi 平台进行文档同步、自动生成接口调用代码等。文章还详细说明了如何通过注释定义接口参数、响应格式，以及如何使用 contract 文件定义数据模型。通过这套解决方案，开发团队可以实现接口文档的实时更新，提高开发效率和协作质量。

  This article provides a detailed guide on integrating Swagger with the Egg.js framework to achieve automated API documentation generation and management. The article covers the complete implementation process, including Swagger installation and configuration, comment specifications, and document generation. Key features include: using the egg-swagger-doc plugin for automatic API documentation generation, defining API information through code comments, configuring Swagger UI for online documentation interface, integrating with the YApi platform for document synchronization, and automatically generating interface calling code. The article also explains in detail how to define interface parameters and response formats through comments, and how to use contract files to define data models. Through this solution, development teams can achieve real-time updates of interface documentation, improving development efficiency and collaboration quality.
---

# 接口文档 eggjs 和 swagger 配合

> 好运盈后台接口文档管理采用 Swagger 自动化生成发布。使用 egg-swagger 插件配合 egg 开发框架使用 https://github.com/Yanshijie-EL/egg-swagger-doc

### Swagger 介绍

Swagger 是一款 RESTFUL 接口的文档在线自动生成+功能测试功能软件。Swagger 是一个规范和完整的框架,用于生成、描述、调用和可视化 RESTful 风格的 Web 服务。目标是使客户端和文件系统作为服务器以同样的速度来更新文件的方法,参数和模型紧密集成到服务器。

### 使用方法

1. 安装 egg-swagger-doc

   ```
   npm i egg-swagger-doc --save
   ```

2. 在 app/文件夹下新建 contract 文件夹
3. 添加配置

   ```
   config.swaggerdoc = {    dirScanner: './app/controller',    apiInfo: {      title: '好运盈',      description: '好运盈接口文档',      version: '1.0.1',    },    schemes: [ 'http', 'https' ],    consumes: [ 'application/json' ],    produces: [ 'application/json' ],    enableSecurity: false,    // enableValidate: true,    routerMap: false,    enable: true,  };
   ```

4. 在 controller 类添加注释

   ```
   /** * @controller sys_user_auth 系统用户认证接口 */
   ```

5. 在 controller 方法添加注释,具体参数含义参考插件文档

   ```
     /**  * @summary 更新  * @description 更新信息  * @router put /sys_user/partner/:id  * @request path string id id  * @request body createPartner *body  * @request header string *Authorization token  * @response 200 baseResponse 已更新id  */
   ```

   其中`createPartner` 需要在 contract 文件夹新建文件并定义，文件名随意,最后导出即可

   ```
   module.exports = {  createPartner: {    user: { type: 'string', required: true, example: '123123123123', description: '用户id' },    teams: { type: 'array', itemType: 'string', description: '团队id数组' },  }};
   ```

6. 程序启动后，插件自动扫描 controller 下的文件，并新增两个路由页面`/swagger-doc` `/swagger-ui.html`其中`/swagger-ui.html`即生成文档页面，`/swagger-doc`生成标准 swagger 文档格式

### 更新 swagger 文档到 yapi 平台

1. 安装`yarn add yapi-cli -D`
2. 新建配置文件

   ```
   //yapi-import.json{    "type": "swagger",    "token": "xxxxxx",    "file": "http://127.0.0.1:8100/swagger-doc",    "merge": "good",    "server": "http://111.111.111.111:3000/"}// type 是数据数据方式，目前官方只支持 swagger// token 是项目token，在 项目设置 -> token 设置获取// file 是 swagger 接口文档文件，可使用绝对路径或 url// merge 导入旧的接口策略，默认使用智能模式，一共有 "normal"(普通模式) , "good"(智能合并), "merge"(完全覆盖) 三种模式// server 是yapi服务器地址
   ```

3. package.json 添加 script

   ```
   "yapi":"yapi import"
   ```

4. 执行`npm run yapi`

### 自动生成 js 调用代码

https://github.com/hellosean1025/yapi-gen-js-code
