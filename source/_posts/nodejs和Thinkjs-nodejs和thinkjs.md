---
title: Node.js与ThinkJS框架开发指南：构建高效Web应用
date: 2018-04-04 12:50:34.0
categories:
  - 后端开发
  - JavaScript
tags:
  - Node.js
  - ThinkJS
  - JavaScript
  - Web开发
  - 服务器端编程
  - npm
  - 事件驱动
  - 非阻塞IO
keywords:
  - Node.js开发教程
  - ThinkJS框架入门
  - JavaScript服务器端开发
  - Node.js性能优化
  - ThinkJS项目结构
  - npm包管理器
  - Node.js事件驱动
  - 非阻塞IO模型
  - Web应用开发
  - 服务器端JavaScript
  - Node.js中间件
  - ThinkJS路由配置
  - Node.js模块化开发
  - V8引擎运行环境
  - 高性能Web框架
description: "本文深入探讨Node.js和ThinkJS框架的核心特性与实践应用。从Node.js的基础概念、事件驱动模型到npm包管理，再到ThinkJS框架的项目结构、路由配置和中间件机制，为开发者提供全面的技术指南。文章详细介绍了基于Chrome V8引擎的JavaScript运行环境，非阻塞式I/O模型的实现原理，以及如何利用ThinkJS框架快速构建高效的Web应用。通过实例讲解和最佳实践，帮助开发者掌握Node.js服务器端开发技术，提高开发效率和应用性能。"
---

# Node.js

#### Node.js 简述

**Node.js**：简单的说 Node.js 就是运行在服务端的 JavaScript。

