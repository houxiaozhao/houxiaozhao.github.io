---
title: API接口签名设计，防止重放
date: 2022-03-09 15:04:07.111
updated: 2022-03-10 17:22:44.535
url: /archives/api接口签名设计防止重放
categories: 
tags: 
- node
- api
- 签名
---

> 为了保证api接口安全，防止数据被篡改，需要设计api签名机制。以下为签名过程


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
``` javascript
import hmacSHA512 from 'crypto-js/hmac-sha512';
import md5 from 'crypto-js/md5';
const timestamp = +new Date()
const nocestr = generateNoceStr()
const data = Object.assign({}, payload.rawData, {timestamp, nocestr})
const canonical_string = payload.method + md5(JSON.stringify(sortObject(data)))
const sign = hmacSHA512(canonical_string, token).toString()
options.headers = {sign, timestamp, nocestr}
```
``` javascript
// 随机字符串生成
function generateNoceStr(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let noceStr = '', maxPos = chars.length;
    while (length--) noceStr += chars[Math.random() * maxPos | 0];
    return noceStr;
}

```
``` javascript
// 递归对对象属性进行排序
function sortObject(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
        const sortData = {} // 排序后的对象
        Object.keys(obj).sort().forEach(key => {
            if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
                // console.log(obj[key], '对象');
                sortData[key] = sortObject(obj[key])
            } else if (Array.isArray(obj[key])) {
                console.log(obj[key], '数组');
                sortData[key] = obj[key].map(e => {
                    return sortObject(e)
                })
            } else if (typeof obj[key] === 'number') {
                // console.log(obj[key], '数字');
                sortData[key] = obj[key].toString()
            } else if (typeof obj[key] === 'string') {
                // console.log(obj[key], '字符串');
                sortData[key] = obj[key]
            } else {
                // console.log(obj[key], '其他');
                sortData[key] = obj[key]
            }
        })
        return sortData
    } else {
        return obj
    }
}

```
### 后端验签实现如下(加在后端合适的位置，比如全局中间件)
``` javascript
const timestamp = ctx.headers.timestamp;
const nocestr = ctx.headers.nocestr;
const sign = ctx.headers.sign;
if (!timestamp) {
   ctx.body = { errno: 400, errmsg: '验签失败,没有时间戳' };
   return;
}
if (!nocestr) {
   ctx.body = { errno: 400, errmsg: '验签失败,没有随机数' };
   return;
}
if (new Date().getTime() - Number(timestamp) > 1000 * 60) {
   ctx.body = { errno: 400, errmsg: '验签失败,时间超时' };
   return;
}
if (!sign) {
   ctx.body = { errno: 400, errmsg: '验签失败,没有签名' };
   return;
}
const rawData = Object.assign({}, ctx.request.body, ctx.query, ctx.params, { timestamp, nocestr });
const mySign = hmacSHA512(ctx.request.method + md5(JSON.stringify(sortObject(rawData))).toString(), headerToken).toString();

if (sign !== mySign) {
   ctx.body = { errno: 400, errmsg: '验签失败' };
   return;
} 
```

## 添加请求防止重放
- 原理就是把签名存到redis中，再次请求查一下redis内是否有该签名。有的话就是重放请求。
```
// 验签成功后
if (await ctx.app.redis.get('request:sign:' + sign)) {
   ctx.body = { errno: 400, errmsg: '请求失效' };
   return;
}
await ctx.app.redis.set('request:sign:' + sign, sign);
await ctx.app.redis.expire('request:sign:' + sign, 60);// 60秒后，就通不过时间戳判断
```