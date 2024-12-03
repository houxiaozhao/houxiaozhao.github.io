---
title: vuex 学习笔记
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-03-07 19:08:42.0
updated: 2022-03-08 10:42:20.704
url: /archives/vuex学习笔记
categories:
tags:
  - Vue vuex
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

  `mapActions`  辅助函数将组件的 methods 映射为  `store.dispatch`  调用

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
