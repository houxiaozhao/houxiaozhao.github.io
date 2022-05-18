---
title: vue 可编辑 div 组件
date: 2022-01-18 18:35:41.623
updated: 2022-01-18 18:39:47.214
url: /archives/vue可编辑div组件
categories: 
tags: 
- 前端
- vue
---

> **contenteditable**属性可以指定元素内容是否可编辑。

vue中使用这一属性后，编辑内容却不支持v-model.
不能使用一下方法绑定
```vue
<div contenteditable v-model='value'></div>
```
提取成组件后可以使用v-model
```vue

<template>
  <p
      class="editable"
      ref="editable"
      contenteditable
      :placeholder="placeholder"
      v-on="listeners"
  ></p>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners() {
      return {...this.$listeners, input: this.onInput};
    },
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.innerText);
    },
  },
};
</script>
<style>
.editable:empty:before {
  content: attr(placeholder);
}

</style>

```
使用方法
```vue
<Editable placeholder="输入缺陷说明" v-model="value"/>
```