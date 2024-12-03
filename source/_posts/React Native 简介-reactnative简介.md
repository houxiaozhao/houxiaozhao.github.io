---
title: React Native 简介
date: 2017-05-05 15:54:18.0
updated: 2022-03-08 10:43:26.688
url: /archives/reactnative简介
categories:
tags:
  - ReactNative Ionic
---

# react native 开发 IOS 手机应用基本方法及其与 IONIC 开发的对比

## 1. react-native 介绍

react-native 是一款基于 js 框架 React.js 来开发 IOS 和 Android 原生 App 的开源框架，

Learn once,write anywhere

  <!--more-->

- NR 和 react.js 关系

  RN 和 react.js 公用一些抽象层，比如语法标签等，但还是有许多差异，而且目标平台不同。

- 案例：http://reactnative.cn/cases.html

- ionic 与 RN：ionic 是 webview，NR 是以 js 方式开发的原生应用

## 2. 搭建开发环境

macOS =>iOS

- 安装 Homebrew==dpkg

  ```
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  ```

- 安装 node

  ```
  brew install node
  ```

- 安装 yarn

  ```
  npm install -g yarn
  ```

- 安装 react-native-cli

  ```
  npm install -g react-native-cli
  ```

- 安装 Xcode

  App Store 下载

- 安装 Watchman（非必需）(监视文件系统变更)

  ```
  brew install watchman
  ```

  ​

## 3. Hello World

```
react-native init myapp
cd myapp
react-native run-ios
```

packager

![](http://i1.piimg.com/567571/6a6e6c2842de1261.png)![](http://p1.bpimg.com/567571/bc237af092afadf1.png)

修改 index.ios.js 文件

```Jsx
import React, { Component } from 'react';
import { AppRegistry, Text ,View} from 'react-native';

class MyApp extends Component {
  render() {
    return (
      <View>
      	<Text>Hello world!{this.props.sss}</Text>
      </View>
    );
  }
}
AppRegistry.registerComponent('myapp', () => MyApp);
```

## 4. ES6 语法(ECMAScript6)

#### ES 与 JS 的关系

ES 是标准

JS 是实现

#### 常用：

let 和 const

- let 用来声明变量。只在所在的代码块内有效。

  ```javascript
  //不存在变量提升
  // var 的情况
  console.log(foo); // 输出undefined
  var foo = 2;

  // let 的情况
  console.log(bar); // 报错ReferenceError
  let bar = 2;
  ```

  ```javascript
  //暂时性死区
  var tmp = 123;
  if (true) {
    tmp = "abc"; //报错
    let tmp;
  }
  ```

  ```javascript
  // 报错
  function () {
    let a = 10;
    var a = 1;
  }

  // 报错
  function () {
    let a = 10;
    let a = 1;
  }
  ```

  ​

- const 定义常量

模版字符串``（反引号）

```javascript
//之前定义html字符串
$("#result").append("There are <b>" + basket.count + "</b> " + "items in your basket, " + "<em>" + basket.onSale + "</em> are on sale!");
//使用模版字符串，在字符串中可以嵌入变量
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
//可以调用函数
function fn() {
  return "Hello World";
}
`foo ${fn()} bar`; // foo Hello World bar
```

遍历器：为不同的数据结构提供统一的访问机制。

​ 任何数据结构只要部署 Iterator 接口，都可以被遍历（Array，Object，Map，Set）

​ for … of ...循环

引入了类 class 关键词

Module（模块）常用！！

react native 必须用的

- import ( ) from ()/export

- class () extends ()

- (Data)=>{

- }

- function(data){

- }

- …（扩展运算符）

  扩展语法允许在需要多个参数（用于函数调用）或多个元素（用于数组文本）或多个变量（用于解构分配）的位置扩展表达式。https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator

浏览器不支持？Babel 转码器

## 5. JSX 语法

将 xml 结构的语法嵌入到 js 中

React 的核心机制之一就是可以在内存中创建虚拟 DOM 元素。React 利用虚拟 DOM 来减少对实际 DOM 的操作从而提升性能

JSX 就是将 Javascript 和 XML 结合的一种格式。React 发明了 JSX，利用 HTML 语法来创建 DOM。

当遇到<时，jsx 就当 html 解析

当遇到{时，jsx 就当 javascript 解析

react 与 angularjs 的最大的区别

- 增强 html
- 增强 js

解释上边的 hello world

- 引入 react 和 react-native 基础包
- 定义一个组件（类）
- 渲染方法 render()
- 返回 jsx 语句
- 使用 AppRegistry 将 MyApp 注册到应用中（根容器）

## 6. Flex 布局

基本的样式属性

- flexDirection：row,row-reverse,column,column-reverse
- justifyContent：flex-start,center,flex-end,space-around,space-between
- alignItems：flex-start,center,flex-end,stretch
- flexWrap：wrap,nowrap

## 7. 网络请求

#### ajax 方式：

```javascript
var xhr = new XMLHttpRequest();
xhr.open("GET", url);
xhr.responseType = "json";
xhr.onload = function () {
  console.log(xhr.response);
};
xhr.onerror = function () {
  console.log("Oops, error");
};
xhr.send();
```

#### angularjs 方式：

```javascript
$http
  .get(url)
  .success(function (data) {
    console.log(data);
  })
  .error(function (err) {
    console.log(err);
  });
```

#### Fetch 方式

- 箭头函数

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e));
```

- 普通回调

```javascript
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (e) {
    console.log("Oops, error");
  });
