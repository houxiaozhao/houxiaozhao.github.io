---
title: angular常用方法、指令、服务、过滤器
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://demontaste.com
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
date: 2018-03-25 15:50:50.0
updated: 2022-03-08 11:34:37.027
url: /archives/angular常用方法指令服务过滤器
categories:
tags:
  - angular
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
