---
title: Strapi文件上传指南：从控制器实现服务器端上传
date: 2023-07-06 18:22:05
categories:
  - 后端开发
  - 内容管理系统
tags:
  - 后端
  - nodejs
  - strapi
  - file upload
  - content management
  - server-side
  - controller
keywords:
  - Strapi文件上传
  - 控制器上传文件
  - Node.js后端开发
  - Strapi CMS
  - 服务器端文件处理
  - 内容管理系统
  - Strapi服务
  - 文件系统操作
  - 临时文件处理
  - 后端文件上传实现
description: |
  本文深入探讨了如何在Strapi内容管理系统的控制器中实现文件上传功能。文章详细介绍了使用Node.js文件系统模块、Strapi提供的上传服务，以及临时文件处理技术来实现服务器端文件上传的过程。适合后端开发者和Strapi使用者阅读，提供了实用的代码示例和最佳实践建议。

  This article provides an in-depth guide on implementing file uploads within Strapi CMS controllers. It covers the use of Node.js file system modules, Strapi's upload service, and temporary file handling techniques to achieve server-side file uploads. Ideal for backend developers and Strapi users, offering practical code examples and best practice recommendations.
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
