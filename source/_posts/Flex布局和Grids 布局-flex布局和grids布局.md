---
title: Flex布局和Grids 布局
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-03-07 19:08:42.0
updated: 2022-03-08 10:43:21.498
url: /archives/flex布局和grids布局
categories:
tags:
  - Flex Grids 布局
---

## Flex 布局

1. Flex 是弹性布局，使用`display:flex`或`display: inline-flex`指定为 flex 布局
2. 默认 水平的是主轴，垂直的是交叉轴
3. 容器的属性（属性第一个为默认值）
   - flex-direction 主轴方向 `row | row-reverse | column | column-reverse`
   - flex-wrap 项目换行方式 `nowrap | wrap | wrap-reverse`
   - flex--flow 以上两个属性的缩写
   - justify-content **项目**在主轴的对齐方式 `flex-start | flex-end | center | space-between | space-around`
   - align-items **项目**在交叉轴对齐方式 `flex-start | flex-end | center | baseline | stretch`
   - align-content 多跟 **轴线** 的对齐方式，只有一根轴线则不起作用 `flex-start | flex-end | center | space-between | space-around | stretch`
4. 项目的属性
   - order 定义项目排列顺序，数越小越靠前
   - flex-grow 放大比例 😵😵😵
   - flex-shrink 缩小比例 😵😵😵
   - flex-basis 在分配多余空间之前，项目占据的主轴空间 😵😵😵😵😵😵
   - flex 上边三个属性的简写
   - align-self 定义一个对齐方式的特例

演示 https://demo.agektmr.com/flexbox/

详细

- http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
- https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout

## Grids 网格布局

1. 使用`display:grid`指定为网格布局

2. 容器的属性

   - grid-template-row 定义行 有几个值就有几行
   - grid-template-column 定义列 有几个值就有几列

3. 项目的属性

   - grid-column-start 子元素列的开始位置，数值为网格线的 index 有三行就有四个线

   - grid-column-end 子元素列的结束位置

     ```
     grid-template-columns: 40px 50px auto 50px 40px;
         grid-template-rows: 25% 100px auto;
     ```

   - grid-column 以上两个简写 1 / 4

未完。。。

https://www.jianshu.com/p/d183265a8dad

## 两个游戏,抽空试试

- flex http://flexboxfroggy.com/#zh-cn
- grids http://cssgridgarden.com/#zh-cn