[Node.js 安装配置](https:://github.com/younghz/Markdown "Markdown") （介绍在 window 和 Linux 上的安装 Node.js 的方法）

[Node.js 官方文档](http://nodejs.cn/ "Markdown")

  <!--more-->

官方文档介绍：

- Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

- Node.js 使用了一个**事件驱动、非阻塞式 I/O 的模型**，使其轻量又高效。[事件驱动与异步 IO 的讲解](https://blog.csdn.net/m0_37886429/article/details/78292300 "Markdown")

- Node.js 的**包管理器 npm**，是全球最大的开源库生态系统。

  ​

**认识包管理器 npm**（npm 已经在安装 Node.js 的时候安装好了）

当我们在 Node.js 上开发时，会用到很多别人写的 JavaScript 代码。如果我们需要使用别人写的某个包，每次都根据名称搜索一下官方文档，下载代码，解压，再使用，非常繁琐。于是一个集中管理的工具应运而生：大家都把自己开发的模块打包后放到[npm](https://www.npmjs.com/browse/depended "Markdown")官网上，如果要使用，直接通过 npm 安装就可以直接使用，不管代码存在哪，应该从哪下载。

更重要的是，如果我们要使用模块 A，而模块 A 又依赖于模块 B，模块 B 又依赖于其他的模块，那么 npm 可以根据依赖关系，把所有依赖的包都下载下来并管理起来。否则，靠我们自己手动管理，肯定是麻烦又容易出错。

#### 第一个 Node 程序

了解 Node.js 应用的几个组成部分：

1. **引入 required 模块** ：我们可以使用 require 指令来载入 Node.js 模块。
2. **创建服务器** ：服务器可以监听客户端的请求，类似于 Apache，Nginx 等服务器。
3. **接收请求和响应请求** ：服务器很容易创建，客户端可以使用浏览器或终端发送 http 请求，服务器接收请求后返回相应数据。

创建 Node.js 应用：

步骤一：引入 required 模块

使用 require 指令载入 http 模块，并将实例化的 HTTP 赋值给变量 http，实例如下：

```
var http = require('http');
```

步骤二：创建服务器

接下来我们使用 `http.createServer()` 方法创建服务器，并使用`listen`方法绑定 8888 端口。函数通过`request`，`response`参数来接收和响应数据。实例如下：

```
var http = require('http');  //请求Node.js自带的http模块，并且把它赋值给http变量
http.createServer(function (request, response) {  //调用http模块提供的模块
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

# Node.js 后端框架

**Express 和 Koa（典型框架）**

Express：轻量灵活的的 node.js 框架，可以快速的搭建应用，使用广泛。[Express 官方文档](http://expressjs.jser.us/ "Markdown")

Koa：由 Express 原版人马打造，致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。通过利用 async 函数，koa 帮你丢弃回调函数，并有力的增强错误处理。[koa 官方文档](https://koa.bootcss.com/ "Markdown")

Express 和 Koa 是 node.js 最基础的两个后端框架。因为构建一个 app 仍需要些很多脚手架代码，于是在他们基础上出现了很多其他框架来减少编写这类代码。（例如：ThinkJS，egg.js 等）

# ThinkJS

介绍：ThinkJS 是一款面向未来开发的 Node.js 框架，整合了大量的项目最佳实践，让企业级开发变得简单、高效。从 3.0 开始，框架底层基于 Koa2.x 实现，兼容 Koa 的所有功能。

特性：

- 基于 Koa2.x，兼容`middleware`
- 内核小巧，支持`Extend`、`Adapter`等插件方式
- 性能优异，单元测试覆盖程度高
- 内置自动编译、自动更新机制、方便快速开发
- 使用更优雅的`async/await`处理异步问题、不再支持`*/yield`方式

#### 快速入门

借助 ThinkJS 提供的脚手架，可以快速的创建一个项目。为了可以使用更多的 ES6 特性，框架要求 node.js 的版本至少是 6.x，建议使用 LTS 版本。

#### 安装 ThinkJS 命令

```
npm install -g think-cli
```

安装完成后，系统中会有 thinkjs 命令（可以通过`thinkjs-v`查看 think-cli 版本号）

#### 创建项目

```
thinkjs new demo  //创建名为demo的项目
npm install   //安装依赖
npm start  //运行项目
```

#### 项目结构

默认创建的项目结构如下：

```
|--- development.js   //开发环境下的入口文件
|--- nginx.conf  //nginx 配置文件
|--- package.json
|--- pm2.json //pm2 配置文件
|--- production.js //生产环境下的入口文件
|--- README.md
|--- src
| |--- bootstrap  //启动自动执行目录
| | |--- master.js //Master 进程下自动执行
| | |--- worker.js //Worker 进程下自动执行
| |--- config  //配置文件目录
| | |--- adapter.js  // adapter 配置文件
| | |--- config.js  // 默认配置文件
| | |--- config.production.js  //生产环境下的默认配置文件，和 config.js 合并
| | |--- extend.js  //extend 配置文件
| | |--- middleware.js //middleware 配置文件
| | |--- router.js //自定义路由配置文件
| |--- controller  //控制器目录
| | |--- base.js
| | |--- index.js
| |--- logic //logic 目录
| | |--- index.js
| |--- model //模型目录
| | |--- index.js
|--- view  //模板目录
| |--- index_index.html


```

#### 基础功能

##### Config（配置）

实际项目中，肯定需要各种配置，包括：框架需要的配置以及项目自定义的配置。ThinkJS 将所有的配置都统一管理，文件都放在`src/config/`目录下，并根据不同的功能划分为不同的配置文件。

- `config.js` 通用的一些配置
- `adapter.js` adapter 配置 （数据库的配置）
- `router.js`自定义路由配置
- `middleware.js` middleware 配置
- `validator.js` 数据校验配置
- `extend.js` extend 配置

**配置格式**

```
// src/config.js

module.exports = {
  port: 1234,
  redis: {
    host: '192.168.1.2',
    port: 2456,
    password: ''
  }
}
```

配置值即可以是一个简单的字符串，也可以是一个复杂的对象，具体是什么类型根据具体的需求来决定。

**使用配置**

框架提供了在不同环境下不同的方式快速获取配置：

- 在 ctx（上下文）中，可以通过`ctx.config(key)`来获取配置
- 在 controller 中，可以通过`controller.config(key)`来获取配置
- 其他情况下，可以通过`think.config(key)`来获取配置

实际上，`ctx.config`和`controller.config`是基于`think.config`包装的一种更方便的获取配置的方式。

##### Adapter（适配器）

Adapter 是用来解决一类功能的多种实现，这些实现提供一套相同的接口，类似设计模式里的工厂模式。如：**支持多种数据库**，支持多种模板引擎等。通过这种方式，可以很方便地在不同的类型中进行切换。Adapter 一般配合 Extend 一起使用。

框架默认提供了很多 Adapter，如：View、Model、Cache、Session、Websocket，项目中也可以根据需要进行扩展，也可以引入第三方的 Adapter。

**Adapter 配置**

Adapter 的配置文件为`src/config/adapter.js`，格式如下：

```
const nunjucks = require('think-view-nunjucks');
const ejs = require('think-view-ejs');
const path = require('path');

exports.view = {
  type: 'nunjucks', // 默认的模板引擎为 nunjucks
  common: { //通用配置
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: { // nunjucks 的具体配置
    handle: nunjucks
  },
  ejs: { // ejs 的具体配置
    handle: ejs,
    viewPath: path.join(think.ROOT_PATH, 'view/ejs/'),
  }
}

exports.cache = {
  ...
}


```

Adapter 配置支持运行环境，可以根据不同的运行环境设置不同的配置，如：在开发环境和生产环境的数据库一般都是不一样的，这时候可以通过 `adapter.development.js` 和 `adapter.production.js` 存放有差异的配置，系统启动后会读取对应的运行环境配置和默认配置进行合并。

**Adapter 配置解析**

Adapter 配置存储了所有类型下的详细配置，具体使用时需要对其解析，选择对应的一种进行使用。比如上面的配置文件中，配置了 nunjucks 和 ejs 二种模板引擎的详细配置，但具体使用时一种场景下肯定只会用其一种模板引擎。当然，配置解析并不需要使用者在项目中具体调用，一般都是在插件对应的方法里已经处理。

**Adapter 使用**

Adapter 都是一类功能的不同实现，一般是不能独立使用的，而是配合对应的扩展一起使用。如：view Adapter（think-view-nunjucks、think-view-ejs）配合 [think-view](https://github.com/thinkjs/think-view) 扩展进行使用。

**数据库**：(model Adapter 配合 think-mongo 扩展进行使用)

model adapter

```
/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mongo', // 默认使用的类型，调用时可以指定参数切换
  common: { // 通用配置
    logConnect: true, // 是否打印数据库连接信息
    logger: msg => think.logger.info(msg) // 打印信息的 logger
  },
  mongo: {
    host: '127.0.0.1',
    port: 27017,
    user: '',
    password: '',
    database: '', // 数据库名称
    options: ''
  }
};
```

extend

```
const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const mongo = require('think-mongo');

module.exports = [
  view, // make application support view
  model(think.app),  ////将 think.app 传递给 model 扩展
  mongo(think.app),
  cache,
  session
];
```

##### Extend（扩展）

虽然框架内置了很多功能，但在实际项目开发中，提供的功能还是远远不够的。3.0 里引入了扩展机制，方便对框架进行扩展。支持的扩展类型为：`think`、`application`、`context`、`request`、`response`、`controller`、`logic` 和 `service`。

框架内置的很多功能也是扩展来实现的，如：`Session`、`Cache`。

##### Context（上下文）

Context 是 Koa 中处理用户请求中的一个对象，贯穿整个请求生命周期。一般在`middleware、controller、logic`中使用，简称 ctx。

框架里继承了该对象，并通过 Extend 机制扩展了很多非常有用的属性和方法。

例如：

**ctx.state**

在中间件之间传递信息以及将信息发送给模板时，推荐的命名空间。避免直接在 ctx 上加属性，这样可能会覆盖掉已有的属性，导致出现奇怪的问题。

```
ctx.state.user = await User.find(id);
```

这样后续在 controller 里可以通过 `this.ctx.state.user` 来获取对应的值。

```
module.exports = class extends think.Controller {
  indexAction() {
    const user = this.ctx.state.user;
  }
}
```

**ctx.header**

获取所有的 header 信息，等同于 `ctx.request.header`。

```
const headers = ctx.headers;
```

**ctx.headers**

获取所有的 header 信息，等同于 `ctx.header`。

**ctx.url**

获取请求地址。

##### Middleware（中间件）

Middleware 称之为中间件，是 Koa 中一个非常重要的概念，利用中间件，可以很方便的处理用户的请求。

中间件格式为一个高阶函数，外部的函数接收一个 `options` 参数，这样方便中间件提供一些配置信息，用来开启/关闭一些功能。执行后返回另一个函数，这个函数接收 `ctx`, `next` 参数，其中 `ctx` 为 `context` 的简写，是当前请求生命周期的一个对象，存储了当前请求的一些相关信息，`next` 为调用后续的中间件，返回值是 Promise，这样可以很方便的处理后置逻辑。（执行过程是个洋葱模型）

**配置格式**

为了方便管理和使用中间件，框架使用的配置文件来管理中间件，配置文件为`src/config/middleware.js`。

```
const path = require('path')
const isDev = think.env === 'development'

module.exports = [
  {
    handle: 'meta', // 中间件处理函数
    options: {   // 当前中间件需要的配置
      logRequest: isDev,
      sendResponseTime: isDev,
    },
  },
  {
    handle: 'resource',
    enable: isDev, // 是否开启当前中间件
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|favicon\.ico)/,
    },
  }
]
```

配置项为项目中要使用的中间件列表，每一项支持`handle`，`enable`，`options`，`match`等属性。

`handle`

中间件的处理函数，可以使用系统内置的，也可以是外部导入的，也可以是项目里的中间件。

`enable`

是否开启当前的中间件。

`options`

传递给中间件的配置项，格式为一个对象，中间件里获取到这个配置。

`match`

匹配特定的规则后才执行该中间件，支持两种方式，一种是路径匹配，一种是自定义函数匹配。

**框架内置的中间件**

框架内置了几个中间件，可以通过字符串的方式直接引用。

- `meta` 显示一些 meta 信息。如：发送 ThinkJS 版本号，接口的处理时间等
- `resource` 处理静态资源，生产环境建议关闭，直接用 webserver 处理即可
- `trace` 处理报错，开发环境将详细的报错信息显示处理，也可以自定义显示错误页面
- `payload` 处理表单提交和文件上传，类似于`koa-bodyparser`等 middleware
- `router` 路由解析，包含自定义路由解析
- `logic` logic 调用，数据校验
- `controller` controller 和 action

**项目中自定义的中间件**

有时候项目中根据一些特定需要添加中间件，那么可以放在`src/middleware`目录下，然后就可以直接通过字符串的方式引用。

```
// middleware/log.js

const defaultOptions = {
  consoleExecTime: true // 是否打印执行时间的配置
}
module.exports = (options = {}) => {
  // 合并传递进来的配置
  options = Object.assign({}, defaultOptions, options);
  return (ctx, next) => {
    if(!options.consoleExecTime) {
      return next(); // 如果不需要打印执行时间，直接调用后续执行逻辑
    }
    const startTime = Date.now();
    let err = null;
    // 调用 next 统计后续执行逻辑的所有时间
    return next().catch(e => {
      err = e; // 这里先将错误保存在一个错误对象上，方便统计出错情况下的执行时间
    }).then(() => {
      const endTime = Date.now();
      console.log(`request exec time: ${endTime - startTime}ms`);
      if(err) return Promise.reject(err); // 如果后续执行逻辑有错误，则将错误返回
    })
  }
}
```

用法：在`/src/config/middleware.js`

```
module.exports = [
  {
    handle: 'log', // 中间件处理函数
    options: {   // 当前中间件需要的配置
      consoleExecTime: true,
    },
  }
]
```

**引入外部的中间件**

引入外部的中间件非常简单，只需要`require`进来即可。

```
const cors = require('koa2-cors');
module.exports = [
  ...,
  {
    handle: cors,
    option: {
      origin: '*'
    }
  },
  ...
]

```

##### Controller（控制器）

MVC 模型中，控制器是用户请求的逻辑处理部分。比如：将用户相关的操作都放在`user.js`里，每一个操作就是里面的一个 Action。

**创建 controller**

项目里的 controller 需要继承`think.Controller`类，这样能使用一些内置的方法。当然项目中可以创建一些通用的基类，然后实际的 controller 都继承自这个基类。

项目创建时会自动创建一个名为`base.js`的基类，其他的`controller`继承该类即可。

**Action 执行**

Action 执行是通过中间件`think-controller`来完成的，通过`ctx.action`值在 controller 寻找 xxxAction 的方法名并调用，且调用相关的魔术方法，具体顺序为：

- 实例化 Controller 类，传入 `ctx` 对象
- 如果方法 [\_\_before](https://thinkjs.org/doc/3.0/controller.html#toc-083) 存在则调用，如果返回值为 `false`，则停止继续执行
- 如果方法 `xxxAction` 存在则执行，如果返回值为 `false`，则停止继续执行
- 如果方法 `xxxAction` 不存在但 [\_\_call](https://thinkjs.org/doc/3.0/controller.html#toc-fcb) 方法存在，则调用 \_\_call，如果返回值为 `false`，则停止继续执行
- 如果方法 [\_\_after](https://thinkjs.org/doc/3.0/controller.html#toc-e16) 存在则执行前置操作\_\_before

* 如果方法 [\_\_after](https://thinkjs.org/doc/3.0/controller.html#toc-e16) 存在则执行

**前置操作 \_\_before**

项目中，有时候需要在一个统一的地方做一些操作，如：判断是否已经登录，如果没有登录就不能继续后面行为。此种情况下，可以通过内置的 `__before` 来实现。

`__before` 是在调用具体的 Action 之前调用的，这样就可以在其中做一些处理。

如果类继承需要调用父级的 `__before` 方法的话，可以通过 `super.__before` 来完成。

**后置操作 \_\_after**

后置操作 `__after` 与 `__before` 对应，只是在具体的 Action 执行之后执行，如果具体的 Action 执行返回了 `false`，那么 `__after` 不再执行。

##### Logic

当在 Action 里处理用户的请求时，经常要先获取用户提交过来的数据，然后对其校验，如果校验没问题后才能进行后续的操作；当参数校验完成后，有时候还需要进行权限判断等，这些都判断无误后才能进行真正的逻辑处理。如果将这些代码都放在一个 Action 里，势必让 Action 的代码非常复杂且冗长。

为了解决这个问题，ThinkJS 在控制器前面增加了一层 Logic，Logic 里的 Action 和控制器里的 Action 一一对应，系统在调用控制器里的 Action 之前会自动调用 Logic 里的 Action。

##### Router（路由）

当用户访问一个地址时，需要有一个对应的逻辑进行处理。传统的处理方式下，一个请求对应的文件，如访问是`/user/about.php`,那么就会在项目对应的目录下有`/user/about.php`这个实体文件。这种方式虽然能解决问题，但会导致文件很多，同时可能很多文件逻辑功能其实比较简单。

在现在的 MVC 开发模型里，一般都是通过路由来解决此类问题。解决方式为：先将用户的所有请求映射到一个入口文件（如：`index.php`），然后框架解析当前请求的地址，根据配置或者约定解析出对应要执行的功能，最后去调用然后响应用户的请求。

由于 Node.js 是自己启动 HTTP（S）服务的，所以已经将用户的请求汇总到一个入口文件了，这样处理路由映射就更简单了。

在 ThinkJS 中，当用户访问一个 URL 时，最后是通过 controller 里具体的 action 来响应的。所以就需要解析出 URL 对应的 controller 和 action，这个解析工作是通过`think-router`模块来实现的。

**路由配置**

`think-router`是一个 middleware，项目创建时已经默认加到配置文件`src/config/middleware.js`里了。

**路径预处理**

当用户访问服务时，通过`ctx.url`属性，可以得到初始的`pathname`，但是为了方便后续通过`pathname`解析出 controller 和 action，需要对 pathname 进行预处理。比如去除 URL 中`.html`后缀等操作，最后得到真正后续所需解析的`pathname`。默认的路由解析规则为`/controller/action`.

对于 ThinkJS 中的 controller，可以不用写 router，也可以自定义 router。

| pathname                  | 子集控制器 | controller   | action | 备注                              |
| ------------------------- | ---------- | ------------ | ------ | --------------------------------- |
| /                         | 无         | index        | index  | controller、action 为配置的默认值 |
| /user                     | 无         | user         | index  | action 为配置的默认值             |
| /user/login               | 无         | user         | login  |                                   |
| /console/user/login       | 有         | console/user | login  | 有子集控制器 console/user         |
| /console/user/login/aaa/b | 有         | console/user | login  | 剩余的 aaa/b 不在解析             |

**自定义路由规则**

虽然默认的路由解析方式能够满足需求，但有时候会导致 URL 看起来不够优雅，我们更希望 URL 比较简短，这样会更利于记忆和传播。框架提供了自定义路由来处理这种需求。

自定义路由规则配置文件为`src/config/router.js`,路由规则为二维数组。

##### 异步处理

Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，很多接口都是异步的，如：文件操作、网络请求。虽然提供了文件操作的同步接口，但这些接口是阻塞式的，非特殊情况下不要使用它。

对于异步接口，官方的 API 都是 callback 形式的，但是这种方式在业务逻辑复杂后，很容易出现[callback hell](http://callbackhell.com/"Markdown") 的问题，为了解决这个问题相继出现了 event、Promise、Generator function、Async function 等解决方案，ThinkJS 使用 async function 方案来解决异步问题。

**Async functions**

Async functions 使用 `async/await` 语法定义函数，如：

```
async function fn() {
  const value = await getFromApi();
  doSomethimgWithValue();
}
```

- 有 await 时必须要有 async，但有 async 不一定非要有 await
- Async functions 可以是普通函数的方式，也可以是 Arrow functions 的方式
- await 后面需要接 Promise，如果不是 Promise，则不会等待处理
- 返回值肯定为 Promise

返回值和 await 后面接的表达式均为 Promise，也就是说 Async functions 以 Promise 为基础。如果 await 后面的表达式返回值不是 Promise，那么需要通过一些方式将其包装为 Promise。

#### 模型/数据库

##### 关系型数据库

在项目开发中，经常需要操作数据库（如：增删改查等功能），手工拼写 SQL 语句非常麻烦，同时还要注意 SQL 注入等安全问题。为此框架提供了模型功能，方便操作数据库。

**扩展模型功能**

框架默认没有提供模型的功能，需要加载对应的扩展才能支持，对应的模块为 [think-model](https://github.com/thinkjs/think-model)。修改扩展的配置文件 `src/config/extend.js`，添加如下的配置：

```
const model = require('think-model');
module.exports = [
  model(think.app) // 让框架支持模型的功能
]；
```

**配置数据库**

模型由于要支持多种数据库，所以配置文件的格式为 Adapter 的方式，文件路径为 `src/config/adapter.js`

**Mysql**

Mysql 的 Adapter 为 [think-model-mysql](https://github.com/thinkjs/think-model-mysql)，底层基于 [mysql](https://github.com/mysqljs/mysql) 库实现，使用连接池的方式连接数据库，默认连接数为 1。

```
const mysql = require('think-model-mysql');
exports.model = {
  type: 'mysql',
  mysql: {
    handle: mysql, // Adapter handle
    user: 'root', // 用户名
    password: '', // 密码
    database: '', // 数据库
    host: '127.0.0.1', // host
    port: 3306, // 端口
    connectionLimit: 1, // 连接池的连接个数，默认为 1
    prefix: '', // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
  }
}
```

**创建模型文件**

模型文件放在 `src/model/` 目录下，继承模型基类 `think.Model`，文件格式为：

```
// src/model/user.js
module.exports = class extends think.Model {
  getList() {
    return this.field('name').select();
  }
}
```

**实例化模型**

项目启动时，会扫描项目下的所有模型文件，扫描后会将所有的模型类存放在 `think.app.models` 对象上，实例化时会从这个对象上查找，如果找不到则实例化模型基类 `think.Model`。

**CRUD 操作**

`think.Model` 基类提供了丰富的方法进行 CRUD 操作，下面来一一介绍。

https://thinkjs.org/zh-cn/doc/3.0/relation_model.html

##### MongoDB

有时候关系数据库并不能满足项目的需求，需要 MongoDB 来存储数据。框架提供了 [think-mongo](https://github.com/thinkjs/think-mongo) 扩展来支持 MongoDB，该模块是基于 [mongodb](https://github.com/mongodb/node-mongodb-native) 实现的。

**配置 MongoDB 数据库**

```
MongoDB 的数据库配置复用了关系数据库模型的配置，为 adapter 配置，放在 model 下。文件路径为 `src/config/adapter.js`

exports.model = {
  type: 'mongo', // 默认使用的类型，调用时可以指定参数切换
  common: { // 通用配置
    logConnect: true, // 是否打印数据库连接信息
    logger: msg => think.logger.info(msg) // 打印信息的 logger
  },
  mongo: {
    host: '127.0.0.1',
    port: 27017,
    user: '',
    password: '',
    database: '', // 数据库名称
    options: {
      replicaSet: 'mgset-3074013',
      authSource: 'admin'
    }
  }
}
```

**扩展 MongoDB 功能**

修改扩展的配置文件 `src/config/extend.js`，添加如下的配置：

```
const mongo = require('think-mongo');

module.exports = [
  mongo(think.app) // 让框架支持模型的功能
]
```

添加完扩展后，会注入 `think.Mongo`、`think.mongo`、`ctx.mongo` 和 `controller.mongo` 方法，其中 think.Mongo 为 Mongo 模型的基类文件，其他为实例化 Mongo 模型的方法，ctx.mongo 和 controller.mongo 是 think.mongo 方法的包装。

**创建模型文件**

模型文件放在 `src/model/` 目录下（多模块项目为 `src/common/model` 以及 `src/[module]/model`），继承模型基类 `think.Mongo`，文件格式为：

```
// src/model/user.js
module.exports = class extends think.Mongo {
  getList() {
    return this.field('name').select();
  }
}
```

**实例化模型**

项目启动时，会扫描项目下的所有模型文件（目录为 `src/model/`），扫描后会将所有的模型类存放在 `think.app.models` 对象上，实例化时会从这个对象上查找，如果找不到则实例化模型基类 `think.Mongo`。

**API**

https://thinkjs.org/zh-cn/doc/3.0/mongo.html

#### think 对象

框架中内置 `think` 全局对象，方便在项目中随时随地使用。

**API**

https://thinkjs.org/zh-cn/doc/3.0/think.html

#### 启动自定义

当通过 `npm start` 或者 `node production.js` 来启动项目时，虽然可以在这些入口文件里添加其他的逻辑代码，但并不推荐这么做。系统给出了其他启动自定义的入口。

**bootstrap**

系统启动时会加载 `src/boostrap/` 目录下的文件，具体为：

- Master 进程下时加载 `src/bootstrap/master.js`
- Worker 进程下时加载 `src/bootstrap/worker.js`

所以可以将一些需要在系统启动时就需要执行的逻辑放在对应的文件里执行。

#### Service / 服务

项目中，有时候除了查询数据库等操作外，也需要调用远程的一些接口，如：调用 GitHub 的接口、调用发送短信的接口等等。

这种功能放在 Model 下是不太合适的，为此，框架提供了 Service 来解决此类问题。

**创建 Service 文件**

Service 文件存放在 `src/service/` 目录下，文件内容格式如下：

```
//  src/service/user.js
module.exports = class extends think.Service {
  find(id){
     return {username:'123',id:id}
  }
}
```

Service 都继承 `think.Service` 基类，但该基类不提供任何方法，可以通过 Extend 进行扩展。

**实例化 Service 类**

可以通过 `think.service` 方法实例化 Service 类，在控制器、ctx 也有对应的 `service` 方法，如：`ctx.service`、`controller.service`，这些方法都是 think.service 的快捷方式。

```
//controller

think.service('user').find(111)
```

项目启动时，会扫描项目下所有的 services 文件，并存放到 `think.app.services` 对象下，实例化时会从该对象上查找对应的类文件，如果找不到则报错。
