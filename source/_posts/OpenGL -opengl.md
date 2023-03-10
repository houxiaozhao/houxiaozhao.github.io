---
title: OpenGL
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2021-06-16 11:16:26.0
updated: 2022-03-08 11:31:00.507
url: /archives/opengl
categories:
tags:
  - opengl
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
