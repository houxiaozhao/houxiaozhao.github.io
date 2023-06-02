---
title: 华为云functiongraph部署python flask docker镜像
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2023-06-02 14:48:38
tags: python flask
---

> 华为云 functiongraph 可以部署 docker 容器镜像。 现在要把 python flask 项目部署到 functiongraph 上。

> 主要是 Post 请求的 Data 编码问题

## 创建函数

- 选择容器镜像
- 选择 HTTP 函数
- 输入名称和镜像地址
- 创建委托

以上都可以在华为云的教程上看到，这里就不再赘述了。[华为云教程](https://support.huaweicloud.com/qs-functiongraph/functiongraph_04_0103.html)

## 构建镜像

flask 代码和构建镜像的方式可以看[这里](https://www.freecodecamp.org/news/how-to-dockerize-a-flask-app/)

## Post 方法的 Data 编码问题

华为云的 functiongraph 的 Post 方法的 Data 要求是 Base64 编码的，所以要在代码中对 Data 进行 Base64 编码。

- 先获取到原始内容`request.get_data().decode('utf-8')`
- 再对内容进行 Base64 编码`base64.b64decode(request.get_data().decode('utf-8')`
- 然后将内容转换为字符串`base64.b64decode(request.get_data().decode('utf-8')).decode('utf-8')`
- 最后在转为 json`json.loads(base64.b64decode(request.get_data().decode('utf-8')).decode('utf-8')))`

解析成 json 后就可以按照正常的方式获取到数据了。

## 容器启动 CMD

![vPS3S7](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/02/vPS3S7.png)

文档上写的 CMD 的内容是字符串数组，在这里不要添加中括号和引号，直接写字符串用都好隔开就可以了。`python,app.py`
