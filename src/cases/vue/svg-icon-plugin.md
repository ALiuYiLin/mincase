# vite+typescript+vue集成vite-plugin-svg-icons插件
## 1、安装插件

```bash
npm install vite-plugin-svg-icons -D
```
## 2、插件配置
在`vit.config.ts`中添加插件配置
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs:[path.resolve(__dirname,'src/assets/icons')], //SVG 图标目录
      symbolId: 'icon-[dir]-[name]' //符号ID格式
    })
  ],
})

```
## 3、引入注册脚本
在`main.ts`文件引入注册脚本
```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import 'virtual:svg-icons-register';

const app = createApp(App)

app.mount('#app')

```
如果出现无法找到模块`virtual:svg-icons-register`
`tsconfig.json`中配置

```json
// 确保 typescript扫描了声明文件vite-plugin-svg-icons/client.d.ts 
"include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue","node_modules/vite-plugin-svg-icons/client.d.ts"]
```
## 4、封装组件SvgIcon

```typescript
<template>
  <svg class="icon" aria-hidden="true" :style="styles">
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  name:{ 
    type: String,
    required: true,
   },
  height:{
    type: Number,
    default: 16
  },
  width:{
    type: Number,
    default: 16
  },
  color:{
    type: String,
  }
})
const styles = computed(()=>({
  width: `${props.width}px`,
  height: `${props.height}px`,
  color: props.color
}))
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
```


## 5、测试
`App.vue`
```typescript
<script setup lang="ts">
import SvgIcon from './components/SvgIcon.vue';
</script>
<template>
  <div>
    <SvgIcon :name="'vue'"   :height="200" :width="200"/>
  </div>
</template>
```
