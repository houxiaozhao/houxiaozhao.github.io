---
title: Hexo静态博客搭建与部署：从本地开发到云端发布
date: 2023-01-30 17:15:06
categories:
  - 静态博客
  - 网站搭建
  - 技术教程
tags:
  - Hexo
  - Node.js
  - 静态网站
  - GitHub Pages
  - Cloudflare
  - 博客搭建
  - 网站部署
  - 主题定制
  - 静态生成器
  - 开发教程
keywords:
  - Hexo博客框架
  - 静态网站生成器
  - GitHub Pages部署
  - Cloudflare加速
  - Node.js博客
  - 静态页面生成
  - 博客主题配置
  - 自动化部署
  - 域名配置
  - 网站性能优化
  - 博客系统搭建
  - 开源博客框架
  - 个人网站搭建
  - 静态内容部署
  - 网站自动化
description: |
  本文详细介绍了基于Node.js的Hexo静态博客框架的搭建与部署流程，从本地开发到云端发布的全过程：

  1. Hexo框架核心特性：
     - 高效的静态页面生成能力
     - 基于Node.js的技术架构
     - 强大的插件扩展系统
     - 灵活的主题定制功能
     - 便捷的部署集成方案

  2. 环境搭建与基础配置：
     - Node.js环境准备
     - Hexo命令行工具安装
     - 项目初始化流程
     - 依赖包管理
     - 本地开发服务器配置
     - 网站基本信息设置

  3. 内容创作与管理：
     - 文章创建与编辑
     - Markdown语法支持
     - 静态资源管理
     - 文章分类与标签
     - 页面布局设置

  4. 部署与优化策略：
     - GitHub Pages配置
     - 自动化部署工作流
     - Cloudflare CDN加速
     - 自定义域名绑定
     - 性能优化方案

  This article provides a comprehensive guide to setting up and deploying a Hexo static blog, from local development to cloud publishing:

  1. Hexo Framework Core Features:
     - Efficient static page generation
     - Node.js-based architecture
     - Powerful plugin extension system
     - Flexible theme customization
     - Convenient deployment integration

  2. Environment Setup and Basic Configuration:
     - Node.js environment preparation
     - Hexo CLI tool installation
     - Project initialization process
     - Dependency management
     - Local development server setup
     - Website basic information settings

  3. Content Creation and Management:
     - Article creation and editing
     - Markdown syntax support
     - Static resource management
     - Article categories and tags
     - Page layout settings

  4. Deployment and Optimization Strategies:
     - GitHub Pages configuration
     - Automated deployment workflow
     - Cloudflare CDN acceleration
     - Custom domain binding
     - Performance optimization solutions
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

2.  配置主题    _config.yml

    theme: next

![OCcFnT](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/OCcFnT.png)
