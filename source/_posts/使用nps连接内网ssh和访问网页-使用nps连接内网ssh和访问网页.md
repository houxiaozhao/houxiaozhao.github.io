---
title: NPS内网穿透：SSH远程连接与Web访问实践方案
date: 2022-01-19 10:33:46.494
categories:
  - 网络技术
  - 系统运维
  - 安全访问
tags:
  - NPS
  - 内网穿透
  - SSH远程
  - Web代理
  - Docker部署
  - 网络安全
  - 系统配置
  - 远程访问
keywords:
  - NPS服务器
  - NPC客户端
  - 内网穿透
  - SSH连接
  - TCP隧道
  - SOCKS代理
  - Docker部署
  - 远程访问
  - Web代理
  - 网络配置
  - 安全访问
  - SwitchyOmega
  - 浏览器代理
  - 网络穿透
  - 系统运维
description: |
  本文详细介绍了使用NPS（NPS/NPC）实现内网穿透的完整解决方案。首先讲解了NPS服务端的安装部署过程，包括下载、安装、配置文件修改等关键步骤。接着详细说明了NPC客户端的部署方法，提供了传统安装和Docker容器化两种部署方案，并提供了完整的docker-compose配置文件示例。文章重点阐述了TCP隧道和SOCKS代理的配置过程，包括端口设置、目标配置等具体操作步骤。最后介绍了通过SwitchyOmega浏览器插件配置代理访问内网网站的方法，包括情景模式创建和自动切换规则设置。每个配置步骤都配有详细的截图说明，便于读者实际操作。

  This article provides a comprehensive guide to implementing internal network penetration using NPS (NPS/NPC). It begins with a detailed explanation of the NPS server installation and deployment process, including downloading, installation, and configuration file modifications. The article then details the NPC client deployment methods, offering both traditional installation and Docker containerization approaches, complete with docker-compose configuration file examples. It focuses on the configuration process of TCP tunnels and SOCKS proxies, including port settings and target configurations. The guide concludes with instructions on configuring proxy access to intranet websites using the SwitchyOmega browser plugin, covering scenario mode creation and automatic switching rule settings. Each configuration step is accompanied by detailed screenshots for practical implementation. The article serves as a complete reference for setting up secure remote access to internal networks, making it valuable for system administrators and network engineers.
---

## 安装 NPS

> NPS 是提供服务的一个程序，需要安装在有外网 IP 的服务器上。
> https://github.com/ehang-io/nps/releases

[点击查看安装教程](https://ehang-io.github.io/nps/#/run?id=%e5%90%af%e5%8a%a8)

```shell
sudo ./nps install
sudo chmod +x nps
sudo nps start
```

编辑配置文件

```
vim /etc/nps/conf/nps.conf
```

运行成功后打开 nps 后台管理界面登录
创建一个客户端，填个名字，其他默认，点击创建。
![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/jNwwDD.png)
点击加号＋，展开可以看到一个客户端命令，复制。

## 安装 NPC

> NPC 客户端，安装在需要被穿透的内网环境下
> https://github.com/ehang-io/nps/releases

客户端下载下来进入到下载的目录，把复制的客户端命令粘贴运行即可。

### docker-compose 运行

**docker-compose.yml**

```yml
version: "3"
services:
  eapinpc:
    image: ${NPC_IMAGE}
    container_name: eapinpc
    restart: always
    network_mode: "host"
    command:
      - -server
      - ${NPC_SERVICE}
      - -vkey
      - ${NPC_KEY}
```

**.env**

```.env
# NPC 的 key 部署新机器需要重新生成
NPC_KEY=keykeykeykeykey
# NPC服务地址
NPC_SERVICE=ip地址:端口
NPC_IMAGE=ffdfgdfg/npc:v0.26.10
```

## 配置 TCP 隧道和 SOCKS 代理

### TCP 隧道

PNS 管理界面，点击客户端后的隧道，点击新增

- 使用场景 TCP 隧道
- 服务端端口 随便写，可能需要提前打开服务器的防火墙或者配置安全组。
- 目标 127.0.0.1:22 需要提前在被控机器上安装 ssh-server

### SOCKS 代理

PNS 管理界面，点击客户端后的隧道，点击新增

- 使用场景 SOCKS 代理
- 服务器端口 随便写，同上

配置完成后可以看到状态
![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/5flEft.png)
到此为止可以使用 ssh 连接到目标服务器。但是使用网页访问目标服务器上的网站还不行，需要浏览器使用代理访问内网网站。

## 安装浏览器插件

安装插件*SwitchyOmega*

1. 创建情景模式
   ![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/EiKr7s.png)
   选择代理服务器
2. 添加自动切换规则
   点击自动切换，然后添加条件
   ![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/8O5Jgw.png)
   - 条件设置为内网 ip 地址
   - 情景模式为刚才设置的情景模式
3. 配置默认情景模式
   最后在界面->切换设置->初试情景模式，选择自动切换，然后点击左下角**应用选项**
   ![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/2xd8HD.png)
   现在就可以通过在浏览器打开内网 ip 来访问内网的网页了。
