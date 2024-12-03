---
title: OpenGL图形编程：顶点着色器与片元着色器详解
date: 2021-06-16 11:16:26.0
categories:
  - 图形编程
  - 计算机图形学
tags:
  - OpenGL
  - 图形渲染
  - 着色器
  - 顶点着色器
  - 片元着色器
  - 3D图形
  - Graphics Programming
  - Shader Development
keywords:
  - OpenGL编程
  - 顶点着色器
  - 片元着色器
  - 图形渲染管线
  - 3D图形编程
  - 计算机图形学
  - 着色器开发
  - GPU编程
  - 图形API
  - 实时渲染
  - Vertex Shader
  - Fragment Shader
  - Graphics Pipeline
  - 3D Graphics Programming
  - Computer Graphics
description: |
  本文深入探讨了OpenGL中的顶点着色器和片元着色器，这两个图形渲染管线中的关键组件。文章详细解释了顶点着色器的作用，包括处理每个顶点的位置、颜色和法向量等属性，以及如何通过修改这些值来实现特定的渲染效果。同时，文章还阐述了片元着色器的功能，如何处理每个像素片段的颜色、深度和纹理信息，以及如何利用插值技术创建平滑的颜色渐变效果。

  通过具体示例，读者将了解到这两种着色器如何协同工作，从而在3D图形渲染中实现复杂的视觉效果。文章还讨论了着色器在现代GPU编程中的重要性，以及它们如何提高渲染效率和灵活性。对于想要深入理解OpenGL图形编程的开发者来说，本文提供了宝贵的见解和实践指导。

  This article delves into the vertex and fragment shaders in OpenGL, two crucial components of the graphics rendering pipeline. It explains in detail the role of vertex shaders in processing attributes like position, color, and normal vectors for each vertex, and how modifying these values can achieve specific rendering effects. The article also elaborates on the function of fragment shaders, discussing how they handle color, depth, and texture information for each pixel fragment, and how interpolation techniques create smooth color gradients.

  Through concrete examples, readers will understand how these two types of shaders work together to create complex visual effects in 3D graphics rendering. The article also discusses the importance of shaders in modern GPU programming and how they enhance rendering efficiency and flexibility. For developers looking to gain a deeper understanding of OpenGL graphics programming, this article offers valuable insights and practical guidance.
---

# OpenGL

[http://zhangwenli.com/blog/2017/02/24/what-is-a-shader/](http://zhangwenli.com/blog/2017/02/24/what-is-a-shader/)

# 顶点着色器（Vertex Shader）和片元着色器（Fragment Shader）。

片元着色器是在顶点着色器之后被调用的，因而也可以从顶点着色器往片元着色器传递参数。

1. **顶点着色器**

   比如你用 OpenGL 画一个三角形，那就是创建了三个顶点。

   而**顶点着色器就是每个顶点调用一次的程序**。

   在顶点着色器中，可以访问到顶点的三维位置、颜色、法向量等信息。可以通过修改这些值，或者将其传递到片元着色器中，实现特定的渲染效果

2. **片元着色器**

   **片元着色器就是每个片元调用一次的程序**。

   在片元着色器中，可以访问到片元在二维屏幕上的坐标、深度信息、颜色等信息。通过改变这些值，可以实现特定的渲染效果。

同样是颜色信息，在顶点着色器中，得到的是**顶点的颜色**，而在片元着色器中，得到的是**片元的颜色**——也就是说，如果三角形的三个顶点颜色是不同的，片元的颜色就是根据这三个顶点的颜色进行**插值**后的，也可以通俗地理解为，是渐变的。

# 矩阵变换

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/cxL6Ec.png)
![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/vFl3fr.png)
一个物体的三维坐标向量，乘以模型视图矩阵后，能够得到它在试图坐标系中的位置，也就是它相对于摄像机的坐标位置

## **1. 和角度相关的函数**

下面是一个和角度相关的函数，他们的用法我们度熟悉。

![image-d0beb12c9f804892a781e672201b4886](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/EVPugD.png)![image.png]()

## **2. 数学函数**

这类主要是对指数对数幂函数的操作
![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/Zmm29y.png)

## **3. 常用函数**

这里是常用函数，和 js 中的内置函数很像，需要牢记。

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/ktbw5h.png)

## **4. 几何函数**

这是与长度、距离、向量等相关的函数

![image.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/UjDJNN.png)
