# 项目目录结构说明

## 整体目录结构

```
sunflower-budget-web/
├── src/                          # 源代码目录
│   ├── api/                      # API接口管理
│   │   ├── index.ts             # API统一导出
│   │   ├── request.ts           # 请求封装和拦截器
│   │   ├── user.ts              # 用户相关API
│   │   └── common.ts            # 通用API
│   │
│   ├── components/              # 公共组件库
│   │   ├── index.ts             # 组件统一导出
│   │   ├── CustomButton/        # 自定义按钮组件
│   │   │   └── index.vue
│   │   ├── CustomInput/         # 自定义输入框组件
│   │   │   └── index.vue
│   │   ├── Loading/             # 加载中组件
│   │   │   └── index.vue
│   │   ├── Empty/               # 空状态组件
│   │   │   └── index.vue
│   │   └── CustomModal/         # 自定义弹窗组件
│   │       └── index.vue
│   │
│   ├── pages/                   # 页面目录
│   │   ├── index/               # 首页
│   │   │   └── index.vue
│   │   ├── login/               # 登录页
│   │   │   └── index.vue
│   │   ├── profile/             # 个人中心
│   │   │   └── index.vue
│   │   ├── settings/            # 设置页面
│   │   └── about/               # 关于页面
│   │
│   ├── stores/                  # 状态管理 (Pinia)
│   │   ├── index.ts             # store统一导出
│   │   ├── user.ts              # 用户状态管理
│   │   └── app.ts               # 应用状态管理
│   │
│   ├── utils/                   # 工具函数库
│   │   ├── index.ts             # 工具函数统一导出
│   │   ├── format.ts            # 格式化工具
│   │   ├── validate.ts          # 验证工具
│   │   ├── storage.ts           # 本地存储工具
│   │   ├── device.ts            # 设备相关工具
│   │   └── common.ts            # 通用工具函数
│   │
│   ├── assets/                  # 静态资源
│   │   ├── images/              # 图片资源
│   │   ├── icons/               # 图标资源
│   │   └── fonts/               # 字体资源
│   │
│   ├── static/                  # 静态文件
│   │
│   ├── styles/                  # 样式文件
│   │   ├── index.scss           # 样式统一导入
│   │   ├── variables.scss       # SCSS变量
│   │   ├── mixins.scss          # SCSS混入
│   │   └── common.scss          # 通用样式
│   │
│   ├── types/                   # TypeScript类型定义
│   │   ├── index.ts             # 类型统一导出
│   │   ├── api.ts               # API相关类型
│   │   ├── user.ts              # 用户相关类型
│   │   └── common.ts            # 通用类型
│   │
│   ├── App.vue                  # 应用入口组件
│   ├── main.ts                  # 应用入口文件
│   ├── pages.json               # 页面配置
│   ├── manifest.json            # 应用配置
│   └── uni.scss                 # uni-app全局样式
│
├── package.json                 # 项目依赖配置
├── tsconfig.json               # TypeScript配置
├── vite.config.ts              # Vite构建配置
└── README.md                   # 项目说明文档
```

## 目录说明

### 1. API接口管理 (`src/api/`)

**作用**: 统一管理所有后端API接口调用

**特点**:
- `request.ts`: 封装uni.request，提供统一的请求拦截、响应处理、错误处理
- 按业务模块划分API文件 (user.ts, common.ts等)
- 提供TypeScript类型支持
- 统一的loading和错误提示处理

**使用示例**:
```typescript
import { login, getUserInfo } from '@/api/user'

// 登录
const response = await login({ username: 'test', password: '123456' })

// 获取用户信息
const userInfo = await getUserInfo()
```

### 2. 公共组件库 (`src/components/`)

**作用**: 封装可复用的UI组件

**特点**:
- 组件化开发，提高代码复用性
- 支持TypeScript类型定义
- 统一的设计规范和交互逻辑
- 支持主题定制

**使用示例**:
```vue
<template>
  <CustomButton type="primary" @click="handleClick">
    点击按钮
  </CustomButton>
  
  <CustomInput v-model="inputValue" placeholder="请输入内容" />
</template>

<script setup lang="ts">
import { CustomButton, CustomInput } from '@/components'
</script>
```

### 3. 页面层 (`src/pages/`)

**作用**: 应用的页面组件

**特点**:
- 按功能模块组织页面结构
- 每个页面一个文件夹
- 支持页面级别的样式和逻辑

### 4. 状态管理 (`src/stores/`)

**作用**: 使用Pinia进行全局状态管理

**特点**:
- 按业务模块划分store
- 支持TypeScript类型推导
- 持久化存储支持
- 响应式状态更新

**使用示例**:
```typescript
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 登录
userStore.login(token, userInfo)

// 获取登录状态
const isLogin = userStore.isLogin
```

### 5. 工具函数库 (`src/utils/`)

**作用**: 提供通用的工具函数

**分类**:
- `format.ts`: 格式化函数 (日期、金额、手机号等)
- `validate.ts`: 验证函数 (手机号、邮箱、身份证等)
- `storage.ts`: 本地存储封装
- `device.ts`: 设备信息获取
- `common.ts`: 通用工具函数 (防抖、节流、深拷贝等)

**使用示例**:
```typescript
import { formatMoney, validatePhone, setStorage } from '@/utils'

// 格式化金额
const money = formatMoney(1234.56) // "1,234.56"

// 验证手机号
const isValid = validatePhone('13800138000') // true

// 存储数据
setStorage('userInfo', { name: 'test' })
```

## 开发规范

### 1. 文件命名规范
- 文件夹: 小写字母，用短横线分隔 (kebab-case)
- Vue组件: 大驼峰命名 (PascalCase)
- TypeScript文件: 小驼峰命名 (camelCase)
- 样式文件: 小写字母，用短横线分隔

### 2. 组件开发规范
- 使用 Composition API
- 支持TypeScript类型定义
- 组件props要有默认值和类型检查
- 样式使用scoped避免污染

### 3. API接口规范
- 统一的响应格式
- 完整的错误处理
- TypeScript接口定义
- 统一的loading处理

### 4. 状态管理规范
- 按业务模块划分store
- 使用Composition API风格
- 支持持久化存储
- 提供完整的类型支持

### 5. 工具函数规范
- 函数功能单一，职责明确
- 完整的TypeScript类型定义
- 充分的错误处理
- 良好的可测试性

## 最佳实践

### 1. 组件复用
- 优先使用公共组件库中的组件
- 业务组件要考虑复用性
- 组件接口设计要灵活且稳定

### 2. 状态管理
- 合理划分全局状态和局部状态
- 避免状态冗余
- 及时清理不需要的状态

### 3. 性能优化
- 合理使用computed和watch
- 避免不必要的响应式数据
- 图片资源要压缩优化

### 4. 错误处理
- API调用要有完整的错误处理
- 用户操作要有明确的反馈
- 异常情况要有友好的提示

这个目录结构提供了完整的前后端通信、公共组件库、页面层和工具函数的划分，支持大型项目的开发和维护。 