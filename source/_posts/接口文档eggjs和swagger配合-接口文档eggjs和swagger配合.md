---
title: 接口文档eggjs和swagger配合
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2021-04-14 10:56:56.0
updated: 2022-03-08 11:31:32.885
url: /archives/接口文档eggjs和swagger配合
categories:
tags:
  - eggjs
  - swagger
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
