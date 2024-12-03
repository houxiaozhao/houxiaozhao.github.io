---
title: postman模拟qq登录
date: 2019-10-16 10:07:26.0
categories:
tags:
  - postman
  - qq
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
