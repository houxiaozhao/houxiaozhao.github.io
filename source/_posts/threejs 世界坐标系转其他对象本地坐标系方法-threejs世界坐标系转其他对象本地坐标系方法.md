---
title: threejs 世界坐标系转其他对象本地坐标系方法
date: 2021-07-07 11:13:17.0
categories:
  - 3D开发
  - WebGL
tags:
  - Three.js
  - 3D开发
  - WebGL
  - 坐标系转换
  - 矩阵变换
  - JavaScript
  - 3D数学
  - 图形编程
keywords:
  - Three.js坐标系
  - 世界坐标转换
  - 本地坐标系
  - Matrix4变换
  - Vector3坐标
  - 3D坐标变换
  - WebGL坐标系
  - Three.js矩阵
  - 空间变换
  - 3D图形计算
description: |
  本文详细介绍了在Three.js中如何实现世界坐标系到对象本地坐标系的转换方法。文章通过实际代码示例，展示了使用Vector3、Matrix4等Three.js核心类进行坐标转换的具体实现过程。对于需要在3D场景中进行精确坐标变换的开发者来说，这是一个实用的技术参考，包含了完整的矩阵变换和坐标计算方法。

  This article provides a detailed explanation of how to convert coordinates from world space to object local space in Three.js. Through practical code examples, it demonstrates the specific implementation process using Three.js core classes like Vector3 and Matrix4. For developers who need to perform precise coordinate transformations in 3D scenes, this is a practical technical reference that includes complete matrix transformation and coordinate calculation methods.
---

# threejs 世界坐标系转其他对象本地坐标系方法

```
const v=new Vector3()// 世界坐标系下的坐标
//obj 待转的对象
const _m1 = new Matrix4()
const position = v.clone()
obj.updateWorldMatrix(true,false)
_m1.copy(e.matrixWorld).invert()
position.applyMatrix4(_m1)
// position为相对与obj的本地坐标系的坐标
```
