---
title: strapi介绍
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2023-01-12 18:22:05
tags:
  - 后端
  - nodejs
  - strapi
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
6.  支持多种数据库![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/P4maOg7YjYXVOWNX/img/ba02f997-6384-4260-a0ed-a087dff9c758.png)

### 快速开始

#### 安装

需要有 node 环境，一句命令即可安装,

    yarn create strapi-app my-project --quickstart
    npx create-strapi-app@latest my-project

安装完成后会自动打开网页[http://localhost:1337/admin/auth/register-admin](http://localhost:1337/admin/auth/register-admin)

#### 注册管理员用户  

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/P4maOg7YjYXVOWNX/img/c98f93fd-9e6b-423c-950e-ce09b129c6d9.png)

#### 构建内容

根据自己业务需求，构建一个数据结构，就相当于在数据库定义表结果

点击**Content-Type Builder**，然后**Create a collection type**

#### 添加内容

在**Content Manager**菜单中添加对应的内容

#### 设置权限

**Setting-Roles**菜单设置权限

#### 测试接口

**Documentation 菜单可以查看接口文档，打开后可以进行接口测试**
