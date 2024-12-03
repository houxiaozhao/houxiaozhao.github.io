---
title: 使用Postman模拟QQ登录：步骤与技巧
date: 2019-10-16 10:07:26.0
categories:
  - 网络安全
  - 软件测试
  - Web开发
tags:
  - postman
  - qq
  - API测试
  - 网络协议
  - 安全测试
  - 模拟登录
  - network analysis
  - cookies management
  - HTTP requests
  - authentication simulation
keywords:
  - Postman模拟QQ登录
  - QQ登录过程分析
  - API测试技巧
  - 网络请求模拟
  - Cookie管理
  - 安全测试方法
  - 网络协议分析
  - HTTP请求头操作
  - 客户端密钥获取
  - 登录流程模拟
description: |
  本文详细介绍了如何使用Postman工具模拟QQ登录过程，涵盖了从获取本地QQ客户端信息到成功模拟登录的全过程。文章深入分析了QQ登录的网络请求流程，包括获取用户信息、处理Cookies、获取头像信息以及客户端密钥的获取方法。通过逐步讲解每个关键步骤，读者可以深入理解网络协议分析、HTTP请求模拟和安全测试的实际应用。本教程不仅适用于网络安全爱好者和软件测试工程师，也为Web开发人员提供了宝贵的API测试经验。通过实践本文的方法，读者将掌握使用Postman进行复杂登录流程模拟的技能，提高对网络安全和API测试的理解。

  This article provides a detailed guide on simulating the QQ login process using Postman, covering the entire procedure from obtaining local QQ client information to successfully simulating the login. It offers an in-depth analysis of QQ's login network request flow, including user information retrieval, cookie handling, avatar information acquisition, and client key obtainment methods. By explaining each crucial step, readers can gain a deep understanding of network protocol analysis, HTTP request simulation, and practical applications in security testing. This tutorial is valuable for network security enthusiasts, software testers, and web developers, offering essential insights into API testing. By following the methods outlined in this article, readers will master the skills of simulating complex login processes using Postman, enhancing their understanding of network security and API testing techniques.
---

1. 登录 pc 端的 QQ 客户端 使用 chrome 浏览器，打开 qq 空间，使用快速登陆方式。安装 postman 扩展 获取当前电脑登录用户信息 在 Network 总找到https://localhost.ptlogin2.qq.com:4301/pt_get_uins开头的地址。
   ![aa80WA](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/aa80WA.png)
2. 请求本地 4301 服务，获取信息。 在 postman 中模拟这一请求  
   ![R9DImx](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/R9DImx.png)
3. 然后会保存大概 20 个 cookies，这些 cookies 好像有用。 这一部，好像没什么用~~~
4. 获取用户头像信息
   network 中https://ssl.ptlogin2.qq.com/getface?开头的地址
   ![u5ue2k](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/u5ue2k.png)  
   ![3eQORw](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/3eQORw.png)
5. 获取 clientkey 在选中 network 中的 Preserve Log 清空所有请求 点击需要登录的用户头像，进行登录 |
   找到第一个请求，或者是 pt_get_st  
    ![xOkAJP](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/xOkAJP.png)
   在 postman 中模拟这一请求  
    ![Yyqayv](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/Yyqayv.png)
   可以看的 cookies 中多了两个，其中就有 clientkey |
   ![2lqvEt](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/2lqvEt.png)

6. 跳转到已登陆状态 在 network 中 jump 开头的地址。  
    ![YokTM4](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/YokTM4.png)
   可以看的在响应头中 set 了很多的 cookie
   在 postman 中模拟这一操作  
    ![zmJx9b](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/zmJx9b.png)
   返回了一个地址，并且 cookies 添加了很多个。 复制下来这个地址。在 postman 中 get 一下  
   ![VfVOH5](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/VfVOH5.png)
   激动人心的时候来了 可以看到登录成功字样。登录成功其实就是一种状态，在浏览器中保存着 token 等信息。
7. 最后一步，postman 中直接打开其他人空间
   ![wrI6S0](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/06/13/wrI6S0.png)
   这时候就已经进入到其他人的空间，可以看到空间内容。
8. 总的来说，整个流程就是在 postman 中模拟浏览器行为。进行登录。其中还有很多重要的参数没有搞明白。
