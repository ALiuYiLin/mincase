# Vue3+TypeScript+Vite项目集成Mock

## 1、快速创建vue3+TypeScript+vite项目

```bash
 npm create vite@latest example-vite-plugin-mock --template vue
 cd example-vite-plugin-mock
 npm install
```

## 2、安装vite-plugin-mock&mockjs依赖

```bash
npm install vite-plugin-mock mockjs @types/mockjs -D
npm install axios
```

## 3、创建模块化文件

项目结构

```bash
+---mock
|   +---modules
|   |   \---user
|   |           index.ts
|   |
|   \---types
|           index.ts
|
+---public
|       vite.svg
|
\---src
    |   App.vue
    |   main.ts
    |   mockProdServer.ts
    |   style.css
    |   vite-env.d.ts
    |
    +---assets
    |       vue.svg
    |
    +---components
    |       HelloWorld.vue
    |
    \---utils
            axiosConfig.ts
```

### 3.1、创建类型定义文件 `mock/types/index.ts`

```typescript
export interface ResponseData<T = any>{
 code: number,
 data: T,
 message: string
}

export interface MockRequestParams{
 url: string
 query: Record<string,any>
 body: any
 headers: Record<string, string>
}
```

### 3.2、创建mock数据文件`mock/modules/user/index.ts`

```typescript
import { MockMethod } from 'vite-plugin-mock'
import { ResponseData } from '../../types'
import Mock from 'mockjs'

// 用户列表接口
const getUserList = {
  url: '/api/users',
  method: 'get',
  response: (): ResponseData => ({
    code: 200,
    data: Mock.mock({
      'list|10': [
        {
          'id|+1': 1,
          name: '@cname',
          email: '@email',
          'age|20-60': 1
        }
      ]
    }),
    message: 'success'
  })
}

// 用户详情接口
const getUserDetail = {
  url: '/api/user/:id',
  method: 'get',
  response: ({ query }): ResponseData => ({
    code: 200,
    data: Mock.mock({
      id: query.id,
      name: '@cname',
      email: '@email'
    }),
    message: 'success'
  })
}

export default [getUserList, getUserDetail] as MockMethod[]
```

### 3.3、创建`mockProdServer.ts`动态加载模块暴露Mock启动方法

```typescript
import { createProdMockServer } from 'vite-plugin-mock/client'

const modules = import.meta.glob('../mock/modules/**/*.ts',{eager:true})

const mockModules = Object.values(modules).flatMap((module:any)=>{
  return module.default || []
})


export async function setupProdMockServer() {
  createProdMockServer(mockModules)
}
```

### 3.4、在`main.ts`配置开发环境启用Mock

```typescript
// production mock server
if (process.env.NODE_ENV === 'production') {
  import('./mockProdServer').then(({ setupProdMockServer }) => {
    setupProdMockServer()
  })
}
```

### 3.5、配置axios在`src/utils/axiosConfig.ts`

```typescript
import axios from "axios";

// 创建axios实例
const axiosInstance = axios.create({
  baseURL:'/',
  timeout:5000
})

export default axiosInstance
```

## 4、最后在`vite.config.ts`中配置`vitePluginMock`

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
      logger: true,
    })
  ],
})

```






