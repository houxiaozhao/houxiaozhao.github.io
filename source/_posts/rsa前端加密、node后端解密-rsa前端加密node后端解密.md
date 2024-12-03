---
title: rsa前端加密、node后端解密
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2022-03-09 16:59:10.381
updated: 2022-03-10 17:19:26.017
url: /archives/rsa前端加密node后端解密
categories:
tags:
  - node
  - 加密
---

> 对用户敏感数据进行加密处理，后端再解密。比如登录时的密码

## 由后端生成公钥

node 使用`node-rsa`

```javascript
import NodeRSA = require('node-rsa');
const RSA = new NodeRSA({ b: 512 });
RSA.setOptions({ encryptionScheme: 'pkcs1' });
const pubkey = RSA.exportKey('pkcs8-public-pem'); // 生成公钥，发给前端用于数据加密，不导出私钥信息
this.app.pubkey = pubkey;
this.app.RSA = RSA;// 把RSA对象保存在程序内存，随时调用
```

## 前端加密

前端使用`jsencrypt`

```javascript
import JSEncrypt from "jsencrypt";
const encryptor = new JSEncrypt();
encryptor.setPublicKey(this.key);
const password = encryptor.encrypt("password"); // 把password传给后端
```

## 后端解密

```javascript
const decryptedPassword = this.app.RSA.decrypt(payload.password, "utf8"); //得到解密后的数据
```
