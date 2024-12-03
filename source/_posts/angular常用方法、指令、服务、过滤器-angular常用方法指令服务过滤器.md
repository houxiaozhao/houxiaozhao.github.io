---
title: Angular核心功能详解：方法、指令、服务与过滤器
date: 2018-03-25 15:50:50.0
categories:
  - 前端开发
  - Angular开发
tags:
  - Angular
  - JavaScript
  - 前端框架
  - Web开发
  - 指令系统
  - 服务注入
  - 过滤器
  - DOM操作
keywords:
  - Angular方法
  - Angular指令
  - Angular服务
  - Angular过滤器
  - ngRepeat指令
  - ngModel绑定
  - 依赖注入
  - 数据操作
  - DOM事件处理
  - 表单验证
  - 数组操作
  - 对象操作
  - 数据过滤
  - 日期格式化
  - JSON处理
description: |
  本文系统性地介绍了Angular框架中最常用且重要的核心功能组件。详细讲解了Angular中的基础方法，包括数组和对象的拷贝（angular.copy）、DOM元素选择（angular.element）、值比较（angular.equals）、对象迭代（angular.forEach）、JSON转换（angular.fromJson/toJson）以及类型判断等实用工具方法。深入探讨了Angular的指令系统，涵盖了事件处理（ng-click、ng-dblclick、ng-blur、ng-focus）、条件渲染（ng-if、ng-show/hide）、列表渲染（ng-repeat）、表单控制（ng-model、ng-submit）等常用指令的使用方法和最佳实践。同时详细说明了Angular内置服务（$http、$interval、$timeout、$filter等）的功能特点和使用场景，以及内置过滤器（date、currency、filter、orderBy等）的实际应用，为开发者提供了全面的Angular功能参考指南。

  This article provides a comprehensive overview of Angular's core functional components. It thoroughly explains Angular's fundamental methods, including array and object copying (angular.copy), DOM element selection (angular.element), value comparison (angular.equals), object iteration (angular.forEach), JSON conversion (angular.fromJson/toJson), and type checking utilities. The article delves deep into Angular's directive system, covering event handling (ng-click, ng-dblclick, ng-blur, ng-focus), conditional rendering (ng-if, ng-show/hide), list rendering (ng-repeat), form control (ng-model, ng-submit), and their best practices. It also details Angular's built-in services ($http, $interval, $timeout, $filter) and their use cases, along with built-in filters (date, currency, filter, orderBy) and their practical applications. This guide serves as a comprehensive reference for developers working with Angular's core functionalities, providing detailed examples and implementation guidelines for each feature discussed.
---

# angular 方法

## 1. 拷贝数组或对象

```javascript
angular.copy(source, [destination]);
```

## 2. 选择一个元素

```javascript
angular.element(element); //jqLite
```

  <!--more-->

## 3. 比较值是否相等

```javascript
angular.equals(o1, o2); //返回值：boolean
```

## 4. 迭代对象

```javascript
angular.forEach(obj, iterator, [context]); //iteeator是一个方法function(value,key,[obj]){处理代码}
```

## 5. 把 json 字符串转换为对象

```javascript
angular.fromJson(json);
```

## 6.把对象转换为 json 字符串

```javascript
angular.toJson(obj, pretty); //pretty为ture时，输出字符串有换行符和空格。如果设置为一个整数，JSON输出将包含许多空间每缩进（默认为2）
```

## 7. 判断是否为数组、时间、DOM 元素、函数、数字、对象、字符串、未定义、

```javascript
angular.isArray(value);
angular.isDate(value);
angular.isElement(value);
angular.isFunction(value);
angular.isNumber(value);
angular.isObject(value);
angular.isString(value);
angular.isUndefined(value);
```

# angular 指令

## 1. 失去焦点事件

```html
ngBlur
```

## 2.值改变时触发事件

```html
<input
        ng-change="">
...
</input>
```

## 3. 动态设置 class

```html
<input
        ng-class="">
...
</input>
```

## 4. 点击事件

```html
<ANY ng-click="expression"> ... </ANY>
```

## 5. 双击事件

```html
<ANY ng-dblclick="expression"> ... </ANY>
```

## 6. 禁用元素

```html
<INPUT
  ng-disabled="expression">
...
</INPUT>
```

## 7. 获得焦点触发事件

```html
<window, input, select, textarea, a
  ng-focus="expression">
...
</window, input, select, textarea, a>
```

## 8. 显示、隐藏元素

```html
<ANY ng-hide="true"> </ANY> <ANY ng-show="true"> </ANY>
```

## 9. 判断来确定是否进行显示

```html
<ANY ng-if="expression"> ... </ANY>
```

## 10. 导入其他页面

```html
<ANY ng-include="" [onload="" ] [autoscroll="" ]> ... </ANY>
```

## 11. 将输入文本转换为数组

```html
<input
        [ng-list=""]>
</input>
输入的文本会转换数组，默认用，分割
```

## 12. 只读

```html
ngReadonly
```

## 13. 遍历

```html
<div ng-repeat="(key, value) in myObj">...</div>
```

## 14.提交表单

```html
<form ng-submit="">...</form>
```

## 15. switch

```html
<select ng-model="selection" ng-options="item for item in items"></select>
<div class="animate-switch-container" ng-switch on="selection">
  <div class="animate-switch" ng-switch-when="settings|options" ng-switch-when-separator="|">Settings Div</div>
  <div class="animate-switch" ng-switch-when="home">Home Span</div>
  <div class="animate-switch" ng-switch-default>default</div>
</div>
<!--ngSwitch指令包含ng-switch on、ng-switch-when、ng-switch-default功能类似switch，ng-switch on指要判断的值，ng-switch-when指条件条件符合将显示这个dom元素， ng-switch-default指条件都不符合默认显示的元素-->
```

# service

1. 过滤器\$filter
2. \$http
3. 循环\$interval
4. \$log
5. \$q
6. 延时\$timeout
7. \$window

# 内置过滤器

1. 格式化数字 currency
2. 格式化日期事件 date
3. 过滤数组 filter
4. 将对象转换为 json 字符串 json
5. 截取数组 limitTo
6. 转化小写大写 lowercase、uppercase
7. 格式化数字 number
8. 排序 orderBy
