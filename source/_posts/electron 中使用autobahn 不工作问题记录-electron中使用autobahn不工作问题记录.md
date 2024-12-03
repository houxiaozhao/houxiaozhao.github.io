---
title: electron 中使用autobahn 不工作问题记录
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-03-07 17:03:36.0
updated: 2022-03-08 10:43:21.21
url: /archives/electron中使用autobahn不工作问题记录
categories:
tags:
---

在 authbahn 源代码中  
[if (global.process && global.process.versions.node) {](https://github.com/crossbario/autobahn-js/blob/79b093bf47f6ff3e2fd50f42fce20578150baaf9/lib/transport/websocket.js#L81)
判断当前的运行环境为 node 环境，但实际上 electron 中使用的还是 web。
所以暂时删除掉判断，直接进入 else，为浏览器环境。
目前可以正常运行，不知道以后会不会出现其他问题。
