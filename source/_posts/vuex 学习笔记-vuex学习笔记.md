---
title: vuex 学习笔记
date: 2018-03-07 19:08:42.0
categories:
  - 前端开发
  - Vue.js
tags:
  - Vue.js
  - Vuex
  - 状态管理
  - 前端开发
  - JavaScript
  - 数据流管理
  - Web开发
keywords:
  - Vuex状态管理
  - Vue.js数据流
  - Vuex教程
  - state管理
  - mutations使用
  - actions异步操作
  - getters计算属性
  - Vuex模块化
  - Vue状态管理模式
  - 前端数据流控制
description: |
  这篇技术文章深入探讨了Vue.js的状态管理模式Vuex的核心概念和使用方法。文章详细介绍了Vuex的主要组成部分：state状态管理、getters计算属性、mutations状态修改、actions异步操作以及modules模块化开发。通过实际代码示例，展示了如何在Vue.js应用中实现高效的状态管理，包括数据存储、计算属性的使用、状态修改的规范方式以及异步操作的处理方法。

  This technical article provides an in-depth exploration of Vuex, the state management pattern for Vue.js applications. It covers the core concepts including state management, getters for computed properties, mutations for state modifications, actions for asynchronous operations, and modules for modular development. Through practical code examples, it demonstrates how to implement efficient state management in Vue.js applications, including data storage, computed properties usage, standardized state modifications, and handling asynchronous operations.
---

- state

  记录所有数据和状态的，跨页面使用的

- getters

  store 里的计算属性

  ```javascript
  {
      state:{
          aaa:2
      },
      getters:{
          // 通过$store.getters.aaacheng2访问
          aaacheng2:state=>{
              return state.aaa*2
          },
  		// 通过$store.getters.aaacheng(6)访问
          aaacheng:(state)=>(n)=>{
  			return state.aaa*n
          }
      }
  }
  // mapGetters 辅助函数 将 store 中的 getter 映射到局部计算属性
  ```

- mutation

  用于修改 state 状态

  ```javascript
  increment (state, n) {
  	state.count += n
  }
  store.commit('increment', 10)
  ```

  `mapMutations` 辅助函数将组件的方法映射为 store.commit 调用

  ```javascript
   methods: {
      ...mapMutations([
        'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

        // `mapMutations` 也支持载荷：
        'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      ]),
      ...mapMutations({
        add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      })
    }
  ```

- action

  提交 mutation 间接变更状态

  保护一些常用业务操作，通过提交 mutation 改变业务中的状态

  mutation 中则只包含更改 state 的方法

  可以有异步操作

  ```javascript
  const store = new Vuex.Store({
    state: {
      count: 0,
    },
    mutations: {
      increment(state) {
        state.count++;
      },
    },
    actions: {
      increment(context) {
        context.commit("increment");
      },
    },
  });
  // 调用方式
  store.dispatch("increment");
  ```

  `mapActions`  辅助函数将组件的 methods 映射为   `store.dispatch`  调用

  action 可以返回一个 promise

- modules

  把 store 分割为模块

  ```javascript
  // A.js
  export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  };
  ```

  ```javascript
  // B.js
  export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
  };
  ```

  ```javascript
  // store.js
  import moduleA from "./A.js";
  import moduleB from "./B.js";
  const store = new Vuex.Store({
    modules: {
      moduleA,
      moduleB,
    },
  });
  ```

  ```javascript
  this.$store.state.XX.XX;
  this.$store.getters["XX/XX"];
  this.$store.commit("XX/XX", data);
  ```
