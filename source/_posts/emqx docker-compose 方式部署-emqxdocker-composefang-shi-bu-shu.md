---
title: EMQX MQTT服务器：使用Docker Compose快速部署及Nginx反向代理配置
date: 2022-02-17 18:50:53.944
categories:
  - 消息中间件
  - Docker容器化
  - 系统部署
tags:
  - EMQX
  - Docker
  - MQTT
  - Docker Compose
  - Nginx
  - 消息队列
  - 物联网通信
  - 系统部署
  - 反向代理
  - 容器化部署
keywords:
  - EMQX部署
  - Docker Compose配置
  - MQTT服务器
  - Nginx反向代理
  - 容器化MQTT
  - EMQX认证配置
  - WebSocket配置
  - 物联网消息服务
  - EMQX环境变量
  - 服务器部署
  - 消息中间件
  - 微服务架构
  - IoT通信协议
  - 安全认证
  - 负载均衡
description: |
  本文详细介绍了如何使用Docker Compose快速部署EMQX MQTT消息服务器，并配置Nginx反向代理实现安全访问。文章涵盖了完整的部署流程，包括Docker容器配置、环境变量设置、端口映射、数据持久化等关键要素。

  在Docker Compose配置中，我们使用EMQX 4.2.14版本镜像，设置了必要的端口映射（1883用于MQTT协议，8083用于WebSocket连接），配置了时区同步，并通过环境变量启用了核心插件，包括emqx_recon（性能诊断）、emqx_retainer（消息保留）、emqx_management（管理API）和emqx_auth_username（用户名密码认证）。特别强调了安全性配置，禁用了匿名访问（ALLOW_ANONYMOUS=false），并支持通过环境变量配置用户名和密码。

  在Nginx反向代理配置部分，文章详细说明了如何设置WebSocket代理，包括必要的请求头配置、超时设置和协议升级处理。这确保了MQTT服务可以通过Web安全地访问，同时保持连接的稳定性。配置包括了代理转发、连接超时设置、请求头处理等关键参数，使MQTT服务能够安全稳定地运行在生产环境中。

  This article provides a comprehensive guide on deploying the EMQX MQTT message server using Docker Compose and configuring Nginx reverse proxy for secure access. The article covers the complete deployment process, including Docker container configuration, environment variable setup, port mapping, and data persistence.

  In the Docker Compose configuration, we use EMQX version 4.2.14 image, setting up essential port mappings (1883 for MQTT protocol, 8083 for WebSocket connections), configuring timezone synchronization, and enabling core plugins through environment variables, including emqx_recon (performance diagnostics), emqx_retainer (message retention), emqx_management (management API), and emqx_auth_username (username-password authentication). Special emphasis is placed on security configuration, disabling anonymous access (ALLOW_ANONYMOUS=false), and supporting username and password configuration through environment variables.

  In the Nginx reverse proxy configuration section, the article details how to set up WebSocket proxying, including necessary header configurations, timeout settings, and protocol upgrade handling. This ensures secure web access to the MQTT service while maintaining connection stability. The configuration includes proxy forwarding, connection timeout settings, header processing, and other critical parameters, enabling the MQTT service to run securely and stably in a production environment.
---

docker-compose.yml

```yml
version: "3"
services:
  mqtt:
    image: emqx/emqx:4.2.14
    container_name: mqtt
    restart: always
    ports:
      - "1883:1883"
      - "8083:8083"
    volumes:
      - /etc/timezone:/etc/timezone
      - /etc/localtime:/etc/localtime
    environment:
      - EMQX_LOADED_PLUGINS="emqx_recon,emqx_retainer,emqx_management,emqx_auth_username"
      - EMQX_ALLOW_ANONYMOUS=false
      - EMQX_AUTH__USER__1__USERNAME=${MQTT_USERNAME:-username} # 可以在.env中配置
      - EMQX_AUTH__USER__1__PASSWORD=${MQTT_PASSWORD:-password} # 可以在.env中配置
```

#### 启动

docker-compose up -d

#### nginx 代理设置

```conf
 location /mqtt {
        proxy_pass   http://192.168.31.186:8083; # 局域网ip地址
        proxy_read_timeout  60s;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real_IP $remote_addr;
        proxy_set_header    X-Forwarded-for $remote_addr;
        proxy_http_version  1.1;
        proxy_set_header    Upgrade $http_upgrade;
        proxy_set_header    Connection Upgrade;
    }
```
