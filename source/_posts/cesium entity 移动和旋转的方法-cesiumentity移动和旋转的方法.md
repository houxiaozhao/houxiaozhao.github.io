---
title: Cesium实体动画：基于事件驱动的Entity移动与旋转实现
date: 2021-05-24 10:56:59.0
categories:
  - WebGIS开发
  - 三维可视化
  - JavaScript编程
tags:
  - Cesium
  - WebGIS
  - 三维动画
  - Entity操作
  - JavaScript
  - Cartesian3
  - Quaternion
  - 事件驱动
  - 空间计算
  - 动画控制
keywords:
  - Cesium Entity动画
  - 三维模型动画
  - 实体移动方法
  - 实体旋转控制
  - 线性插值动画
  - 四元数旋转
  - 事件驱动开发
  - 空间坐标变换
  - 动画速度控制
  - 模型姿态调整
  - 三维场景交互
  - WebGL动画
  - 实时渲染
  - 动画性能优化
  - 平滑过渡效果
description: |
  本文详细介绍了在Cesium中实现Entity对象动画的高级方法，基于事件驱动机制实现了平滑的移动和旋转效果。主要技术内容包括：

  1. 核心实现机制：
     - 基于EventEmitter的事件系统设计
     - preRender事件监听的动画循环
     - 动态位置和方向的实时更新

  2. 关键技术点：
     - Cartesian3.lerp实现位置插值
     - Quaternion.slerp实现旋转插值
     - 基于时间的动画进度控制
     - 速度参数的动态调整

  3. 动画控制功能：
     - 位置移动和方向旋转的统一控制
     - 动画起始和结束的事件触发
     - 移动完成和旋转完成的独立事件
     - 动画状态的实时监控

  4. 性能优化考虑：
     - 高效的坐标计算方法
     - 平滑的动画过渡效果
     - 资源释放和内存管理

  This article presents an advanced approach to implementing Entity animation in Cesium, utilizing an event-driven mechanism for smooth movement and rotation. Key technical aspects include:

  1. Core Implementation Mechanism:
     - Event system design based on EventEmitter
     - Animation loop using preRender event listener
     - Real-time updates of position and orientation

  2. Key Technical Points:
     - Position interpolation using Cartesian3.lerp
     - Rotation interpolation using Quaternion.slerp
     - Time-based animation progress control
     - Dynamic speed parameter adjustment

  3. Animation Control Features:
     - Unified control of position movement and orientation rotation
     - Event triggering for animation start and end
     - Independent events for movement and rotation completion
     - Real-time monitoring of animation states

  4. Performance Optimization:
     - Efficient coordinate calculation methods
     - Smooth animation transitions
     - Resource cleanup and memory management
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
