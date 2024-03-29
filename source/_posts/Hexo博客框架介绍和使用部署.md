---
title: Hexo博客框架介绍和使用部署
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2023-01-30 17:15:06
tags:
---

> 官网介绍：快速、简介且高效的博客框架

> 基于 Node.js 的静态博客框架，可以方便的生成静态网页托管在 GitHub 上

#### 特点

1.  速度很快，上百个页面在几秒内完成渲染
2.  一键部署，可以链接 github，一键部署到 github page
3.  插件和可扩展

## 快速开始

#### 安装

- 安装 hexo 命令行工具

  npm install hexo-cli -g

- 使用命令行工具初始化

  hexo init blog

- 安装依赖

  npm install

- 运行

  hexo server

![qE8uZj](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/qE8uZj.png)

#### 配置网站信息

打开\_config.yml

可以配置网站标题、作者、语言等。

#### 新建一篇文章

使用命令

    hexo new <title>

然后在 source/\_posts 目录下会生成一个 md 文档

#### 生成静态网页

    hexo generate

会生成在 public 目录下，直接部署该目录到服务器或其他位置即可

也可以上传到 github 上，利用 github page 做一个免费的网站

1.  创建一个仓库名字是<username>.github.io ![vmx7ie](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/vmx7ie.png)
2.  然后在 setting->pages 中设置![uQacfl](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/uQacfl.png)
3.  把静态网页传到 github 上。
4.  [**https://<username>.github.io/**](https://houxiaozhao.github.io/)
5.  **进阶：**

    1.  **使用 github 的 workflow 功能自动编译生成，变以后自动更新静态页面到其他分支，然后在 pages 设置其他分支**
    2.  **因为 github 经常会不通。可以使用**cloudflare**进行加速。利用 cloudflare pages 功能，直接自动部署到 cloudflare 上。会给一个免费的域名可以访问**<username>-github-io.pages.dev **​**![saaCp9](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/saaCp9.png)
    3.  **使用自己的域名 DNS 配置 CNAME 到免费域名**![FENI8H](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/FENI8H.png)

#### 使用主题

在 github 上找到想要的主题([https://github.com/search?q=hexo+theme](https://github.com/search?q=hexo+theme))，然后把主题下载下来，放到 themes 文件夹

##### 举个例子[https://github.com/theme-next/hexo-theme-next](https://github.com/theme-next/hexo-theme-next)

1.  安装主题

    cd hexo
    git clone https://github.com/theme-next/hexo-theme-next themes/next

2.  配置主题  _config.yml

    theme: next

![OCcFnT](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/OCcFnT.png)
