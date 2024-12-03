---
title: Egg.js与ThinkJS框架对比：Node.js企业级开发实践分析
date: 2018-10-09 19:00:22.0
categories:
  - Node.js开发
  - 后端框架
  - 技术选型
tags:
  - Egg.js
  - ThinkJS
  - Node.js
  - Koa
  - 中间件
  - MVC框架
  - 企业级应用
  - 性能优化
  - 开发效率
  - 框架对比
keywords:
  - Egg.js框架
  - ThinkJS框架
  - Node.js开发框架
  - Koa中间件
  - MVC架构
  - 企业级Node.js
  - 框架性能对比
  - Node.js最佳实践
  - 服务端开发
  - 中间件机制
  - 开发脚手架
  - 配置管理
  - 控制器开发
  - 多进程架构
  - 开发效率提升
description: |
  本文深入对比分析了Node.js生态中两大重要的企业级开发框架：Egg.js和ThinkJS。通过实际开发经验，从多个维度详细探讨了两个框架的异同点：

  1. 开发工具链对比：
     - 命令行脚手架功能对比
     - 项目初始化流程分析
     - 开发辅助工具集成情况
     - 代码生成能力评估

  2. 框架核心特性：
     - 配置系统设计理念
     - 多环境配置支持
     - Koa对象扩展机制
     - 中间件加载机制
     - Controller设计模式
     - 多进程架构实现

  3. 开发体验分析：
     - 项目结构组织
     - 配置文件管理
     - API设计风格
     - 开发调试便利性
     - 代码复用能力

  4. 企业实践价值：
     - 框架稳定性评估
     - 性能优化特性
     - 扩展能力对比
     - 维护成本分析
     - 社区支持情况

  This article provides an in-depth comparative analysis of two major enterprise-level development frameworks in the Node.js ecosystem: Egg.js and ThinkJS. Based on practical development experience, it examines the similarities and differences between these frameworks across multiple dimensions:

  1. Development Toolchain:
     - Command-line scaffold functionality
     - Project initialization process
     - Development tool integration
     - Code generation capabilities

  2. Core Framework Features:
     - Configuration system design
     - Multi-environment support
     - Koa object extensions
     - Middleware loading mechanism
     - Controller design patterns
     - Multi-process architecture

  3. Development Experience:
     - Project structure organization
     - Configuration file management
     - API design style
     - Development debugging convenience
     - Code reuse capabilities

  4. Enterprise Practice Value:
     - Framework stability assessment
     - Performance optimization features
     - Extension capabilities
     - Maintenance cost analysis
     - Community support status
---

@[toc](Egg.js VS Thinkjs 简单分析使用)

## 命令行脚手架

#### Egg.js

```bash
$ npm i egg-init -g
$ egg-init egg-example --type=simple
$ cd egg-example
$ npm i
$ npm run dev
```

打开浏览器访问 `http://127.0.0.1:7001/`

  <!--more-->

#### Thinkjs

```bash
$ npm install -g think-cli
$ thinkjs new demo;
$ cd demo;
$ npm install;
$ npm start;
```

打开浏览器访问 `http://127.0.0.1:8360/`

从创建项目的脚手架来看两者基本一致，但是 think-cli 支持 使用命令行创建 controller、service、model 等

```bash
$ thinkjs controller <controller-name> [module-name]
$ thinkjs service <service-name> [module-name]
$ thinkjs model <model-name> [module-name]
```

更多使用方法查看https://github.com/thinkjs/think-cli

## 配置

#### Egg.js

- 默认配置在 config 文件夹下 config.default.js

- 写法

  ```javascript
  module.exports = {
    keys: "my-cookie-secret-key",
  };
  // 或
  exports.keys = "my-cookie-secret-key";
  // 或
  module.exports = appInfo => {
    return {
      keys: "my-cookie-secret-key",
    };
  };
  ```

- 支持多环境配置

- 多个配置文件会覆盖合并，框架在启动时会把合并后的最终配置 dump 到 `run/application_config.json`（worker 进程）和 `run/agent_config.json`（agent 进程）

#### Thinkjs

- 根据不用功能划分不同配置文件

  - `config.js` 通用的一些配置
  - `adapter.js` adapter 配置
  - `router.js` 自定义路由配置
  - `middleware.js` middlware 配置
  - `validator.js` 数据校验配置
  - `extend.js` extend 配置

- 写法

  ```javascript
  module.exports = {
    keys: "my-cookie-secret-key",
  };
  // 或
  exports.keys = "my-cookie-secret-key";
  ```

- 支持多环境配置

- 最终配置文件会合并，合并后的配置在`runtime/config/[env].json`中

- 支持动态设置配置

## Koa 内置对象

Egg.js 和 Thinkjs 都用扩展 Koa 对象，app,request,response,context

