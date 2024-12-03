---
title: API安全防护：接口签名验证与防重放攻击实现
date: 2022-03-09 15:04:07.111
categories:
  - API安全
  - 后端开发
  - 系统架构
tags:
  - API签名
  - 安全防护
  - JavaScript
  - Node.js
  - Redis
  - 加密算法
  - 防重放攻击
  - 中间件开发
  - Web安全
  - 接口设计
keywords:
  - API接口安全
  - 数据签名验证
  - 防重放机制
  - MD5加密
  - HMAC-SHA512
  - 请求验证
  - 时间戳验证
  - Redis缓存
  - 接口防护
  - 安全中间件
  - 参数排序
  - 签名算法
  - 加密实现
  - Token验证
  - 请求防篡改
description: |
  本文详细介绍了API接口安全防护的完整解决方案，重点阐述了接口签名验证和防重放攻击的具体实现方法。文章从实际应用场景出发，提供了前后端完整的代码实现。

  在接口签名设计方面，文章详细说明了以下核心内容：
  1. 签名参数的构成：包括请求路径(path)、查询参数(query)、请求体(body)、时间戳(timestamp)和随机字符串(nocestr)
  2. 签名算法的实现流程：
     - 参数合并与排序（包括嵌套JSON的递归排序）
     - MD5初步加密
     - 使用用户token进行HMAC-SHA512加密
  3. HTTP请求头的规范设置，包含sign、timestamp、nocestr等关键信息

  在防重放攻击实现方面，文章提供了完整的解决方案：
  1. 基于Redis的签名存储机制
  2. 时间戳有效期验证（60秒超时限制）
  3. 请求唯一性校验
  4. 中间件级别的统一处理方案

  文章还提供了详细的代码示例，包括：
  - 随机字符串生成函数
  - 对象属性递归排序算法
  - 前端签名实现
  - 后端验签中间件
  - Redis防重放实现

  This article provides a comprehensive solution for API interface security protection, focusing on signature verification and replay attack prevention. Based on real application scenarios, it offers complete code implementation for both frontend and backend.

  Regarding interface signature design, the article details the following core contents:
  1. Signature parameter composition: including request path, query parameters, request body, timestamp, and random string (nocestr)
  2. Signature algorithm implementation process:
     - Parameter merging and sorting (including recursive sorting of nested JSON)
     - Initial MD5 encryption
     - HMAC-SHA512 encryption using user token
  3. HTTP header specification settings, including key information like sign, timestamp, and nocestr

  For replay attack prevention, the article provides a complete solution:
  1. Redis-based signature storage mechanism
  2. Timestamp validity verification (60-second timeout limit)
  3. Request uniqueness validation
  4. Middleware-level unified processing solution

  The article also provides detailed code examples, including:
  - Random string generation function
  - Recursive sorting algorithm for object properties
  - Frontend signature implementation
  - Backend signature verification middleware
  - Redis-based replay prevention implementation
---

> 为了保证 api 接口安全，防止数据被篡改，需要设计 api 签名机制。以下为签名过程

#### 接口签名算法

##### 1. 获取参数 一共 4 部分的参数

- path
- query
- body
- 时间戳 {timestamp}
- 随机字符串 {nocestr}

#### 2. 合并参数，然后排序(body 中可能嵌套多层 json,需要递归对对象属性排序，数组的顺序不变)

#### 3. 对上一步对象转为字符串，然后 md5 加密

#### 4. 再用用户 token 为 key，对 md5 加密后的字符串用 hmacSHA512 加密得到 sign

#### 5. http 请求 header 中添加 sign、timestamp、nocestr

### 前端签名实现如下

```javascript
import hmacSHA512 from "crypto-js/hmac-sha512";
import md5 from "crypto-js/md5";
const timestamp = +new Date();
const nocestr = generateNoceStr();
const data = Object.assign({}, payload.rawData, { timestamp, nocestr });
const canonical_string = payload.method + md5(JSON.stringify(sortObject(data)));
const sign = hmacSHA512(canonical_string, token).toString();
options.headers = { sign, timestamp, nocestr };
```

```javascript
// 随机字符串生成
function generateNoceStr(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let noceStr = "",
    maxPos = chars.length;
  while (length--) noceStr += chars[(Math.random() * maxPos) | 0];
  return noceStr;
}
```

```javascript
// 递归对对象属性进行排序
function sortObject(obj) {
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    const sortData = {}; // 排序后的对象
    Object.keys(obj)
      .sort()
      .forEach(key => {
        if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
          // console.log(obj[key], '对象');
          sortData[key] = sortObject(obj[key]);
        } else if (Array.isArray(obj[key])) {
          console.log(obj[key], "数组");
          sortData[key] = obj[key].map(e => {
            return sortObject(e);
          });
        } else if (typeof obj[key] === "number") {
          // console.log(obj[key], '数字');
          sortData[key] = obj[key].toString();
        } else if (typeof obj[key] === "string") {
          // console.log(obj[key], '字符串');
          sortData[key] = obj[key];
        } else {
          // console.log(obj[key], '其他');
          sortData[key] = obj[key];
        }
      });
    return sortData;
  } else {
    return obj;
  }
}
```

### 后端验签实现如下(加在后端合适的位置，比如全局中间件)

```javascript
const timestamp = ctx.headers.timestamp;
const nocestr = ctx.headers.nocestr;
const sign = ctx.headers.sign;
if (!timestamp) {
  ctx.body = { errno: 400, errmsg: "验签失败,没有时间戳" };
  return;
}
if (!nocestr) {
  ctx.body = { errno: 400, errmsg: "验签失败,没有随机数" };
  return;
}
if (new Date().getTime() - Number(timestamp) > 1000 * 60) {
  ctx.body = { errno: 400, errmsg: "验签失败,时间超时" };
  return;
}
if (!sign) {
  ctx.body = { errno: 400, errmsg: "验签失败,没有签名" };
  return;
}
const rawData = Object.assign({}, ctx.request.body, ctx.query, ctx.params, { timestamp, nocestr });
const mySign = hmacSHA512(ctx.request.method + md5(JSON.stringify(sortObject(rawData))).toString(), headerToken).toString();

if (sign !== mySign) {
  ctx.body = { errno: 400, errmsg: "验签失败" };
  return;
}
```

## 添加请求防止重放

- 原理就是把签名存到 redis 中，再次请求查一下 redis 内是否有该签名。有的话就是重放请求。

```
// 验签成功后
if (await ctx.app.redis.get('request:sign:' + sign)) {
   ctx.body = { errno: 400, errmsg: '请求失效' };
   return;
}
await ctx.app.redis.set('request:sign:' + sign, sign);
await ctx.app.redis.expire('request:sign:' + sign, 60);// 60秒后，就通不过时间戳判断
```
