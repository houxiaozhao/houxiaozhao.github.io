---
title: AngularJS和Ionic应用性能优化实践与技巧
date: 2017-01-18 11:59:21.0
categories:
  - 前端开发
  - 性能优化
tags:
  - AngularJS
  - Ionic
  - 性能优化
  - JavaScript
  - 移动应用开发
  - 前端框架
  - Web性能
keywords:
  - AngularJS性能优化
  - Ionic性能优化
  - $watchCollection优化
  - one-time binding
  - Track by优化
  - 原生滚动优化
  - collection-repeat
  - 视图缓存
  - 移动应用性能
  - 前端性能调优
description: |
  这篇文章深入探讨了AngularJS和Ionic框架的性能优化策略和最佳实践。文章详细介绍了多个实用的优化技巧，包括使用$watchCollection替代$watch、实现one-time binding、优化ng-repeat性能、配置原生滚动、实现无限滚动等关键技术点。这些优化方法能有效提升应用的响应速度、减少内存占用，并改善整体用户体验。

  The article provides an in-depth analysis of performance optimization strategies for AngularJS and Ionic frameworks. It covers essential optimization techniques including the use of $watchCollection instead of $watch, implementing one-time binding, optimizing ng-repeat performance, configuring native scrolling, and implementing infinite scroll functionality. These optimization methods effectively improve application response time, reduce memory usage, and enhance overall user experience. The article includes practical code examples and implementation guidelines for each optimization technique, making it a valuable resource for developers working with AngularJS and Ionic frameworks.
---

# angular 性能优化

1. 使用\$watchCollection(obj, listener)，
   不要使用`$watch()`或者`$watchGroup()`;

2. 使用 one-time binding

   ```html
   {{::user.first_name}}
   ```

   <!--more-->

3. 使用 Track by
   以前的用法
   `ng-repeat="user in users"`
   修改后的用法
   `ng-repeat="user in users track by user.id"`如果 users 有 id 的话
   或者`ng-repeat="user in users track by $index"`如果没有 id

4. 不要使用 console.log(),而是用\$log

   The `$log` service has several log levels `.info` `.debug` and `.error`.

5. 禁用 dubug

   ```javascript
   angular.module('yourModule').config(function($compileProvider) {
     if (/* test if in production */) {
    	$compileProvider.debugInfoEnabled(false);
     }
   });

   ```

   AngularJS by default adds scope references to the DOM for tools such as [angularjs-batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en) to work. This has an impact on your application performance.

6. 使用 lodash 库的\_.forEach 遍历,他的效率是 angular foreach 的 4 倍。

7. 动画，参考这篇文章http://www.bennadel.com/blog/2935-enable-animations-explicitly-for-a-performance-boost-in-angularjs.htm。据说有显著提升

# ionic 性能优化

1. 使用原生滚动方式

```javascript
angular.module("yourModule").config(function ($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);
});
```

​ 参考:http://blog.ionic.io/native-scrolling-in-ionic-a-tale-in-rhyme/

2. 使用 collection repeat

```html
<ion-content>
  <ion-item collection-repeat="item in items"> {{item}} </ion-item>
</ion-content>
```

参考:http://ionicframework.com/docs/api/directive/collectionRepeat/

3. 无限滚动

<ion-infinite-scroll> 指令允许调用一个函数，当页面到底部或靠近底部的时候。

```html
<ion-content ng-controller="MyController">
  <ion-list> .... .... </ion-list>

  <ion-infinite-scroll on-infinite="loadMore()" distance="1%"> </ion-infinite-scroll>
</ion-content>
```

使用 one-time binding,track by 和 native scrolling 组合有最好的性能。

4. 缓存试图

   ```javascript
   angular.module("yourModule").config(function ($ionicConfigProvider) {
     $ionicConfigProvider.views.maxCache(5);
   });
   ```

   ```javascript
   $stateProvider.state("myState", {
     cache: false,
     url: "/myUrl",
     templateUrl: "my-template.html",
   });
   ```

   ```html
   <ion-view cache-view="false"></ion-view>
   ```

5. 试图缓存事件

   ```javascript
   $scope.$on("$ionicView.loaded", function () {});
   $scope.$on("$ionicView.enter", function () {});
   $scope.$on("$ionicView.leave", function () {});
   $scope.$on("$ionicView.beforeEnter", function () {});
   $scope.$on("$ionicView.beforeLeave", function () {});
   $scope.$on("$ionicView.afterEnter", function () {});
   $scope.$on("$ionicView.afterLeave", function () {});
   $scope.$on("$ionicView.unloaded", function () {});
   ```

   正确使用事件加载数据可以优化程序
