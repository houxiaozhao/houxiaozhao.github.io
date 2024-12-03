---
title: threejs 世界坐标系转其他对象本地坐标系方法
date: 2021-07-07 11:13:17.0
updated: 2022-03-08 11:27:28.881
url: /archives/threejs世界坐标系转其他对象本地坐标系方法
categories:
tags:
  - threejs
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
