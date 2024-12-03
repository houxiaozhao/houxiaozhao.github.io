---
title: 基于RSA和AES的系统离线License验证方案实现
date: 2024-05-10 10:12:17.0
categories:
  - 系统开发
  - 安全认证
  - Node.js开发
tags:
  - License验证
  - 系统安全
  - 加密算法
  - Node.js
  - RSA加密
  - AES加密
  - 私有化部署
  - 离线验证
keywords:
  - 离线License验证
  - RSA加密验证
  - AES加密实现
  - 数字签名
  - 私钥签名
  - 公钥验签
  - Node-RSA
  - 系统授权
  - 安全验证
  - 密钥对生成
  - License生成
  - 离线部署
  - 系统安全
  - 授权管理
  - 加密方案
description: |
  本文详细介绍了一种基于RSA和AES加密的系统离线License验证方案。该方案专门解决私有化部署环境下的系统授权问题，重点关注完全离线环境下的License验证实现。文章首先阐述了方案需要解决的核心问题，包括离线验证支持、验证准确性保证、授权限制条件设置以及设备绑定等关键要素。接着深入讲解了基于私钥签名和公钥验签的实现原理，详细说明了License生成过程中的加密步骤，包括自定义信息加密、私钥签名等具体操作。文章还提供了完整的Node.js实现代码，包括密钥对生成、License生成和验证三个核心模块的详细代码实现。每个代码片段都配有清晰的注释说明，便于开发者理解和实施。同时，文章还提供了完整的源代码仓库链接，方便读者进一步学习和参考。

  This article presents a comprehensive offline License verification solution based on RSA and AES encryption algorithms. The solution specifically addresses system authorization issues in private deployment environments, focusing on License verification implementation in completely offline environments. The article first outlines the core problems the solution needs to address, including offline verification support, verification accuracy assurance, authorization restriction settings, and device binding. It then delves into the implementation principles based on private key signing and public key verification, detailing the encryption steps in the License generation process, including custom information encryption and private key signing. The article also provides complete Node.js implementation code, covering three core modules: key pair generation, License generation, and verification. Each code snippet is accompanied by clear comments for developers' understanding and implementation. Additionally, the article includes a link to the complete source code repository for further learning and reference. The solution effectively balances security requirements with practical implementation considerations, making it suitable for various private deployment scenarios requiring offline License verification.
---

> 为了解决系统私有化部署，完全离线的情况下，如何验证 license 的问题。 需要考虑以下几个方面：

> 1. 系统需要支持离线验证，即在没有网络连接的情况下也能进行 license 验证。
> 2. 需要保证 license 验证的准确性，防止被篡改或伪造。
> 3. 需要考虑 license 的过期时间、使用次数等限制条件，并确保在离线情况下也能进行验证。
> 4. 需要确保系统绑定在一台设备上，防止 license 被盗用。

## 1. 实现原理

使用私钥签名，公钥验签的方式进行验证。在系统部署时，生成一个密钥对，使用私钥对信息签名。同时将公钥提供给用户，用于验证签名。用户在购买 license 时，使用私钥对 license 进行签名，并将签名后的 license 发送给用户。用户在安装 license 时，使用公钥对 license 进行验签，验证其有效性。
签名的过程

1. 对自定义信息+随机字符串(密钥)进行加密
2. 使用私钥对加密后的信息进行签名
3. 将密钥+加密信息长度+加密信息+签名作为 license

## 2. 具体实现 Nodejs 代码

### 2.1 生成密钥对

```javascript
const NodeRSA = require("node-rsa");
const key = new NodeRSA({ b: 1024 });
const publicKey = key.exportKey("public");
const privateKey = key.exportKey("private");
```

### 2.2 生成 license

```javascript
const randomString = require("random-string");
const Utf8 = require("crypto-js/enc-utf8");
const AES = require("crypto-js/aes");
const ECB = require("crypto-js/mode-ecb");
const Pkcs7 = require("crypto-js/pad-pkcs7");
const authorization = {
  appid: argv.appid,
  issuedTime: parseInt(Date.now() / 1000), // 授权时间，如果需要也可以添加过期时间
  hardware: argv.hardware, //部署机器的唯一识别码，提前获取。需要在部署的系统中获取然后验证
  customerInfo: argv.info, // 其他信息
};
const aescfg = { mode: ECB, padding: Pkcs7 };
function getLicense(authorization, privateKey) {
  const aesKey = randomString({ length: 16 }); // 生成16位的随机字符串作为AES加密的密钥
  const encData = AES.encrypt(Utf8.parse(JSON.stringify(authorization)), Utf8.parse(aesKey), aescfg).toString(); // 使用AES加密算法对授权信息进行加密
  const encDataLength = encData.length.toString(16);
  const key = new NodeRSA(privateKey, "pkcs1-private-pem");
  const sign = key.sign(encData, "base64", "base64"); // 使用私钥对加密后的授权信息进行签名
  const license = aesKey + encDataLength + encData + sign; // 签名后的license
  return license;
}
```

### 2.3 验证 license

```javascript
function checkLicense(license, publicKey) {
  try {
    const aesKey = Utf8.parse(license.substring(0, 16));
    const encDataLength = parseInt(license.substring(16, 18), 16);
    const encData = license.substring(18, 18 + encDataLength);
    const sign = license.substring(18 + encDataLength);
    const key = new NodeRSA(publicKey, "pkcs8-public-pem");
    if (!key.verify(encData, sign, "base64", "base64")) {
      return false;
    }
    const data = JSON.parse(AES.decrypt(encData, aesKey, aescfg).toString(Utf8));
    console.log("data", data);
    return true;
  } catch (error) {
    return false;
  }
}
```

### 源代码

https://github.com/houxiaozhao/licenseAuthorization
