---
title: vue中动态绑定的文本中加入跳转链接处理方式
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2022-02-17 18:45:19.037
updated: 2022-03-08 13:16:16.481
url: /archives/vue-zhong-dong-tai-bang-ding-de-wen-ben-zhong-jia-ru-tiao-zhuan-lian-jie-chu-li-fang-shi
categories:
tags:
  - vue
---

> 业务中有一块是通知中心，其中的通知文本中有的文字是可以点击跳转到其他页面的。但是又不想使用富文本渲染。遂采用以下实现方式

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
