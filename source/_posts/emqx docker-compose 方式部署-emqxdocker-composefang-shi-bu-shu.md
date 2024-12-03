---
title: emqx docker-compose 方式部署
date: 2022-02-17 18:50:53.944
updated: 2022-02-21 10:58:04.386
url: /archives/emqxdocker-composefang-shi-bu-shu
categories:
tags:
  - emqx
  - docker
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
