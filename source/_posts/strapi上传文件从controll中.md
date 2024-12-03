---
title: strapi 从 controller 中上传文件
date: 2023-07-06 18:22:05
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
tags:
  - 后端
  - nodejs
  - strapi
---

官网中关于上传文件的介绍只介绍了如何在前端上传文件，但是在后端上传文件的需求也是很常见的，比如在 controller 中上传文件。

### 上传文件

在 controller 或 service 中上传文件，需要使用 strapi 的 service 中的 upload 方法，具体使用方法如下：

```js
import fse from "fs-extra";
import path from "path";
import os from "os";
//需要把文件放到临时文件夹中
const tmpWorkingDirectory = await fse.mkdtemp(path.join(os.tmpdir(), "strapi-upload-"));
const fileName = Date.now() + ".jpg"; // 根据实际情况修改文件名
const tmpFilePath = path.join(tmpWorkingDirectory, fileName); // 根据实际情况修改文件名
await fse.writeFile(tmpFilePath, data); //data 为文件的二进制数据
const files = await strapi
  .plugin("upload")
  .service("upload")
  .upload({
    data: { fileInfo: { name: fileName, folder: null } },
    files: {
      // 这个位置不需要传入 File 对象。
      path: tmpFilePath,
      name: fileName,
      type: "image/jpeg", //根据实际情况修改文件类型
      size: fse.statSync(tmpFilePath).size,
    },
  });
```

这个地方最坑就是 files 参数 。

在插件的源码中此处传入的时 req 中的 files。但是如果文件不是从前端传入的，那么需要自己构造一个 File 对象。而在后端构建 File 对象还很麻烦。用了很多方法都不太行。再研究源码后，发现可以手动构建 File 对象，只需要包含几个参数即可。
