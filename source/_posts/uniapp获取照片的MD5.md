---
title: uniapp 的 Android 端获取照片的MD5
date: 2023-09-26 18:22:05
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
tags:
  - uniapp
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
