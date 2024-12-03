---
title: Shadowsocks服务器搭建与客户端配置教程
date: 2021-08-20 11:16:26.0
categories:
  - 网络工具
  - 科学上网
  - 服务器配置
tags:
  - Shadowsocks
  - VPN
  - 代理服务器
  - 网络安全
  - 服务器部署
  - 科学上网工具
  - 跨境网络访问
  - Internet Freedom
  - Encryption
  - Privacy Protection
keywords:
  - Shadowsocks安装
  - SS服务器配置
  - 科学上网教程
  - VPN替代方案
  - 加密代理
  - 网络隐私保护
  - 跨国网络访问
  - 突破网络封锁
  - 自建VPN服务
  - 安全匿名上网
description: |
  本文详细介绍了Shadowsocks（SS）的服务器搭建和客户端配置过程。Shadowsocks是一种安全、高效的加密代理工具，广泛用于保护网络隐私和访问受限内容。文章首先解释了Shadowsocks的工作原理和优势，然后提供了在Linux服务器上安装SS服务端的步骤，包括选择合适的SS版本、设置密码、端口和加密方式。接着，文章讲解了如何配置各种设备的SS客户端，确保安全连接。此外，还探讨了Shadowsocks在网络安全、隐私保护和跨境通信中的应用，以及如何优化性能和解决常见问题。无论您是网络安全爱好者、需要安全访问国际网络的用户，还是关注数字隐私的个人，本文都能为您提供有价值的指导。

  This article provides a comprehensive guide on setting up Shadowsocks (SS) servers and configuring clients. Shadowsocks is a secure and efficient encrypted proxy tool widely used for protecting network privacy and accessing restricted content. The article begins by explaining the working principles and advantages of Shadowsocks, followed by step-by-step instructions for installing the SS server on Linux, including choosing the appropriate SS version, setting passwords, ports, and encryption methods. It then details how to configure SS clients on various devices to ensure secure connections. Additionally, the article discusses the applications of Shadowsocks in network security, privacy protection, and cross-border communication, as well as how to optimize performance and resolve common issues. Whether you're a network security enthusiast, a user needing secure access to international networks, or an individual concerned about digital privacy, this article provides valuable guidance.
---

# Shadowsocks

```bash
wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
chmod +x shadowsocks-all.sh
sudo ./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log
```

最后一步输完，你应该会看到下图中内容 ── 是要你选择需要安装的 Shadowsocks 版本。这里选择 4) shadowsocks-libev

![https://smalin.cn/assets/img/shadowsocks.e7c80b5a.jpeg](https://smalin.cn/assets/img/shadowsocks.e7c80b5a.jpeg)

选择完成后会让你输入密码，默认为一个随机密码，你可以回车选择默认，或者自定义一个密码后回车

![https://smalin.cn/assets/img/shadowsocks1.31adf884.jpeg](https://smalin.cn/assets/img/shadowsocks1.31adf884.jpeg)

密码设置完成后会让你输入一个端口号，默认随机一个，你也可以自定义一个端口号后回车生成

![https://smalin.cn/assets/img/shadowsocks2.76f449e9.jpeg](https://smalin.cn/assets/img/shadowsocks2.76f449e9.jpeg)

端口号设置完成后，选择一个加密方式，我一般采用 chacha20 来作为加密方式，手机上也是有这个模式的，比较方便，你也可以根据自己的喜好来选择不同的加密方式

![https://smalin.cn/assets/img/shadowsocks3.6fe63d36.jpeg](https://smalin.cn/assets/img/shadowsocks3.6fe63d36.jpeg)

设置完成后，会提示你是否需要安装 simple-obfs。这是 ss 的一个插件工具，可以起到混淆的作用，防止 IP 和端口被嗅探到，建议选 y 安装。

![https://smalin.cn/assets/img/shadowsocks4.07f0839f.jpeg](https://smalin.cn/assets/img/shadowsocks4.07f0839f.jpeg)

如果上一步选择了 y ，这里可以选择一种混淆方式。通常 TLS 要比 HTTP 的混淆效果更好，所以选 TLS

![https://smalin.cn/assets/img/shadowsocks5.e63c8cd1.jpeg](https://smalin.cn/assets/img/shadowsocks5.e63c8cd1.jpeg)

之后就耐心等待安装完成吧，安装完成后会给出你设置的密码、端口、服务器信息配置等，大功告成

![https://smalin.cn/assets/img/shadowsocks6.387d31fa.jpeg](https://smalin.cn/assets/img/shadowsocks6.387d31fa.jpeg)

记住红色的内容，也就是服务器 IP、服务器 ss 端口、你设的密码、混淆方式和加密方式。

## **[#](https://smalin.cn/views/article/Linux/shadowsocks.html#%E6%A3%80%E6%9F%A5%E5%92%8C%E9%85%8D%E7%BD%AE-shadowsocks)检查和配置 Shadowsocks**

查看是否开始运行

`/etc/init.d/shadowsocks-libev status`

如果出现类似  `Shadowsocks-libev is running...`  的字样，说明已经开始正常运行了。

修改相关配置

`vim /etc/shadowsocks-libev/config.json`

## **[#](https://smalin.cn/views/article/Linux/shadowsocks.html#%E5%AE%89%E8%A3%85%E5%AE%A2%E6%88%B7%E7%AB%AF-shadowsocks)安装客户端 Shadowsocks**

相比服务器端的安装，客户端的安装就简单了许多。首先，在**[这个页面](https://shadowsocks.org/en/download/clients.html)**找到并下载自己操作系统对应的客户端。

打开客户端，在「服务器设定」里新增服务器。然后依次填入服务器 IP、服务器端口、你设的密码和加密方式。

![https://smalin.cn/assets/img/shadowsocks7.7885095c.jpeg](https://smalin.cn/assets/img/shadowsocks7.7885095c.jpeg)
