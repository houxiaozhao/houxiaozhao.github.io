---
title: Vuetify 自定义SVG图标
date: 2022-07-20 16:52:30
tags:
  - Vuetify
  - SVG
  - Vue.js
  - 前端开发
  - UI组件
  - 图标定制
  - Vite
keywords:
  - Vuetify SVG图标
  - Vue.js自定义图标
  - Vuetify图标系统
  - SVG图标集成
  - vite-plugin-svg-icons
  - Vue组件库
  - 前端UI框架
  - Material Design
  - 图标管理
  - 前端开发技术
description: |
  这篇技术文章详细介绍了如何在Vuetify框架中实现SVG图标的自定义功能。文章涵盖了使用vite-plugin-svg-icons插件进行SVG图标配置、Vuetify框架中的图标系统集成，以及实际开发中的最佳实践。对于需要在Vue.js项目中自定义Material Design风格图标的开发者来说，本文提供了完整的技术实现方案和实用建议。

  This technical article provides a comprehensive guide on implementing custom SVG icons in the Vuetify framework. It covers SVG icon configuration using vite-plugin-svg-icons plugin, integration with Vuetify's icon system, and best practices in actual development. For developers looking to customize Material Design style icons in their Vue.js projects, this article offers complete technical implementation solutions and practical recommendations.
---

# Vuetify 自定义 SVG 图标

> Vite
>
> Vuetify
>
> vite-plugin-svg-icons

1. 首先配置 svg 插件https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md

   ```javascript
   // vite.config.js
   import { defineConfig, loadEnv } from "vite";
   import legacy from "@vitejs/plugin-legacy";
   import { createVuePlugin } from "vite-plugin-vue2";
   import viteCompression from "vite-plugin-compression";
   import path from "path";
   import WindiCSS from "vite-plugin-windicss";
   import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
   import { VuetifyResolver } from "unplugin-vue-components/resolvers";
   import Components from "unplugin-vue-components/vite";
   const HOST = "0.0.0.0";

   export default ({ mode }) => {
     return defineConfig({
       base: "./",
       server: {
         host: HOST,
         port: loadEnv(mode, process.cwd()).VITE_APP_PORT,
       },
       resolve: {
         alias: {
           "@": path.resolve(__dirname, "/src"),
         },
       },
       plugins: [
         createVuePlugin(/* options */),
         legacy({
           targets: ["ie >= 11"],
           additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
         }),
         WindiCSS(),
         viteCompression(),
         // 配置插件
         createSvgIconsPlugin({
           iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
           symbolId: "icon-[dir]-[name]",
         }),
         Components({
           resolvers: [VuetifyResolver()],
         }),
       ],
     });
   };
   ```

   ```vue
   // SvgIcon.vue
   <template>
     <svg aria-hidden="true">
       <use :xlink:href="symbolId" :fill="color" />
     </svg>
   </template>

   <script>
   export default {
     name: "SvgIcon",
     props: {
       prefix: {
         type: String,
         default: "icon",
       },
       name: {
         type: String,
         required: true,
       },
       color: {
         type: String,
         default: "#333",
       },
     },
     computed: {
       symbolId() {
         return `#${this.prefix}-${this.name}`;
       },
     },
   };
   </script>
   ```

2. 配置 vuetify

   ```javascript
   import Vue from "vue";
   import Vuetify from "vuetify/lib/framework";
   import "material-design-icons-iconfont/dist/material-design-icons.css";

   import SvgIcon from "@/components/SvgIcon.vue";
   import ids from "virtual:svg-icons-names"; // 引入全部图标名

   Vue.use(Vuetify);
   export default new Vuetify({
     icons: {
       iconfont: "md", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
       values: (() => {
         const icons = {}; //处理图标，配置到vuetify
         ids.forEach(id => {
           icons[id.substr(5)] = {
             component: SvgIcon,
             props: {
               name: id.substr(5),
             },
           };
         });
         return icons;
       })(),
     },
   });
   ```

3. 使用图标

   1. 把 svg 放到 assets/icons 目录

      ![image-20220720164727101](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/07/20/5tftoo.png)

   2. icon 中使用，在名称前边加上$

      ```vue
      <v-btn icon>
        <v-icon>$dir-薯条2</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>$薯条</v-icon>
      </v-btn>
      ```

      ```vue
      <v-text-field v-model="search" label="" placeholder="请输入名称" solo hide-details prepend-inner-icon="menu" clearable style="width: 390px;" append-outer-icon="$薯条">
        <template v-slot:append>
      <v-btn icon class="ml-2" small color="primary">
        <v-icon>$dir-薯条2</v-icon>
          </v-btn>
        </template>
        <template v-slot:prepend-inner>
      <v-btn icon small color="primary" @click="$bus.emit('targetDrawer')">
        <v-icon>menu</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      ```

      ![image-20220720165136865](https://cdn.jsdelivr.net/gh/houxiaozhao/imageLibrary@master/uPic/2022/07/20/LB8nEk.png)
