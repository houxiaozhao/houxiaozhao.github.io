---
title: 使用Nodejs对Minio对象存储中图片压缩
date: 2023-02-03 9:39:18.0
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
tags:
  - minio
  - Nodejs
---

> 利用 Minio 的通知功能，在有图片上传后，通知到 Nodejs 服务，压缩图片再上传

## 项目地址

https://github.com/houxiaozhao/minio-compresses-images

## 主要使用的库

- minio - Minio 的 Nodejs 客户端
- sharp - 图片压缩库
- koa - Nodejs 的 web 框架
- bull - Nodejs 的队列库

## 流程

![a2cD9s](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/a2cD9s.jpg)

因为 sharp 的处理图片速度比较慢，所以使用了队列，将图片压缩的任务放到队列中，然后再从队列中取出任务，进行压缩。

## 主要压缩的代码

```js
const minioClient = new minio.Client(config.minio);
console.time(job.id + "流处理时间");
const readable = await minioClient.getObject(bucket, key);
const pipeline = sharp({ unlimited: true, sequentialRead: true }).jpeg({ quality: config.quality });
readable.pipe(pipeline);
await minioClient.putObject(bucket, config.cover ? key : path.basename(key, path.extname(key)) + "_mini" + path.extname(key), pipeline, { "Content-Type": "image/jpeg", mini: "true" });
console.timeEnd(job.id + "流处理时间");
```

## 优化整个流程速度的几个重要的点

1. 使用流的方式读取图片，然后再写入到 Minio 中，这样可以减少内存的使用，不产生临时文件
2. sharp 添加 sequentialRead: true，这样可以让 sharp 顺序读取图片
3. 使用队列，将图片压缩的任务放到队列中，然后再从队列中取出任务，进行压缩，这样可以让压缩图片的任务不会阻塞其他任务
4. 不使用 docker 部署 minio，而是直接使用 minio 的二进制文件，这样可以减少网络延迟
5. 适当提高 bull 的并发数，这样可以让队列中的任务更快的被处理

## Minio 部署和配置

### Minio 部署

下载二进制文件，然后执行

```bash
MINIO_ROOT_USER=username MINIO_ROOT_PASSWORD=password minio server /data/minio --console-address ":9001"
```

### 使用 minio 中的 listenBucketNotification 功能监听

不需要配置通知，直接使用 listenBucketNotification 功能监听

```javascript
let poller = minioClient.listenBucketNotification(config.minio.bucket, "", "", ["s3:ObjectCreated:Put"]);
```

### ~~Minio 配置通知 Notification~~

1. ~~点击`Add Notification Target`~~
   ![tDIPYO](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/tDIPYO.png)
2. ~~有很多通知类型，我们选择`Webhook`~~
   ![E43e23](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/E43e23.png)
3. ~~填写`Webhook`的地址，这里填写的是 Nodejs 服务的地址,其他留空即可~~
   ![zlIxax](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/zlIxax.png)
4. ~~保存~~

### 创建和配置存储桶

1. 点击`Create Bucket`
   ![gwYWn3](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/gwYWn3.png)
2. 起一个名字，其他不用改
3. ~~创建成功后，点击刚创建的存储桶，然后点击`Event`,最后点击`Subscribe to Event`~~
   ![k1Zbnd](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/k1Zbnd.png)
4. ~~RAN 里选择 webhook,其他看情况修改,最后点击`Save`~~
   ![9NzU5c](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/02/03/9NzU5c.png)

## Nodejs 服务部署和配置

### 安装依赖

```bash
npm install
```

### 配置

```js
// config.js
module.exports = {
  redis: {
    port: 6379,
    host: "localhost",
  },
  minio: {
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    secretKey: "xxx",
    accessKey: "xxx",
  },
  quality: 30, // 图片质量
  cover: false, // 是否覆盖原图,默认不覆盖在原图名字后面加上_mini
  bull_concurrency: 1, // bull任务并发数
};
```

### 启动

```bash
node app.js
```
