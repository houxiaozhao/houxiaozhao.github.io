---
title: threejs 检测点是否在圆柱体内
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2021-07-07 11:13:17.0
updated: 2022-03-08 11:27:19.966
url: /archives/threejs检测点是否在圆柱体内
categories:
tags:
  - threejs
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
