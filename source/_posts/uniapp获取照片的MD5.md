---
title: uniapp 的 Android 端获取照片的MD5
date: 2023-09-26 18:22:05
categories:
  - 移动应用开发
  - 跨平台开发
tags:
  - uni-app
  - Android开发
  - 文件处理
  - MD5计算
  - 跨平台开发
  - JavaScript
  - Base64
  - 移动端开发
keywords:
  - uni-app照片处理
  - Android文件MD5
  - spark-md5使用
  - FileReader替代方案
  - plus.io.FileReader
  - 移动端文件处理
  - Base64转换
  - uni-app Android开发
  - 图片MD5计算
  - 跨平台解决方案
description: |
  本文介绍了在uni-app Android端获取照片MD5值的实现方法。由于Android端缺少原生FileReader方法，文章详细讲解了如何使用plus.io.FileReader替代方案，结合spark-md5实现照片MD5值的计算。通过实际代码示例，展示了从照片读取、Base64转换到最终MD5计算的完整流程，为uni-app开发者提供了一个可靠的文件处理解决方案。

  This article demonstrates how to obtain MD5 values of photos in uni-app Android development. Due to the lack of native FileReader method on Android, it explains how to use plus.io.FileReader as an alternative solution, combined with spark-md5 for MD5 calculation. Through practical code examples, it shows the complete process from photo reading, Base64 conversion to final MD5 calculation, providing uni-app developers with a reliable file processing solution.
---

使用`spark-md5`这个包计算文件的 md5 值，但是在 Uniapp 安卓端没有 FileReader 这个方法。

可以利用 plus.io.FileReader 读取照片 base64 内容，然后再计算 md5

## 代码

```javascript
/**
 * 获取照片 md5
 */
function getMD5(path) {
  return new Promise((resolve, reject) => {
    plus.io.resolveLocalFileSystemURL(path, entry => {
      var fileReader = new plus.io.FileReader();
      fileReader.readAsDataURL(entry);
      fileReader.onloadend = function (evt) {
        // base64图片，比如：data:image/jpeg;base64,/9j/4AAQSkZ...
        var base64 = evt.target.result;
        //抽取DataURL中的数据部分，从Base64格式转换为二进制格式
        var bin = atob(base64.split(",")[1]); //atob解码
        // 利用 Spark MD5 计算MD5值
        var sparkMD5 = new SparkMD5();
        sparkMD5.appendBinary(bin); //载入数据
        var MD5 = sparkMD5.end();
        resolve(MD5);
      };
      fileReader.onerror = err => {
        reject(err);
      };
    });
  });
}
```

## 使用方法

```javascript
const { tempFiles } = await uni.chooseImage({
  sizeType: ["compressed"],
  sourceType: ["camera"],
});
const md5 = await this.getMD5(tempFiles[0].path);
console.log("md5", md5);
```
