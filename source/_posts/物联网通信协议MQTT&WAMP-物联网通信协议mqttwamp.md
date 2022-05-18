---
title: 物联网通信协议MQTT&WAMP
date: 2017-10-23 12:12:17.0
updated: 2022-03-08 10:43:16.186
url: /archives/物联网通信协议mqttwamp
categories: 
tags: 
- 物联网 MQTT WAMP
---



### 物联网通信协议 MQTT&WAMP

#### 一、物联网层次结构

##### 1.百度云架构

![百度云物联网架构](https://doc.bce.baidu.com/bce-documentation/IOT/overview_01.png)

  <!--more-->

##### 2.技术层架构

![硬件技术层通信架构](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539402648576&di=6ed421d80ee289e786668d22e8ea57b5&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D1948897941%2C3581956780%26fm%3D214%26gp%3D0.jpg)

百度云、腾讯云、阿里云和其他物联网云厂商等，基本完全支持：MQTT+HTTP+WEBSOCKET+CoAP

#### 二、MQTT：http://mqtt.org/

1. [MQTT 是什么](https://www.jianshu.com/p/a7599ae21d4a)

2. [应用场景](https://www.jianshu.com/p/d726663efaa9)

3. 如何实现 MQTT 应用实例：
   [安装 mqtt 服务](https://github.com/mqtt/mqtt.github.io/wiki/servers)：常用的 Rabbitmq 开启 mqtt 服务；安装 emqtt；

   [使用 MQTT 测试客户端进行简单测试](https://blog.csdn.net/swedenfeng/article/details/53510048)

   自己动手编程，实现 mqtt 收发

   ```
   recv1:mosquitto_sub -h localhost -u wugeek -P 111111 -t "xingtai"
   recv2:mosquitto_sub -h localhost -u wugeek -P 111111 -t "handan"

   send:
   mosquitto_pub -h localhost -u wugeek -P 111111 -t "xingtai" -m "hello邢台"

   mosquitto_pub -h localhost -u wugeek -P 111111 -t "xingtai" -m "邯郸天气真冷"
   ```

4. 总结：想要深入学习 mqtt，直接看官方的 mqtt 协议！看懂协议，就明白代码为什么这么写!

#### 三、WAMP：https://crossbar.io/

1.[wamp 是什么](https://wamp-proto.org/)

2.应用场景：ws，与 web 端双向实时消息传递;后台服务与前端页面实时通信

3.如何实现 wamp 应用实例：安装服务，写代码测试

4.总结：wamp(不是 Windows+Apache+Mysql+PHP,之前在国内没有看到相应的应用，比较新)

#### 四、mqtt 与 wamp 的区别

mqtt：物联网硬件简单的通信协议，数据量小，通信代价小

wamp：后台服务与 web 端实现双向实时通信，使用 topic 方式进行订阅和发送简单方便

#### 五、硬件协议解析

1.单片机 MCU ：处理能力小，内存小，存储小 总之什么都小！

2.所以开发的时候尽量要使用最小的代价实现应用

3.发的、收的数据尽量小

json 格式应用在硬件通信上面好不好?