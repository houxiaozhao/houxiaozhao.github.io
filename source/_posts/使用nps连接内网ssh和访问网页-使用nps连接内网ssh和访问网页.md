---
title: 使用nps连接内网ssh和访问网页
date: 2022-01-19 10:33:46.494
updated: 2022-03-04 19:16:53.9
url: /archives/使用nps连接内网ssh和访问网页
categories:
tags:
  - 内网穿透
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
