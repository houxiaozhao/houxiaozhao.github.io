---
title: NestJS 企业级应用开发：基于 MongoDB 和 JWT 的 RESTful API 模板
date: 2021-03-04 10:48:14.0
categories:
  - 后端开发
  - Node.js
  - 企业应用
tags:
  - NestJS
  - MongoDB
  - JWT认证
  - TypeScript
  - RESTful API
  - Swagger
  - Redis缓存
  - 权限管理
  - 代码生成
  - 微服务
keywords:
  - NestJS框架
  - MongoDB数据库
  - JWT身份验证
  - RESTful接口
  - TypeScript开发
  - Swagger文档
  - Redis缓存
  - 权限角色
  - 代码自动生成
  - 异常处理
  - API文档
  - 企业级应用
  - 后端模板
  - 服务端开发
  - 微服务架构
description: |
  本文详细介绍了一个基于NestJS框架的企业级后端开发模板，集成了MongoDB、JWT认证、Swagger文档等现代化技术栈。该模板提供了完整的用户认证、权限管理、API文档生成等核心功能，并实现了统一的异常处理和响应格式。主要特性包括：基于TypeScript的强类型开发、MongoDB数据库集成（使用Typegoose实现类型安全的模型定义）、JWT身份验证、Swagger API文档自动生成、Redis缓存支持、统一的异常处理机制、文件上传功能、自动化的API代码生成工具等。模板还提供了完整的权限角色管理系统，支持细粒度的访问控制。通过详细的安装说明和使用教程，开发者可以快速搭建一个功能完备的企业级后端服务。

  This article presents a comprehensive enterprise-level backend development template based on the NestJS framework, integrating modern technology stack including MongoDB, JWT authentication, and Swagger documentation. The template provides core functionalities such as user authentication, permission management, and API documentation generation, along with unified exception handling and response formatting. Key features include: TypeScript-based strong typing development, MongoDB integration (using Typegoose for type-safe model definitions), JWT authentication, automatic Swagger API documentation generation, Redis caching support, unified exception handling mechanism, file upload functionality, and automated API code generation tools. The template also includes a complete permission and role management system supporting fine-grained access control. Through detailed installation instructions and usage tutorials, developers can quickly set up a fully functional enterprise-grade backend service.
---

# 基于 nestjs mongoose jwt 的 restful 模板程序 用于快速搭建服务端程序

[houxiaozhao/template](https://github.com/houxiaozhao/template)

## **涉及技术框架**

- nestjs 服务框架
- mongoose 操作数据库的库
  - typegoose 使用类定义数据模型
  - nestjs-typegoose
  - mongoose-paginate 分页插件
- jwt 生成验证 token
- swagger 文档生成

## **配置文件**

nestjs-config 管理配置文件

```
/env/
/src/config/
```

## **Redis 缓存基本用法**

```jsx
// controller
@HttpCache(ARTICLE, 60)
@UseInterceptors(HttpCacheInterceptor)

// module
import { CacheModule } from 'src/common/processors/cache/cache.module';
@Module({
  imports: [CacheModule]
})

```

## **功能**

- [x] 用户登陆注册
- [x] jwt 验证
- [x] 增删改查，分页查询
- [x] 统一异常处理（使用业务状态码）
- [x] 统一返回结构
- [x] 自定义 user 装饰器 src/common/decorator/user.decorator
- [x] mongo objectid 示例管道
- [x] 跨域处理
- [x] 文件上传示例(转存到云服务)
- [x] redis 缓存
- [ ] 异常发送邮件提醒
- [x] 权限角色管理
- [x] 自动生成代码

## **Installation**

`$ npm install`

## **Running the app**

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## **Test**

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## **文档地址**

[http://127.0.0.1:3001/doc](http://127.0.0.1:3001/doc)

## **异常处理**

异常过滤器

- src\common\filters\http-exception.filter.ts

自定义 api 异常

- src\common\exceptions\api.exception.ts

拦截器

- src\common\interceptor\exception.interceptor.ts
- src\common\interceptor\transform.interceptor.ts

### **异常使用方式**

```jsx
throw new ApiException("ID无效", ApiErrorCode.ID_INVALID, HttpStatus.BAD_REQUEST);
// {
//   "status": 400,
//   "timestamp": "2020-10-26T01:20:18.452Z",
//   "path": "/article/5f93df3b03ac4483c069b0092",
//   "errorCode": 10001,
//   "message": "ID无效"
// }
throw new HttpException(
  {
    message: "请求参数id 必传",
    errorCode: "10000",
  },
  HttpStatus.BAD_REQUEST
);
```

### **接口文档 （yapi）**

使用 yapi import 工具 导入 swagger 文档到 yapi 中 配置`yapi-import.json`

```bash
npm run yapi
```

### **api 代码生成(yapi-gen-js-code)**

使用 yapi-gen-js-code 进行 yapi 的代码生成 进行了一些调整修改，以适配当前前端代码 使用配置`yapi-import.json`

```bash
npm run gapi
```

生成的代码只需要把需要的部分复制到前端相应的文件中

### **权限角色思路**

使用`putApi2DB.js`把 ypi 上的接口全都插入到数据库中。单独修改里面的配置

```bash
node .\putApi2DB.js
```

### **Getting started**

需要先创建公司，分配公司管理员权限（务必把角色和用户管理权限分配给管理员，否则公司管理员无法自行管理用户角色）。使用 db.js 已配置

1. 先把 db.js 导入到数据库 后台管理用户名密码 houxiaozhao/houxiaozhao
2. 测试公司用户名密码 18300000000/18300000000

### **rest 接口使用方式**

1. CRUD 生成器

   ```
   nest g resource modules/device --no-spec
   ```

2. Model Service Controller DTO 修改
3. yapi(可选)

   - 接口文档同步到 yapi

   ```
   npm run yapi
   ```

   - 生成前端代码

   ```
   npm run gapi
   ```

4. 把 api 接口加到数据库中（可选）
   - 添加 api（设置为需要验证）
   - 设置权限
   - 设置角色
   - 添加菜单
   - 添加按钮（可选，权限设置）
5. 登录管理后台，创建 api，创建菜单，创建设备管理权限
6. 登录用户前端，角色管理，创建设备管理角色，为用户分配设备管理角色，然后刷新即可显示出设备管理菜单（现在点击菜单显示 404）
7. 切换到前端代码 web

   - 创建页面设备管理页面(device/index.vue)
   - 创建路由（和第 5 步创建菜单的路径一致）
   - 复制 views/demo/page1/index.vue 的代码到 device/index.vue,修改 name 和路由一致
   - 在/src/api/modules 文件夹创建 device.api.js

     ```jsx
     export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
       // 自动生成代码
     });
     ```

   - 复制自动生成的关于设备管理代码到/src/api/modules/device.api.js
   - 修改/device/index.vue 里的增删改查函数名称
   - 根据需要修改字段
     - addDataForm
     - editDataForm
     - addRules
     - editRules
     - addData 函数定义添加字段
     - editData 函数定义编辑字段
     - 表格显示字段
     - 添加表单
     - 编辑表单
   - 如果配置了按钮权限（能不能添加、编辑、删除等），需要使用`buttonid`指令 xxx 为数据库按钮的 id

     ```
     v-buttonid="'xxx'"
     ```
