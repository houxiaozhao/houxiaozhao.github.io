---
title: 系统离线license验证的方法
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2024-05-10 10:12:17.0
url: /archives/系统离线license验证的方法
categories:
tags:
  - 物联网 MQTT WAMP
---

> 为了解决系统私有化部署，完全离线的情况下，如何验证 license 的问题。 需要考虑以下几个方面：
>
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
