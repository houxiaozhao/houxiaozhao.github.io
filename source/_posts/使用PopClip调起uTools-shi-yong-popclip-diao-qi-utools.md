---
title: 使用PopClip调起uTools
date: 2022-04-15 12:20:14.332
updated: 2022-04-15 12:23:53.505
url: /archives/shi-yong-popclip-diao-qi-utools
categories: 
tags: 
---

在我这里PopClip和uTools都是重要的生产工具，把两者关联到一起可以进一步提高效率

### 前提
PopClip更新到2021.11版本或以上，支持快速安装扩展

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
如果没有弹出popclip菜单，就把上边内容复制到其他位置再试。
![image](/upload/2022/04/image.png)

如果打开uTools的快捷键不是 opt+空格，需要替换popclip.pressKey的内容
具体查看
https://pilotmoon.github.io/PopClip-Extensions/interfaces/Util.html#constant

以上，就可以快速的使用Utools内丰富的插件了