---
title: 国密算法实践：基于SM2/SM3/SM4的前后端加密通信方案
date: 2022-11-09 08:40:46
categories:
  - 网络安全
  - 加密技术
  - 系统开发
tags:
  - 国密算法
  - SM2加密
  - SM3哈希
  - SM4加密
  - 数据安全
  - 密钥传输
  - JavaScript加密
  - HTTPS
keywords:
  - 国密算法实现
  - SM2非对称加密
  - SM3哈希算法
  - SM4对称加密
  - 前后端加密
  - 密钥交换
  - 数据完整性
  - 防篡改验证
  - 密文传输
  - 安全通信
  - 加密实践
  - 重放攻击防护
  - SSL/TLS
  - 数据加密
  - Web安全
description: |
  本文详细介绍了使用国密算法SM2、SM3、SM4实现前后端安全通信的完整方案。首先阐述了三种密码算法的特点：SM2作为非对称加密算法用于数字签名和密钥交换，SM3作为哈希算法确保数据完整性，SM4作为对称加密算法保护数据机密性。文章重点展示了双向加密传输的具体实现流程：在前端到后端通信中，采用SM3计算数据哈希值并与明文拼接，再使用SM2公钥加密传输；在后端到前端通信中，使用类似方式处理数据，但改用SM4的CBC模式进行加密。每个流程都配有详细的代码示例，包括加密、解密、完整性校验等关键步骤。最后讨论了系统安全性的补充措施，如HTTPS部署、防重放攻击等实践建议。

  This article presents a comprehensive implementation of secure communication between frontend and backend using China's national cryptographic algorithms: SM2, SM3, and SM4. It begins by explaining the characteristics of these three algorithms: SM2 for asymmetric encryption, digital signatures, and key exchange; SM3 for hash functions ensuring data integrity; and SM4 for symmetric encryption protecting data confidentiality. The article focuses on demonstrating the bidirectional encryption process: in frontend-to-backend communication, it calculates data hash using SM3, concatenates it with plaintext, and encrypts using SM2 public key; in backend-to-frontend communication, it follows a similar process but uses SM4 in CBC mode for encryption. Each process is accompanied by detailed code examples, including encryption, decryption, and integrity verification steps. The article concludes with additional security measures such as HTTPS deployment and replay attack prevention, providing practical recommendations for enhancing system security.
---

## **加密算法介绍**

### 非对称密码算法 SM2

SM2 椭圆曲线公钥密码算法是我国自主设计的公钥密码算法，包括 SM2-1 椭圆曲线数字签名算法，SM2-2 椭圆曲线密钥交换协议，SM2-3 椭圆曲线公钥加密算法，分别用于实现数字签名密钥协商和数据加密等功能。

### 对称密码算法 SM4

SM3 杂凑算法是我国自主设计的密码杂凑算法，适用于商用密码应用中的数字签名和验证消息认证码的生成与验证以及随机数的生成，可满足多种密码应用的安全需求。

### 杂凑算法 SM3

SM4 分组密码算法是我国自主设计的分组对称密码算法，用于实现数据的加密/解密运算，以保证数据和信息的机密性。

## 密钥传输流程

![n4jnbc](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/11/09/n4jnbc.png)

## **前端到后端加密传输**

### **前端加密**

拦截前端请求，对请求中的 body 使用 SM3 计算哈希，然后把哈希值和明文数据拼接，再使用 SM2 公钥对数据进行加密传输。公式如下：
**SM2(SM3(明文)+明文)**

```javascript
{
  method: payload.method,
    url: url,
    data: {
    data: sm2.doEncrypt(sm3(JSON.stringify(payload.data)) + JSON.stringify(payload.data), pub_key, 1)},
}
```

### **后端解密**

后端收到密文数据后先使用 SM2 私钥解密数据，分离哈希值和明文数据。计算明文数据哈希和返回包中的哈希是否一致，保证数据完整和不被篡改。

```javascript
const sm3_body = sm2.doDecrypt(ctx.request.body.data, ctx.app.config.privateKey, 1);
const body = sm3_body.substr(64);
const sm3string = sm3_body.substr(0, 64);
const sm3string2 = sm3(body);
if (sm3string !== sm3string2) {
  ctx.body = { errno: 401, errmsg: `（${ctx.request.method}${ctx.url}）调用接口失败` };
  return;
}
```

### 示例