#### Egg.js

启动自定义脚本获取

```javascript
// app.js
module.exports = app => {
  app.cache = new Cache();
};
```

controller 中使用 `this.ctx.app` `this.ctx` `this.ctx.request` `this.ctx.response`

#### Thinkjs

任何地方使用`think.app`

controller 中使用 `this.ctx` `this.ctx.req` `this.ctx.res`

## 中间件

两者都是基于 Koa 实现的，中间件基于洋葱圈模型

两者写法一致

```javascript
// middleware/log.js
const defaultOptions = {
  consoleExecTime: true, // 是否打印执行时间的配置
};
module.exports = (options = {}) => {
  // 合并传递进来的配置
  options = Object.assign({}, defaultOptions, options);
  return (ctx, next) => {
    if (!options.consoleExecTime) {
      return next(); // 如果不需要打印执行时间，直接调用后续执行逻辑
    }
    const startTime = Date.now();
    let err = null;
    // 调用 next 统计后续执行逻辑的所有时间
    return next()
      .catch(e => {
        err = e; // 这里先将错误保存在一个错误对象上，方便统计出错情况下的执行时间
      })
      .then(() => {
        const endTime = Date.now();
        console.log(`request exec time: ${endTime - startTime}ms`);
        if (err) return Promise.reject(err); // 如果后续执行逻辑有错误，则将错误返回
      });
  };
};
```

#### Egg.js

用法：在 config.default.js 配置

```javascript
module.exports = {
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: ["log"],
  // 配置 log 中间件的配置
  log: {
    consoleExecTime: true,
  },
};
```

#### Thinkjs

用法：在`src/config/middleware.js`文件 ，数组顺序即为中间件的加载顺序

```javascript
module.exports = [
  {
    handle: "log", // 中间件处理函数
    options: {
      // 当前中间件需要的配置
      consoleExecTime: true,
    },
  },
];
```

## Controller

写法基本类似，只不过 thinkjs 中需要额外添加一个 Action

#### Egg.js

```javascript
// base_controller.js
// 使用this.success()方法统一对外输出,参考thinkjs返回
"use strict";
const { Controller } = require("egg");
class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      errno: 0,
      errmsg: "",
      data,
    };
  }
  fail(msg, no) {
    this.ctx.body = {
      errno: no || 400,
      errmsg: msg || "内部错误",
    };
  }
}
module.exports = BaseController;
```

```javascript
// controller
const Controller = require("./../../core/base.controller.js");
module.exports = class extends Controller {
  async getUser() {
    this.success({ username: "hou" });
  }
};
```

controller 生效还要添加路由,比 Thinkjs 麻烦。

```
module.exports = app => {
  const { router, controller } = app;
  router.get('/v1/user/getUser', controller.v1.user.getUser);
};
```

#### Thinkjs

```javascript
const Base = require("./../base");
module.exports = class extends Base {
  //比egg.js多了一个Action,让框架自动识别为controller.通多think-router中间件实现
  async getUserAction() {
    this.success({ username: "hou" });
  }
};
```

红红火火恍恍惚惚，让 egg.js 的 controller 集成自定义的一个基类。强行使他们写法一致！😄

## Router

都支持 restful。

#### Egg.js

```javascript
module.exports = app => {
  const { router, controller } = app;
  router.get("/v1/user/getUser", controller.v1.user.getUser);
};
```

#### Thinkjs

对于 controller，不用写 router。也可以自定义，我没有用到过，就不写了。

## RestFul

#### Egg.js

```javascript
// app/router.js
module.exports = app => {
  // 注意这里是resources方法。
  app.router.resources("topics", "/api/v2/topics", app.controller.topics);
};
```

映射关系

| Method | Path            | Route Name | Controller.Action             |
| ------ | --------------- | ---------- | ----------------------------- |
| GET    | /posts          | posts      | app.controllers.posts.index   |
| GET    | /posts/new      | new_post   | app.controllers.posts.new     |
| GET    | /posts/:id      | post       | app.controllers.posts.show    |
| GET    | /posts/:id/edit | edit_post  | app.controllers.posts.edit    |
| POST   | /posts          | posts      | app.controllers.posts.create  |
| PUT    | /posts/:id      | post       | app.controllers.posts.update  |
| DELETE | /posts/:id      | post       | app.controllers.posts.destroy |

#### Thinkjs

```javascript
// router.js
module.exports = [["/user/:id?", "rest"]];
```

通过自定义路由，将 `/user/:id` 相关的请求指定为 REST Controller，然后就可以对其访问了。

- `GET /user` 获取用户列表，执行 `getAction`
- `GET /user/:id` 获取某个用户的详细信息，执行 `getAction`
- `POST /user` 添加一个用户，执行 `postAction`
- `PUT /user/:id` 更新一个用户，执行 `putAction`
- `DELETE /user/:id` 删除一个用户，执行 `deleteAction`

