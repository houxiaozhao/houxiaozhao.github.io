---
title: 绿色版chrome安装包制作教程
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-02-25 15:16:06.0
updated: 2022-03-08 10:43:13.659
url: /archives/绿色版chrome安装包制作教程
categories:
tags:
  - chrome
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
