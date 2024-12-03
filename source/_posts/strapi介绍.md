---
title: Strapi构建灵活高效的Headless CMS系统
date: 2023-01-12 18:22:05
categories:
  - 后端开发
  - 内容管理系统
tags:
  - 后端
  - nodejs
  - strapi
  - Headless CMS
  - API开发
  - 内容管理
  - Backend Development
  - Content Management
  - JavaScript
keywords:
  - Strapi
  - Headless CMS
  - Node.js
  - API开发
  - 内容管理系统
  - 后端开发
  - JavaScript框架
  - RESTful API
  - GraphQL
  - 自定义内容类型
  - 权限管理
  - 插件系统
  - 开源项目
  - 前后端分离
  - 快速开发
description: |
  本文深入探讨了Strapi这一强大的开源Headless CMS系统。Strapi基于Node.js开发，为开发者提供了灵活的内容管理解决方案。文章详细介绍了Strapi的核心特性，包括其快速搭建能力、RESTful和GraphQL API支持、自定义内容类型、强大的权限管理系统以及丰富的插件生态。我们还分析了Strapi在现代Web开发中的应用场景，如何与前端框架无缝集成，以及它如何简化后端开发流程。通过使用Strapi，开发者可以显著提高项目开发效率，实现内容的灵活管理和API的快速构建。无论是构建网站、移动应用还是复杂的企业级系统，Strapi都能提供强大的后端支持。本文旨在帮助读者全面了解Strapi，掌握其使用方法，从而在实际项目中充分发挥Strapi的优势。

  This article delves into Strapi, a powerful open-source Headless CMS system. Built on Node.js, Strapi offers developers a flexible content management solution. The article details Strapi's core features, including its rapid setup capabilities, support for RESTful and GraphQL APIs, customizable content types, robust permission management system, and rich plugin ecosystem. We also analyze Strapi's applications in modern web development, how it seamlessly integrates with front-end frameworks, and how it simplifies backend development processes. By using Strapi, developers can significantly improve project development efficiency, achieve flexible content management, and rapidly build APIs. Whether constructing websites, mobile applications, or complex enterprise-level systems, Strapi provides powerful backend support. This article aims to help readers comprehensively understand Strapi, master its usage, and fully leverage its advantages in practical projects.
---

> 官网介绍：开源的 Headless CMS，100%  的 javascript  和完全可定制化

> CMS：内容管理系统，比如 WordPress

> Headless CMS :无头   内容管理系统。内容仅通过 API 进行访问，而不需要内置前端。

可以用来创建网站，APP，API 等，可以用作后端系统管理内容，也可以配合 Vue、React 等前端技术结合使用。

即使不了解后端开发技术，也可以创建 API 接口

#### 特点

1.  使用一个命令就可以生成后端 restfull api 服务，除了 rest，甚至还支持 graphQL API

    yarn create strapi-app my-project --quickstart

2.  可以在内置的后端管理界面对数据库进行管理。添加表后自动生成对应增删改查接口
3.  内置的权限系统，全部数据都由权限系统控制
4.  插件化，内置基本插件：内容管理器，api 文档，媒体库，角色权限等
5.  自定义 API，可以使用 JavaScript 自定义 API
6.  支持多种数据库![e5AmI6](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/e5AmI6.png)

### 快速开始

#### 安装

需要有 node 环境，一句命令即可安装,

    yarn create strapi-app my-project --quickstart
    npx create-strapi-app@latest my-project

安装完成后会自动打开网页[http://localhost:1337/admin/auth/register-admin](http://localhost:1337/admin/auth/register-admin)

#### 注册管理员用户  

![W2OpTh](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2023/09/04/W2OpTh.png)

#### 构建内容

根据自己业务需求，构建一个数据结构，就相当于在数据库定义表结果

点击**Content-Type Builder**，然后**Create a collection type**

#### 添加内容

在**Content Manager**菜单中添加对应的内容

#### 设置权限

**Setting-Roles**菜单设置权限

#### 测试接口

**Documentation 菜单可以查看接口文档，打开后可以进行接口测试**
