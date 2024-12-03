---
title: CSS现代布局技术：Flexbox与Grid布局系统详解
date: 2018-03-07 19:08:42.0
categories:
  - 前端开发
  - CSS技术
  - 页面布局
tags:
  - Flexbox
  - CSS Grid
  - 响应式布局
  - CSS3
  - 网页设计
  - 前端技术
  - 布局系统
  - 网格布局
  - 弹性盒子
  - 现代CSS
keywords:
  - Flex布局教程
  - CSS Grid布局
  - 弹性盒子模型
  - 网格布局系统
  - 响应式设计
  - CSS布局技术
  - flex-direction
  - justify-content
  - align-items
  - grid-template
  - 现代网页布局
  - CSS3布局
  - 前端开发技术
  - 页面布局方案
  - Web设计技巧
description: |
  本文深入探讨了现代CSS布局的两大核心技术：Flexbox弹性布局和Grid网格布局系统的实现原理与应用方法：

  1. Flexbox弹性布局详解：
     - 基本概念与使用方法
     - 容器属性全面解析
       * flex-direction（主轴方向）
       * flex-wrap（换行方式）
       * justify-content（主轴对齐）
       * align-items（交叉轴对齐）
       * align-content（多轴对齐）
     - 项目属性深度讲解
       * order（排序）
       * flex-grow（放大比例）
       * flex-shrink（缩小比例）
       * flex-basis（基准尺寸）
       * align-self（单项对齐）

  2. Grid网格布局系统：
     - 网格布局基础概念
     - 容器属性详解
       * grid-template-rows（行定义）
       * grid-template-columns（列定义）
     - 项目属性使用
       * grid-column-start（列起始）
       * grid-column-end（列结束）
       * grid-column简写语法
     - 网格线系统说明
     - 布局实例演示

  3. 实践应用指南：
     - 布局系统选择建议
     - 常见使用场景分析
     - 性能考虑因素
     - 浏览器兼容性说明
     - 实战练习资源推荐

  This article provides an in-depth analysis of two core modern CSS layout technologies: Flexbox and Grid layout systems:

  1. Flexbox Layout System:
     - Core concepts and implementation
     - Container properties analysis
       * flex-direction (main axis)
       * flex-wrap (wrapping behavior)
       * justify-content (main axis alignment)
       * align-items (cross axis alignment)
       * align-content (multi-line alignment)
     - Item properties explanation
       * order (sequencing)
       * flex-grow (expansion ratio)
       * flex-shrink (shrink ratio)
       * flex-basis (initial size)
       * align-self (individual alignment)

  2. Grid Layout System:
     - Grid fundamentals
     - Container properties
       * grid-template-rows (row definition)
       * grid-template-columns (column definition)
     - Item properties
       * grid-column-start (column beginning)
       * grid-column-end (column ending)
       * grid-column shorthand syntax
     - Grid line system
     - Layout demonstrations

  3. Practical Implementation Guide:
     - Layout system selection criteria
     - Common use case analysis
     - Performance considerations
     - Browser compatibility notes
     - Practice resources and recommendations
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
