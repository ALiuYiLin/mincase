import {  defineConfig } from 'vitepress'
import path from 'path'
import { mdPlugin } from './plugins';
import { viteConfig } from './config/vite';

const docRoot = path.resolve(__dirname,"..","..","docs")
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MinCase",
  description: "A VitePress Site",
  lastUpdated:true,
  // lang:'zh',
  srcDir:"src",
  markdown:{
    config: (md) => mdPlugin(md)
  },
  vite:viteConfig,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '案例', link: '/cases' },
      { text: '工具', link: '/tools' }

    ],
    outline:{
      level:'deep',
      label:'页面导航'
    },
    footer:{
      message:"联系邮箱: scliuyilin@163.com",
    },
    search:{
      provider:'local'
    },
    sidebar: {
      "/cases/":[
        {
          text: '案例',
          link:"/cases",
          items: [
            { 
              text: '运维',
              collapsed:true,
              items:[
                {text:"nginx部署",link:'/cases/dev/web-page-deployment'},
                {text:"ssl证书部署",link:'/cases/dev/ssl'}
              ]
            },
            { 
              text: 'vue',
              collapsed:true,
              items:[
                {text: 'svg组件封装',link:'/cases/vue/svg-icon-plugin'},
                {text: 'mock集成',link:'/cases/vue/mock-plugin'}
              ]
            }
          ]
        }
      ],
      "tools":[

      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})


