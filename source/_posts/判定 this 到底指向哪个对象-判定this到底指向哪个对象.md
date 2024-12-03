---
title: JavaScript中this绑定规则详解：优先级与实践
date: 2018-03-23 09:36:16.0
categories:
  - JavaScript
  - 前端开发
  - 编程基础
tags:
  - JavaScript
  - this绑定
  - 函数调用
  - 作用域
  - 对象方法
  - 严格模式
  - 开发技巧
  - 代码规范
keywords:
  - JavaScript this
  - this绑定规则
  - new绑定
  - call绑定
  - apply绑定
  - bind绑定
  - 隐含绑定
  - 默认绑定
  - 严格模式
  - 函数调用
  - 对象方法
  - 构造函数
  - 作用域链
  - 上下文对象
  - JavaScript开发
description: |
  本文系统讲解了JavaScript中this关键字的绑定规则及其优先级顺序。文章从四个核心场景分析this的指向：首先是通过new调用时的构造绑定，其次是使用call/apply的明确绑定（包括bind硬绑定），然后是作为对象方法调用时的隐含绑定，最后是默认绑定规则。对每种绑定方式都提供了具体的代码示例，如new foo()、foo.call(obj2)、obj1.foo()等，并详细解释了在严格模式下的特殊情况。这些规则按优先级排序，帮助开发者在实际编程中准确判断this的指向，从而避免常见的this相关错误。

  This article systematically explains the binding rules and priority order of the 'this' keyword in JavaScript. It analyzes the direction of 'this' from four core scenarios: first, constructor binding when called with 'new', second, explicit binding using call/apply (including hard binding with bind), then implicit binding when called as an object method, and finally the default binding rule. For each binding method, specific code examples are provided, such as new foo(), foo.call(obj2), obj1.foo(), etc., with detailed explanations of special cases under strict mode. These rules are ordered by priority, helping developers accurately determine the direction of 'this' in actual programming, thereby avoiding common this-related errors. The article focuses on practical application while maintaining technical accuracy, making it an essential reference for JavaScript developers dealing with 'this' binding scenarios.
---

### 判定 this

现在，我们可以按照优先顺序来总结一下从函数调用的调用点来判定 this 的规则了。按照这个顺序来问问题，然后在第一个规则适用的地方停下。

  <!--more-->

1. 函数是通过 new 被调用的吗（new 绑定）？如果是，this 就是新构建的对象。
   var bar = new foo()
2. 函数是通过 call 或 apply 被调用（明确绑定），甚至是隐藏在 bind 硬绑定 之中吗？如果是，this 就是那个被明确指定的对象。
   var bar = foo.call( obj2 )
3. 函数是通过环境对象（也称为拥有者或容器对象）被调用的吗（隐含绑定）？如果是，this 就是那个环境对象。
   var bar = obj1.foo()
4. 否则，使用默认的 this（默认绑定）。如果在 strict mode 下，就是 undefined，否则是 global 对象。
   var bar = foo()

以上，就是理解对于普通的函数调用来说的 this 绑定规则 所需的全部。是的……几乎是全部

摘自：[You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/this%20&%20object%20prototypes/ch2.md#%E5%88%A4%E5%AE%9A-this)

`用作备忘`
