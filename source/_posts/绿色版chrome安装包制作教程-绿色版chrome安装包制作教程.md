---
title: Chrome浏览器绿色版制作：从下载到打包的详细步骤
date: 2018-02-25 15:16:06.0
categories:
  - 软件教程
  - 浏览器定制
  - 工具分享
tags:
  - Chrome浏览器
  - 绿色软件
  - 便携版
  - Setup Factory
  - 软件打包
  - 浏览器定制
  - GreenChrome
  - 软件安装
keywords:
  - Chrome绿色版
  - 便携版Chrome
  - 浏览器定制
  - GreenChrome插件
  - Setup Factory打包
  - Chrome便携化
  - 软件打包教程
  - 浏览器优化
  - Chrome安装包
  - 绿色软件制作
  - 浏览器设置
  - 软件便携化
  - Chrome定制版
  - 离线安装包
  - 软件封装
description: |
  本文详细介绍了制作Chrome浏览器绿色便携版的完整流程。首先提供了所需资源的下载链接，包括Chrome离线安装包、GreenChrome插件等。接着详细说明了绿色版Chrome的制作步骤，从安装包解压、文件配置到插件整合的每个环节。文章还包含了浏览器首页设置的具体操作方法。重点介绍了使用Setup Factory制作安装包的详细过程，包括软件安装、注册、项目创建、文件配置等关键步骤，并提供了图文说明。最后展示了如何设置安装包图标、生成最终的便携版安装程序。整个教程注重实用性和可操作性，帮助用户轻松创建个性化的Chrome便携版。

  This article provides a detailed guide on creating a portable version of Google Chrome browser. It begins with providing download links for necessary resources, including Chrome offline installer and GreenChrome plugin. The article then explains the step-by-step process of creating a portable Chrome version, covering everything from package extraction and file configuration to plugin integration. It includes specific instructions for setting up the browser's homepage. The main focus is on the detailed process of creating an installation package using Setup Factory, including software installation, registration, project creation, and file configuration, complete with visual instructions. Finally, it demonstrates how to set up the installation package icon and generate the final portable installation program. The entire tutorial emphasizes practicality and operability, helping users easily create a personalized portable version of Chrome.
---

## 教程

- Google Chrome 下载地址https://api.shuax.com/tools/getchrome
- 插件下载https://shuax.com/portfolio/greenchrome/
- 便携化教程 https://bbs.kafan.cn/thread-1696230-1-1.html
- 安装包制作工具 http://www.jz5u.com/Soft/apply/other/170453.html
- 安装包制作教程 https://www.cnblogs.com/wuhuacong/p/6101853.html
  <!--more-->

### 制作绿色版 Chrome

1. 下载 google Chrome 离线安装包
2. 解压该安装包.exe，再解压.7z 得到 chrome-bin
3. 修改文件夹名称为 Chrome
4. 下载插件 得到 greenChrome ,解压。
5. 把文件夹内的 GreenChrome.ini 和 winmm.dll 一块放在 Chrome 文件夹下。（自行选择 64 位或 32 位与第一步下载的离线安装包对应。已经下载好的是 64 位 Chrome 安装包）
6. 把文件夹内的 favicon.ico 复制到 Chrome
7. 打开 Chrome 文件夹下的 chrome.exe 文件

### 设置首页

1. 在 chrome 内，点击右上角三个点，再点设置
2. 拖到最下边，选择`打开特定网页或一组网页`
3. 点击添加新网页
4. 输入想要打开的网址
5. 点击确定完成

### 安装 setupfactory

1. 安装 Setup Factory v9.1 英文原版.exe
2. 注册码 SUF-BMDP-F2NS-GN82-FS3J
3. 安装完成后。在桌面打开 Setup Factory
4. 创建一个新 project
5. 输入公司名/标题/版本号/公司网址 下一步
6. 选择 64-bit 下一步
7. 选择 Chrome 文件夹 下一步
8. 选择样式 ，随意， 下一步
9. 选择样式，随意，下一步
10. 找到 Chinese(Simplified)并选择。下一步
11. 不用选，下一步
12. 再点击完成

### 制作安装包

1. 在软件界面，选择 chrome.exe 右键，选择 file properties
2. 选择 Shortcuts 选项卡
3. ![](https://i.loli.net/2018/10/26/5bd26396688d5.png)
4. Icon 部分，点击 Custom 点击 Browse 选择 `%AppFolder%\favicon.ico`
5. 点击确定
6. 点击菜单 publish，点击 build,会弹出一个框，直接点 next
7. 然后点击 Browser 选择桌面
8. 输入文件名称 （安装包名称）
9. 点击 next 等几分钟后。
10. build 完成后点击完成。在桌面就会出现一个安装包文件。双击就可以安装了。
