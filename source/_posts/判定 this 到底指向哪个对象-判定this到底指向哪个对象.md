---
title: 判定 this 到底指向哪个对象
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-03-23 09:36:16.0
updated: 2022-03-08 11:35:08.184
url: /archives/判定this到底指向哪个对象
categories:
tags:
  - node
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
