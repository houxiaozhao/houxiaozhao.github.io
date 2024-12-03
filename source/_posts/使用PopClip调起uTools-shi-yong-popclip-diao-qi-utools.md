---
title: PopClip与uTools整合：提升Mac效率工具协同体验
date: 2022-04-15 12:20:14.332
categories:
  - 效率工具
  - Mac应用
  - 软件教程
tags:
  - PopClip
  - uTools
  - Mac效率
  - 工具集成
  - 快捷操作
  - 生产力工具
  - 工作流优化
  - 自动化
keywords:
  - PopClip扩展
  - uTools插件
  - Mac生产力
  - 效率工具整合
  - 快捷键设置
  - 工具联动
  - 自动化操作
  - 工作流优化
  - 文本处理
  - 快速启动
  - 工具扩展
  - JavaScript扩展
  - 效率提升
  - 软件配置
  - 工具定制
description: |
  本文详细介绍了如何将Mac平台上两款强大的效率工具PopClip和uTools进行无缝整合，以实现更高效的工作流程。文章首先介绍了PopClip的扩展机制和uTools的基本功能，然后通过具体的JavaScript代码实现了两者的联动。重点讲解了PopClip扩展的配置过程，包括YAML格式的扩展定义、快捷键设置和文本处理逻辑。同时提供了完整的安装步骤和常见问题解决方案，帮助用户快速实现工具整合。此外，还介绍了如何根据个人需求自定义快捷键和扩展功能，使工具组合更贴合个人使用习惯。通过本文的配置方法，用户可以充分发挥PopClip的文本处理能力和uTools的插件生态优势，显著提升日常工作效率。

  This article provides a comprehensive guide on integrating two powerful Mac productivity tools: PopClip and uTools, to achieve an enhanced workflow efficiency. It begins with an introduction to PopClip's extension mechanism and uTools' core functionalities, followed by a detailed implementation of their integration using JavaScript. The article focuses on the configuration process of PopClip extensions, including YAML-format extension definitions, hotkey settings, and text processing logic. Complete installation steps and troubleshooting solutions are provided to help users quickly achieve tool integration. Additionally, it covers customization options for hotkeys and extension features, allowing users to tailor the tool combination to their specific needs. Through the configuration methods outlined in this article, users can fully leverage PopClip's text processing capabilities and uTools' plugin ecosystem, significantly improving their daily work efficiency. The guide emphasizes practical implementation while maintaining flexibility for personal customization, making it valuable for both beginners and advanced users looking to optimize their Mac workflow.
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
