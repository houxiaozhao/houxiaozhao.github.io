---
title: vue-cli3使用和Cordova集成记录
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-08-11 15:38:56.0
updated: 2022-03-08 11:34:53.49
url: /archives/vue-cli3使用和cordova集成记录
categories:
tags:
  - App Vue Cordova
---

### 1. 安装

安装过程很简单

```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

  <!--more-->

安装后使用`vue --version`查看是否安装成功

### 2. 创建项目

```sh
vue create demo
# OR
vue ui #使用ui界面进行创建
```

选项

- 默认
- 手动选择

我们选择手动选择功能，具体选择如下

```sh
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): LESS
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? No
```

选择完成后自动安装依赖，据观察如果本地安装了 yarn 的话，会使用 yarn 安装依赖。

```sh
cd demo
yarn serve
```

### 3. 项目结构和配置

vue-cli 3 生成的项目结构比 2 的要简单很多，去掉了 build、config、等文件夹

根目录两个文件夹

- src 源代码放在这里
- public 原先的 index.html 放在这个文件夹

除了两个文件夹还包括几个文件

- .eslintrc.js eslint 配置文件
- .gitignore git 的文件，用来配置忽略文件和文件夹的
- .postcssrc.js 我也不懂。。。
- babel.config.js 配置 babel 转译用的，保持不变即可

还有一个可选的配置文件 vue.config.js 默认是没有这个文件的，需要自己创建。

自用的几个配置项

```javascript
module.exports = {
  baseUrl: '', //用户部署的基本url,如果不配置默认为部署所在域的根目录，如果不要部署到子路径，则需要配置该项。如果设为空，转移后的使用相对路径引用文件。并且将所有的css js都放到了根目录
  outputDir: 'www', //输出文件夹，我这里设为www,主要是和Cordova配合生成安卓应用的。
  productionSourceMap： false, //不生成map
  runtimeCompiler: true // 包含运行时编译器的 Vue 构建版本
};

```

### 4.安卓打包

首先构造 Cordova 项目结构

- 第一个就是静态文件存放目录，www 文件夹，这就是配置`outputDir`的原因

- 另外 Cordova 还需要 res 文件夹，存放 icon，screen 等。我是直接从 Cordova 生成项目中复制出来的。

  ![](http://obr4xf51d.bkt.clouddn.com/18-8-11/92004247.jpg)

- 最重要的是 config.xml 文件(也是复制过来的?)

  ```xml
  <?xml version='1.0' encoding='utf-8'?>
  <widget id="com.wugeek.zbyx" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
      <name>众邦优选</name>
      <description>
          A sample Apache Cordova application that responds to the deviceready event.
      </description>
      <author email="dev@cordova.apache.org" href="http://cordova.io">
          Apache Cordova Team
      </author>
      <content src="index.html" />
      <plugin name="cordova-plugin-whitelist" spec="1" />
      <access origin="*" />
      <allow-intent href="http://*/*" />
      <allow-intent href="https://*/*" />
      <allow-intent href="tel:*" />
      <allow-intent href="sms:*" />
      <allow-intent href="mailto:*" />
      <allow-intent href="geo:*" />
      <platform name="android">
          <allow-intent href="market:*" />
          <icon density="ldpi" src="res/icon/android/mipmap-ldpi/ic_launcher.png" />
          <icon density="mdpi" src="res/icon/android/mipmap-mdpi/ic_launcher.png" />
          <icon density="hdpi" src="res/icon/android/mipmap-hdpi/ic_launcher.png" />
          <icon density="xhdpi" src="res/icon/android/mipmap-xhdpi/ic_launcher.png" />
          <icon density="xxhdpi" src="res/icon/android/mipmap-xxhdpi/ic_launcher.png" />
      </platform>
      <platform name="ios">
          <allow-intent href="itms:*" />
          <allow-intent href="itms-apps:*" />
      </platform>
      <engine name="android" spec="^7.0.0" />
  </widget>

  ```

- plugins 和 platforms 文件夹不用手动建。会自动生成

然后添加安卓平台`cordova platforms add android`

最后编译运行`cordova run android`

值得注意的是，这个时候 cordova 插件是有问题的，因为没有引用 Cordova.js 文件

所有在`mian.js`中判断当前平台添加`cordova.js`

```javascript
if (window.location.protocol === "file:" || window.location.port === "3000") {
  var cordovaScript = document.createElement("script");
  cordovaScript.setAttribute("type", "text/javascript");
  cordovaScript.setAttribute("src", "cordova.js");
  document.body.appendChild(cordovaScript);
}
```

安装`vue-cordova`这个插件，可以更方便访问 Cordova 的方法和属性

```javascript
Vue.cordova.on("deviceready", () => {
  console.log("Cordova : device is ready !");
});
```

PS :写的时候参考了 cli/vue3 的官网，发现已经有了中文翻译了?。就在半个月前还没有，抠配置配了好长时间。各位还是去官网看教程吧，写的很详细。[cli vue3 地址点此](https://cli.vuejs.org/zh/)

## Cordova 项目打包

生成 release 版本项目
`cordova build android --release`
生成签名文件（有的话就不需要了）
`keytool -genkey -v -keystore my.keystore -alias demo -keyalg RSA -keysize 2048 -validity 10000`
签名
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my.keystore app-release-unsigned.apk demo`

写一个 build.js 再根目录自动完成,先把 keystore 文件放到根目录

```json
{
  "android": {
    "release": {
      "keystore": "my.keystore",
      "alias": "demo",
      "storePassword": "password",
      "password": "password"
    }
  }
}
```
