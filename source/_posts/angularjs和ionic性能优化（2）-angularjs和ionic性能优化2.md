---
title: angularjs和ionic性能优化（2）
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2017-01-18 11:59:21.0
updated: 2022-03-08 11:35:26.22
url: /archives/angularjs和ionic性能优化2
categories:
tags:
  - angular
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
