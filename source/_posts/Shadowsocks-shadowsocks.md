---
title: Shadowsocks
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2021-08-20 11:16:26.0
updated: 2022-03-08 11:26:53.493
url: /archives/shadowsocks
categories:
tags:
  - 不可描述
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
