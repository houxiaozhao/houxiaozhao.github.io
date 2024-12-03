---
title: vue 可编辑 div 组件
date: 2022-01-18 18:35:41.623
categories:
  - 前端开发
  - Vue.js组件
tags:
  - Vue.js
  - 组件开发
  - contenteditable
  - 前端开发
  - UI组件
  - v-model
  - 可编辑组件
  - 用户交互
keywords:
  - Vue可编辑div
  - contenteditable属性
  - Vue组件开发
  - v-model双向绑定
  - 可编辑组件实现
  - Vue自定义组件
  - 富文本编辑
  - Vue用户输入
  - Vue事件处理
  - 前端交互组件
description: |
  本文详细介绍了如何在Vue.js中创建一个支持v-model的可编辑div组件。文章讲解了contenteditable属性的使用，以及如何通过组件封装解决Vue中contenteditable与v-model的兼容问题。通过实际代码示例，展示了组件的完整实现过程，包括属性定义、事件处理和样式设置，为开发者提供了一个实用的UI交互组件解决方案。

  This article provides a detailed guide on creating an editable div component with v-model support in Vue.js. It explains the usage of the contenteditable attribute and demonstrates how to resolve compatibility issues between contenteditable and v-model through component encapsulation. With practical code examples, it shows the complete implementation process, including property definitions, event handling, and styling, offering developers a practical UI interaction component solution.
---

> **contenteditable**属性可以指定元素内容是否可编辑。

vue 中使用这一属性后，编辑内容却不支持 v-model.
不能使用一下方法绑定

```vue
<div contenteditable v-model="value"></div>
```

提取成组件后可以使用 v-model

````vue
<template>
  <p class="editable" ref="editable" contenteditable :placeholder="placeholder" v-on="listeners"></p>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.onInput };
    },
  },
  mounted() {
    this.$refs.editable.innerText = this.value;
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.innerText);
    },
  },
};
</script>
<style>
.editable:empty:before {
  content: attr(placeholder);
}
</style>

使用方法 ```vue
<Editable placeholder="输入缺陷说明" v-model="value" />
````