```

- async/await 终极优化

```javascript
try {
  let response = await fetch(url);
  let data = response.json();
  console.log(data);
} catch (e) {
  console.log("Oops, error", e);
}
// 注：这段代码如果想运行，外面需要包一个 async function
```

## 8. react native 基础知识

#### 属性 props

- 一般使用在自定义组件中,用来提高自定义组件的可复用性
- 在父组件中指定，在组件的生命周期中不会改变

```jsx
import React, { Component } from "react";
import { AppRegistry, Text, View } from "react-native";
//自定义组件
class Greeting extends Component {
  render() {
    return <Text>Hello {this.props.hh}!</Text>;
  }
}
class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{ alignItems: "center" }}>
        <Greeting name="Rexxar" hh="asd" />
        <Greeting name="Jaina" />
        <Greeting name="Valeera" />
      </View>
    );
  }
}
AppRegistry.registerComponent("LotsOfGreetings", () => LotsOfGreetings);
```

#### 状态 state

- 组件内部存在需要改变的数据，或者组件存在不同状态信息
- 在 constructor()中初始化 state，改变状态时需要调用 setState 方法

#### 组件生命周期

- 图解

![http://img.blog.csdn.net/20160703034722480](http://img.blog.csdn.net/20160703034722480)

#### 处理文本输入

- TextInput 组件 有一个 onChangeText 的属性。(状态)

  ```jsx
  import React, { Component } from "react";
  import { AppRegistry, Text, TextInput, View } from "react-native";

  class PizzaTranslator extends Component {
    constructor(props) {
      super(props);
      this.state = { text: "" };
    }

    render() {
      return (
        <View style={{ padding: 10 }}>
          <TextInput style={{ height: 40 }} placeholder="Type here to translate!" onChangeText={text => this.setState({ text })} />
          <Text>{this.state.text}</Text>
        </View>
      );
    }
  }
  AppRegistry.registerComponent("PizzaTranslator", () => PizzaTranslator);
  ```

## 9. ionic 简单介绍

​ 官网介绍：**_The top open source framework for building amazing mobile apps._**

####1. 主要技术

- HTML5
- JavaScript
- Angularjs
- Cordova
- Sass
- Typescript（ionic2）

####2. 特点

- 使用 Javascript MVVM 框架和 Angularjs 来构建应用
- 双向绑定
- web 思维
- 跨平台

## 10.react native 与 ionic 对比

#### 1. 跨平台特性

​ ionic：write once，run anywhere

​ react native：learn once, write anywhere

#### 2. 学习曲线

​ ionic: 只需要会 html css js 既可

​ react native ：只需要 js 既可 😄，当然不是普通的 js

#### 3. 功能

​ 两种方式都基本实现了所有的 native 原生 api，不过可能需要自己写代码。。。

#### 4. 性能

​ ionic：在 ios 上基本无法区分是否原生 app

​ android 上需要使用 ionic-native-transitions 插件调用原生组件，性能略差

​ 对于配置低的 android，添加 crosswalk 插件后，体验有所提升，打包偏大

​ react native： 基本接近原生 app

#### 5. 总结

##### ionic ：

优势： ios 和 android 基本上可以共用代码，纯 web 思维

​ 文档很全，系统级支持封装较好，所有 UI 组件都是有 html 模拟，可以统一使用。

​ 可实现在线更新 允许加载动态加载 web js

​ 技术成熟

劣势：

​ 占用内存高一些，动画不自然，用户体验较差。

##### react-native ：

优势

​ 1、使用 js 进行开发。用户体验，高于 html，开发效率较高

​ 2、flexbox 布局 据说比 native 的自适应布局更加简单高效 可实现在线更新

​ 3、允许运行于 JavascriptCore 的动态加载代码 更贴近原生开发

劣势：

​ 对开发人员要求较高，不是懂点 web 技术就行的，当官方封装的控件、api 无法满足需求时 就必然需要懂一些 native 的东西去扩展，扩展性仍然远远不如 web，也远远不如直接写 Native code。

## 11. 写一个小应用

#### 1. 简单需求描述

- 要有文章列表

  ![](http://i1.piimg.com/567571/04896860f59c4aca.png)

- 要有图片列表

  ![](http://p1.bpimg.com/567571/63adc06835b318cf.png)

- 要有地图

  ![](http://p1.bpimg.com/567571/135c6fb9e748fdcb.png)

- 三个功能，还需要 tab

#### 2. 准备阶段

- 接口准备：

  分类数据: http://gank.io/api/data/数据类型/请求个数/第几页

  数据类型： 福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all

  请求个数： 数字，大于 0

  第几页：数字，大于 0

- 功能所需插件准备：

      "react-native-maps": "0.13.0",//地图
      "react-native-router-flux": "^3.37.0",//路由
      "react-native-vector-icons": "^4.0.0"//字体图标

- 应用框架图

  ![](http://p1.bpimg.com/567571/4428f3dd8b905115.png)

#### 3.开发

- 新建项目 init

- 定义路由

  ```Jsx
  <Router onExitApp={this._backAndroidHandler}>
                  <Scene key="root" hideNavBar>
                      <Scene key="tabbar" tabs tabBarStyle={{ backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#BBB' }}>
                          <Scene key="tab1" initial title="前端" icon={TabIcon} tabIcon="home" navigationBarStyle={{ backgroundColor: '#ffdb42' }}>
                              <Scene key='article' component={Article} title='Web Front-end' />
                              <Scene key='articlecontent' component={ArticleContent} title="content" hideTabBar/>
                          </Scene>
                          <Scene key="tab2" title="妹纸" icon={TabIcon} tabIcon="venus" navigationBarStyle={{ backgroundColor: '#ffdb42' }}>
                              <Scene key='meizhi' component={MeiZhi} title='妹纸图' />
                          </Scene>
                           <Scene key="tab3" title="地图" icon={TabIcon} tabIcon="map" navigationBarStyle={{ backgroundColor: '#ffdb42' }}>
                              <Scene key='maps' component={Maps} title='Maps' />
                          </Scene>
                          <Scene key="tab4"  title="布局" icon={TabIcon} tabIcon="user-o" navigationBarStyle={{ backgroundColor: '#ffdb42' }}>
                              <Scene key='contacts' component={Contacts} title='flex布局' />
                          </Scene>
                      </Scene>
                  </Scene>
              </Router>
  ```

- 开发文章列表页面

- 开发文章详情页面

- 开发图片列表页面

- 开发地图显示页面

#### 4.优化

- 文章列表和图片列表的下拉刷新和上拉加载
- 点击图片显示大图
