---
title: Vue.js 动态文本中实现可点击链接 | Interactive Links in Vue Dynamic Text
date: 2022-02-17 18:45:19.037
author: houxiaozhao
categories:
  - 前端开发
  - Vue.js
tags:
  - Vue.js
  - 动态绑定
  - v-html
  - 路由跳转
  - 前端开发
  - Dynamic Binding
  - Router Navigation
keywords:
  - Vue动态文本
  - v-html使用
  - 链接跳转
  - 动态渲染
  - 路由导航
  - dataset属性
  - Vue组件开发
  - dynamic text
  - vue router
  - clickable links
description: |
  探讨在Vue.js应用中如何在动态文本中添加可点击链接，使用v-html和dataset属性实现灵活的文本渲染和路由跳转功能。本文特别适用于开发通知中心、消息列表等需要在文本中嵌入可交互链接的场景。

  Explore how to add clickable links in dynamic text for Vue.js applications. This article demonstrates using v-html and dataset attributes for flexible text rendering and routing, particularly useful for notification centers and message lists requiring embedded interactive links.
---

业务中有一块是通知中心，其中的通知文本中有的文字是可以点击跳转到其他页面的。但是又不想使用富文本渲染。遂采用以下实现方式

- v-html 渲染
- a 标签标识可跳转链接
- dataset 设置参数

```javascript
<template>
  <div>
    <div v-html="text" @click="click"></div>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      text: `你好，这是<a data-name='Preview' data-id='123' data-mode="preview">链接</a>。这是 <span class="active">强调色</span> 的文本`
    }
  },
  methods: {
    click(e) {
      if (e.target.dataset.name) this.$router.push({name: e.target.dataset.name, params: e.target.dataset})
    }
  }
}
</script>
<style>
.active {
  color: yellow;
}

a {
  color: yellow;
  cursor: pointer;
}
</style>

```

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/0gpmgb.png)
