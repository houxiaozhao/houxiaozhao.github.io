---
title: 使用PopClip调起uTools
date: 2022-04-15 12:20:14.332
updated: 2022-04-15 12:23:53.505
url: /archives/shi-yong-popclip-diao-qi-utools
categories:
tags:
---

在我这里 PopClip 和 uTools 都是重要的生产工具，把两者关联到一起可以进一步提高效率

### 前提

PopClip 更新到 2021.11 版本或以上，支持快速安装扩展

扩展如下

```yml
# popclip js
name: Utools
requirements: [text]
actions:
  - title: 用Utools打开
    icon: circle filled U
    javascript: popclip.pressKey(util.constant.KEY_SPACE, util.constant.MODIFIER_OPTION);popclip.pasteText(popclip.input.text)
```

选择上边文字，然后点击`install Extension "Utools"`
如果没有弹出 popclip 菜单，就把上边内容复制到其他位置再试。
![image](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/05/20/KyGHW6.png)

如果打开 uTools 的快捷键不是 opt+空格，需要替换 popclip.pressKey 的内容
具体查看
https://pilotmoon.github.io/PopClip-Extensions/interfaces/Util.html#constant

以上，就可以快速的使用 Utools 内丰富的插件了