## Service

基本一样

#### Egg.js

```javascript
// service/user.js
const Service = require("egg").Service;
module.exports = class extends Service {
  async find(id) {
    return { username: "hou", id: id };
  }
};
```

```javascript
// controller.js
this.ctx.service.user.find(11111);
```

#### Thinkjs

```javascript
// service/user.js
module.exports = class extends think.Service {
  find(id) {
    return { username: "hou", id: id };
  }
};
```

```javascript
// controller
think.service("user").find(11111);
```

## 插件/适配器？？？？

#### Egg.js(插件)https://eggjs.org/zh-cn/basics/plugin.html

使用 npm 安装插件

```bash
$ npm i egg-mysql --save
```

使用

```javascript
// config/plugin.js
exports.mysql = {
  enable: true,
  package: "egg-mysql",
};
// config/config.default.js
exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: "mysql.com",
    // 端口号
    port: "3306",
    // 用户名
    user: "test_user",
    // 密码
    password: "test_password",
    // 数据库名
    database: "test",
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};
```

#### Thinkjs（适配器）https://thinkjs.org/zh-cn/doc/3.0/adapter.html

使用 npm 安装插件

```bash
$ npm i think-model-mysql --save
```

使用

```javascript
// config/adapter.js
exports.model = {
  type: "mysql",
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg),
  },
  mysql: {
    handle: mysql,
    database: "",
    prefix: "think_",
    encoding: "utf8",
    host: "127.0.0.1",
    port: "",
    user: "root",
    password: "root",
    dateStrings: true,
  },
};
```

## 定时任务

#### Egg.js

每个文件写一个定时任务，存放在 app/schedule

```javascript
module.exports = {
  schedule: {
    interval: "1m", // 1 分钟间隔
    type: "all", // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    console.log("触发定时任务");
  },
};
```

#### Thinkjs

所有定时任务存在一个文件中

```javascript
// src/config/crontab.js
module.exports = [
  {
    interval: "10s",
    type: "all",
    handle: () => {
      console.log("触发定时任务");
    },
  },
];
```

## 多进行和进程间通信

- 两者都是有一个 master 进程和若干 worker 进程。不同的是 Egg.js 多一个 agent 进程。
  在这方面 Egg.js 比 Thinkjs 要方便许多。一些脏活累活都可以交给 agent 进程去做。比如长连接，监听消息队列等。

- worker 间通信都是通过 master 进程中转

#### Egg.js

```javascript
// agent.js 监听消息队列
"use strict";
const mqtt = require("mqtt");
module.exports = agent => {
  const client = mqtt.connect("mqtt://test.mosquitto.org");
  client.on("connect", function () {
    console.log("链接成功");
    client.subscribe("asdasdasd");
  });
  client.on("message", function (topic, message) {
    console.log(message.toString());
    agent.messenger.sendToApp("shoudaoxiaoxi", message.toString()); // 发给所有app进程
    agent.messenger.sendRandom("shoudaoxiaoxi", message.toString()); // 发给随机一个app进程
  });
};
```

```javascript
//app.js 接收agent进程发送的消息
module.exports = app => {
  app.messenger.on("shoudaoxiaoxi", msg => {
    app.logger.info(msg);
    // 创建一个匿名上下文来访问服务
    const ctx = app.createAnonymousContext();
    ctx.runInBackground(async () => {
      await ctx.service.source.update(); //直接访问service
      app.lastUpdateBy = msg;
    });
  });
};
```

#### Thinkjs

在 Thinkjs 中监听消息队列只能在 master 中了。如果有好的办法实现上边功能，请教我。

## 数据库模型

#### Egg.js

#### Thinkjs

## TypeScript 支持

#### Egg.js

- 官方支持 mysql.
- 支持 ORM 框架[sequelize](http://docs.sequelizejs.com/)。还没有用到过，就不提了。
- mongo
  - https://github.com/eggjs/egg-mongoose
  - https://github.com/brickyang/egg-mongo-native

#### Thinkjs

- 默认支持 mysql,
- 官方还支持 mongo.https://github.com/thinkjs/think-mongo
- ORM https://github.com/thinkjs/think-sequelize

## 单元测试

#### Egg.js

完整的单元测试框架使用 Mocha

#### Thinkjs

官网上没有提到单元测试内容，但是好像也支持，脚手架生成项目有 test 文件夹，使用的框架是 ava

## 部署

#### Egg.js

使用`egg-scripts`模块部署。脚手架自带。

```bash
npm run start ## 启动
npm run stop ## 停止
```

与阿里的 alinode 快速集成。

#### Thinkjs

转译`npm run compile`

- Docker
- PM2
- 直接启动 production.js `node production.js`

##
