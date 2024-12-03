---
title: Three.js高效实现点与圆柱体碰撞检测的数学原理与实践
date: 2021-07-07 11:13:17.0
categories:
  - 3D开发
  - WebGL
  - 图形编程
  - 计算机图形学
tags:
  - Three.js
  - 3D开发
  - WebGL
  - 碰撞检测
  - 3D数学
  - 空间几何
  - 坐标变换
  - 图形编程
  - Matrix4
  - Vector2
  - 圆柱体
  - JavaScript
keywords:
  - Three.js碰撞检测
  - 点与圆柱体相交
  - 3D空间检测
  - Three.js几何体
  - WebGL编程
  - 3D数学计算
  - 圆柱体碰撞检测
  - 坐标系转换
  - 空间向量计算
  - 矩阵变换
  - 图形渲染技术
  - 几何算法
  - JavaScript 3D
  - WebGL开发
  - 3D图形编程
description: |
  本文详细讲解了在Three.js中实现点与圆柱体碰撞检测的完整解决方案。文章从实际开发需求出发，介绍了一个在Three.js官方文档中未提供的重要功能实现方法。

  主要技术内容包括：
  1. 空间坐标系转换技术：
     - 使用Matrix4进行全局坐标到局部坐标的转换
     - 应用矩阵求逆运算实现坐标映射
  2. 点与圆柱体碰撞检测算法：
     - 二维平面上的点到圆心距离计算
     - 使用Vector2进行平面距离计算
     - 高度范围的边界检测
  3. 具体实现步骤：
     - 获取待检测点的克隆坐标
     - 更新物体的世界矩阵
     - 计算并应用逆矩阵变换
     - 获取圆柱体几何参数
     - 进行距离和高度判断

  代码实现重点：
  - 使用Three.js的Matrix4和Vector2类
  - 高效的克隆和矩阵运算
  - 精确的数学计算和边界判断
  - 优化的性能处理方案

  This article provides a detailed explanation of implementing point-cylinder collision detection in Three.js. It addresses a crucial functionality not covered in the official Three.js documentation, offering a practical solution for 3D development needs.

  Key technical content includes:
  1. Spatial Coordinate System Transformation:
     - Using Matrix4 for global to local coordinate conversion
     - Applying matrix inversion for coordinate mapping
  2. Point-Cylinder Collision Detection Algorithm:
     - Distance calculation from point to center in 2D plane
     - Using Vector2 for planar distance computation
     - Height range boundary checking
  3. Implementation Steps:
     - Cloning coordinates of the test point
     - Updating object's world matrix
     - Computing and applying inverse matrix transformation
     - Retrieving cylinder geometry parameters
     - Performing distance and height validation

  Code Implementation Highlights:
  - Utilizing Three.js Matrix4 and Vector2 classes
  - Efficient cloning and matrix operations
  - Precise mathematical calculations and boundary checks
  - Optimized performance handling
---

# threejs 检测点是否在圆柱体内

> 在 threejs 文档里没有找到相关方法

检测思路：

1. 把全局坐标系下的点坐标转为圆柱体的相对坐标
2. 判断点坐标(x,z)是否在(0,0)为中心圆柱的半径为半径的圆内
3. 判断点坐标的 y 的绝对值是否大于圆柱高度的一半
   ![Untitled.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/xtt4T3.png)![Untitled 1.png](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/ZCr5BF.png)

```jsx
//v:待检测点
//obj:圆柱
const position = v.clone();
obj.updateWorldMatrix(true, false);
const _m1 = new Matrix4();
_m1.copy(e.matrixWorld).invert();
position.applyMatrix4(_m1);
// console.log(position)
const parameters = obj.geometry.parameters;
// console.log('待检测圆柱', parameters)
const v2Center = new Vector2(position.x, position.z).distanceTo(new Vector2());
if (v2Center <= parameters.radiusTop && Math.abs(position.y) < parameters.height / 2) {
  // console.log('在圆柱内', e)
}
```
