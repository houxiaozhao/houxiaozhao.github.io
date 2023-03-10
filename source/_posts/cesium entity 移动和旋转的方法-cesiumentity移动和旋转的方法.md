---
title: cesium entity 移动和旋转的方法
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://100042.xyz
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2021-05-24 10:56:59.0
updated: 2022-03-08 11:31:16.387
url: /archives/cesiumentity移动和旋转的方法
categories:
tags:
  - cesium
---

# cesium entity 移动和旋转的方法

```jsx
const EventEmitter = require("events");

export default class Air extends EventEmitter {
  constructor(viewer, uri, id, position, orientation) {
    super();

    this.active = false;
    this.air = viewer.entities.add({
      id: id,
      position: position,
      orientation: orientation,
      viewFrom: new Cesium.Cartesian3(0, -30, 30),
      model: {
        uri,
        scale: 0.04,
      },
    });
    viewer.scene.preRender.addEventListener(this.update.bind(this));
  }

  update() {
    const now = new Date().getTime();
    if (this.active) {
      if (this.startTime && this.endTime && this.startTime < now && now < this.endTime) {
        const lerp = (now - this.startTime) / (this.endTime - this.startTime);
        const posotion = Cesium.Cartesian3.lerp(this.initial.position, this.target.position, lerp, new Cesium.Cartesian3());
        const orientation = Cesium.Quaternion.slerp(this.initial.orientation, this.target.orientation, lerp, new Cesium.Quaternion());
        this.air.position = posotion;
        this.air.orientation = orientation;
      } else {
        if (this.active) {
          this.active = false;
          this.emit("end");
          if (!this.initial.position.equals(this.target.position)) this.emit("moved");
          if (!this.initial.orientation.equals(this.target.orientation)) this.emit("rotated");
        }
      }
    }
  }

  moveTarget({ position, orientation, speed = 5 }) {
    this.initial = {
      position: this.air.position.getValue(),
      orientation: this.air.orientation.getValue(),
    };
    this.target = {
      position: position || this.initial.position,
      orientation: orientation || this.initial.orientation,
    };
    const duration = Cesium.Cartesian3.distance(this.initial.position, this.target.position) / speed || 2; // 如果没有移动位置，只有旋转则时间为两秒
    this.startTime = new Date().getTime();
    this.endTime = new Date(this.startTime + duration * 1000).getTime();
    this.active = true;
  }
}
```

重点在于使用`Cesium.Cartesian3.lerp`和 时间计算位置
