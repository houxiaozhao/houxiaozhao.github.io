---
title: ionic性能优化
date: 2017-01-18 11:58:21.0
updated: 2022-03-08 10:43:23.794
url: /archives/ionic性能优化
categories: 
tags: 
- cordova ionic
---



# ionic-native-transitions

1. 下载

   npm install ionic-native-transitions --save

2. 安装

   cordova plugin add https://github.com/Telerik-Verified-Plugins/NativePageTransitions

   <!--more-->

3. 引入

   <script src="lib/ionic-native-transitions/dist/ionic-native-transitions.js"></script>

4. 如果是 ios9，页面切换抖动，则安装

   cordova plugin add cordova-plugin-wkwebvie

5. 注入

   ```javascript
   angular.module('yourApp', ['ionic-native-transitions'])
   ```

6. 配置

   ```javascript
   .config(function($ionicNativeTransitionsProvider){
       $ionicNativeTransitionsProvider.setDefaultOptions({
           duration: 400, // in milliseconds (ms), default 400,
           slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
           iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
           androiddelay: -1, // same as above but for Android, default -1
           winphonedelay: -1, // same as above but for Windows Phone, default -1,
           fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
           fixedPixelsBottom: 0 // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
           triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
           backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
       });
      $ionicNativeTransitionsProvider.setDefaultTransition({
           type: 'slide',
           direction: 'left'
       });
     $ionicNativeTransitionsProvider.setDefaultBackTransition({
           type: 'slide',
           direction: 'right'
       });
   });
   ```

7. 其他参考https://github.com/shprink/ionic-native-transitions 或者 pdf

# 删除默认滚动条

```javascript
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.scrolling.jsScrolling(false);

  // Or for only a single platform, use
  // if( ionic.Platform.isAndroid() ) {
    // $ionicConfigProvider.scrolling.jsScrolling(false);
  // }
}
```

# 使用缓存

1. 安装

   bower install --save angular-cache

2. 注入

   angular.module('myApp', ['angular-cache'])

3. 使用

   ```javascript
   .controller('Posts', function (CacheFactory) {

   if (!CacheFactory.get('postCache')) {
     CacheFactory.createCache('postCache');
   }
   var postCache = CacheFactory.get('postCache');

   // Cache a post
   postCache.put(id, data);

   // Delete from cache
   postCache.remove(id);

   // Get a post
   $scope.post = postCache.get(id);

   })
   ```

4. 详情请看https://github.com/jmdobry/angular-cache

# 使用 Crosswalk WebView

1. 安装

   cordova plugin add cordova-plugin-crosswalk-webview

2. 如果使用了第一步优化，在 config.xml 加入

   <preference name="CrosswalkAnimatable" value="true" />