```javascript
// 原始包
{
    "inspectionArea": "6303401a5020b5348fdbdb8b",
    "name": "作业名称s",
    "recordVideo": true,
    "taskType": "例行巡检",
    "executionMode": "手动执行",
    "flightPath": "6332be25dc7b7f4717fdd65a",
    "executor": "6303401a5020b5348fdbdb88",
    "content": ""
}
```

```javascript
{"inspectionArea":"6303401a5020b5348fdbdb8b","name":"作业名称s","recordVideo":true,"taskType":"例行巡检","executionMode":"手动执行","flightPath":"6332be25dc7b7f4717fdd65a","executor":"6303401a5020b5348fdbdb88","content":""}
```

```javascript
ed8380aefbcee98689027a4945bd471e18428faa3f6522f8e460a51d86cf1063;
```

```javascript
ed8380aefbcee98689027a4945bd471e18428faa3f6522f8e460a51d86cf1063{"inspectionArea":"6303401a5020b5348fdbdb8b","name":"作业名称s","recordVideo":true,"taskType":"例行巡检","executionMode":"手动执行","flightPath":"6332be25dc7b7f4717fdd65a","executor":"6303401a5020b5348fdbdb88","content":""}
```

```javascript
cea57760dc077f1e607de46a645b9852ae9154ff60ace3ffe4e75d5374cbecdda641c29994d8db259bd0787915addf16d651a517cb50151e03bc40365a06e94f44834afe74aff5f9542322f6da9e915b25d4ec36a64b4a6e004bc76051da6e9703d3da7674611a4124d005202cc4bf5fb0f3a07e3aaa94e2b1ed11255fdeec89ca7c6d929a71dc68d981c011f437db2447edeaef230d589709a5cde8173a41fe6a647272034dd390e5cef2269049bdd0d0d7eabf15f868c8f5edd0d6549d678053f6e3c000af86010e1cacd3556cc417bd15eb98021b64ce5706dfce7ba1b672055664c395a4b237b4deb747e562fa0bf4d0e256de11ffd04222c9d40386f0841909cea981d126104f7e3a35b9084c5dad41a44e7c46df9256f19bd487c4a349365e601cc359ee86da674dc62c16588db06272048e7692e5815ba93824190606569eca1ee0c412b525c7149db0fb45bf0698018c199fe0a892ef5d99293fcb420b0de0d6c65d3be777f08b8f6514fc9f99f669d97c657f8931207e5952639505aea4aa0d07ab497808ddb3;
```

## **后端到前端加密传输**

### **后端加密**

后端系统返回数据之前，对返回的明文数据 SM3 计算哈希，然后把哈希值和明文数据拼接，最后使用使用 SM4 cbc 模式加密，SM4 的 key 就是第一步前端传给后端的 key。公式如下：
**SM4(SM3(明文)+明文)**

```javascript
const dataStr = JSON.stringify(data);
const resData = sm4.encrypt(sm3(dataStr) + dataStr, this.ctx.state.userKey, { mode: "cbc", iv: this.ctx.state.iv });
```

### **前端解密**

前端收到密文数据后先使用 SM4 解密，分离哈希值和明文数据。计算明文数据的哈希和返回包中的哈希是否一致，保证数据不被篡改。

```javascript
const decryptData = sm4.decrypt(dataAxios.data, sm4key, {
  mode: "cbc",
  iv: sm4iv,
});
const sign = decryptData.substr(0, 64);
const data = decryptData.substr(64);
if (sm3(data).toString() !== sign) {
  return Promise.reject("数据校验失败");
}
```

### **示例**

```javascript
6332c2b808d6f56244f05c81
```

```javascript
"6332c2b808d6f56244f05c81";
```

```javascript
9d86a18933d22f26acf86c5fe162139ab3f5c6a997aaec7ebc47c4af98178712
```

```javascript
9d86a18933d22f26acf86c5fe162139ab3f5c6a997aaec7ebc47c4af98178712"6332c2b808d6f56244f05c81"
```

```javascript
b34453814cbf6294bb76dbdb214f99eb55c666d70cebc760a86682771c7c82994734fa66bb6b86fe955744b6d87487b7920f358162c3b0c1745ad57f68e371cc927445096b74f9d3bd046757831a8e3152d09130cbabc4e6696b9294920b1c97;
```

## **后续**

除了对传输过程中的数据包进行加密解密以外，还需要一些其他手段提高系统交互中的安全性。比如

- 使用 https 部署网站系统，利用 SSL/TLS 来加密数据包。
- 使用随机数、时间戳来设计请求签名机制，保证数据完整和防止重放攻击。
- 等等。。。
