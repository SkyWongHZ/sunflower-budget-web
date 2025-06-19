# 使用示例

## API接口使用

### 1. 用户登录
```typescript
import { login } from '@/api/user'

const handleLogin = async () => {
  try {
    const response = await login({
      username: 'testuser',
      password: '123456'
    })
    
    if (response.code === 200) {
      console.log('登录成功:', response.data)
    }
  } catch (error) {
    console.error('登录失败:', error)
  }
}
```

### 2. 文件上传
```typescript
import { uploadFile } from '@/api/common'

const handleUpload = async () => {
  try {
    uni.chooseImage({
      count: 1,
      success: async (res) => {
        const filePath = res.tempFilePaths[0]
        const result = await uploadFile(filePath)
        console.log('上传成功:', result.url)
      }
    })
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

## 公共组件使用

### 1. 自定义按钮
```vue
<template>
  <!-- 基础用法 -->
  <CustomButton @click="handleClick">默认按钮</CustomButton>
  
  <!-- 不同类型 -->
  <CustomButton type="primary">主要按钮</CustomButton>
  <CustomButton type="success">成功按钮</CustomButton>
  <CustomButton type="warning">警告按钮</CustomButton>
  <CustomButton type="danger">危险按钮</CustomButton>
  
  <!-- 不同尺寸 -->
  <CustomButton size="mini">迷你按钮</CustomButton>
  <CustomButton size="small">小型按钮</CustomButton>
  <CustomButton size="large">大型按钮</CustomButton>
  
  <!-- 状态 -->
  <CustomButton :loading="loading">加载中</CustomButton>
  <CustomButton disabled>禁用按钮</CustomButton>
  
  <!-- 样式 -->
  <CustomButton round>圆角按钮</CustomButton>
  <CustomButton plain>朴素按钮</CustomButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomButton } from '@/components'

const loading = ref(false)

const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

### 2. 自定义输入框
```vue
<template>
  <!-- 基础用法 -->
  <CustomInput v-model="inputValue" placeholder="请输入内容" />
  
  <!-- 带标签 -->
  <CustomInput 
    v-model="username" 
    label="用户名" 
    placeholder="请输入用户名"
    clearable
  />
  
  <!-- 密码输入 -->
  <CustomInput 
    v-model="password" 
    type="password" 
    label="密码" 
    placeholder="请输入密码"
  />
  
  <!-- 错误状态 -->
  <CustomInput 
    v-model="email" 
    label="邮箱" 
    placeholder="请输入邮箱"
    :error="emailError"
  />
  
  <!-- 带插槽 -->
  <CustomInput v-model="phone" placeholder="请输入手机号">
    <template #prefix>
      <text>🔍</text>
    </template>
    <template #suffix>
      <text>📱</text>
    </template>
  </CustomInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CustomInput } from '@/components'

const inputValue = ref('')
const username = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')
const emailError = ref('邮箱格式不正确')
</script>
```

### 3. 加载组件
```vue
<template>
  <view class="container">
    <!-- 页面内容 -->
    
    <!-- 局部加载 -->
    <Loading :visible="loading" text="数据加载中..." />
    
    <!-- 全屏加载 -->
    <Loading :visible="fullLoading" text="处理中..." fullscreen />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loading } from '@/components'

const loading = ref(false)
const fullLoading = ref(false)
</script>
```

### 4. 空状态组件
```vue
<template>
  <!-- 基础用法 -->
  <Empty text="暂无数据" />
  
  <!-- 自定义图片 -->
  <Empty 
    text="暂无订单" 
    image="/static/empty-order.png" 
  />
  
  <!-- 带操作按钮 -->
  <Empty text="网络连接失败">
    <CustomButton type="primary" @click="retry">重新加载</CustomButton>
  </Empty>
</template>

<script setup lang="ts">
import { Empty, CustomButton } from '@/components'

const retry = () => {
  console.log('重新加载')
}
</script>
```

## 状态管理使用

### 1. 用户状态管理
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 获取状态
const isLogin = computed(() => userStore.isLogin)
const userInfo = computed(() => userStore.userInfo)
const token = computed(() => userStore.token)

// 登录
const handleLogin = () => {
  userStore.login('new-token', {
    id: 1,
    username: 'testuser',
    nickname: '测试用户',
    avatar: 'avatar-url',
    email: 'test@example.com',
    phone: '13800138000'
  })
}

// 登出
const handleLogout = () => {
  userStore.logout()
}

// 更新用户信息
const updateProfile = () => {
  userStore.updateUserInfo({
    nickname: '新昵称',
    avatar: 'new-avatar-url'
  })
}
</script>
```

### 2. 应用状态管理
```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 获取状态
const theme = computed(() => appStore.theme)
const language = computed(() => appStore.language)
const loading = computed(() => appStore.loading)
const networkStatus = computed(() => appStore.networkStatus)

// 切换主题
const toggleTheme = () => {
  appStore.toggleTheme()
}

// 设置语言
const setLanguage = (lang: 'zh-CN' | 'en-US') => {
  appStore.setLanguage(lang)
}

// 设置加载状态
const setLoading = (status: boolean) => {
  appStore.setLoading(status)
}
</script>
```

## 工具函数使用

### 1. 格式化工具
```typescript
import { 
  formatMoney, 
  formatDate, 
  formatRelativeTime,
  formatPhone,
  formatFileSize 
} from '@/utils/format'

// 格式化金额
const amount = formatMoney(1234.56) // "1,234.56"
const amountWithDecimals = formatMoney(1234.567, 3) // "1,234.567"

// 格式化日期
const date = formatDate(new Date()) // "2024-01-01"
const datetime = formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss') // "2024-01-01 10:30:00"

// 相对时间
const relativeTime = formatRelativeTime(new Date(Date.now() - 60000)) // "1分钟前"

// 格式化手机号
const phone = formatPhone('13800138000') // "138****8000"

// 格式化文件大小
const size = formatFileSize(1024 * 1024) // "1 MB"
```

### 2. 验证工具
```typescript
import { 
  validatePhone, 
  validateEmail, 
  validatePassword,
  validateRequired 
} from '@/utils/validate'

// 验证手机号
const isValidPhone = validatePhone('13800138000') // true

// 验证邮箱
const isValidEmail = validateEmail('test@example.com') // true

// 验证密码
const passwordResult = validatePassword('123456Abc!')
// { valid: true, strength: 'strong', message: '密码强度很强' }

// 验证必填项
const isRequired = validateRequired('') // false
const isRequiredArray = validateRequired([]) // false
```

### 3. 存储工具
```typescript
import { 
  setStorage, 
  getStorage, 
  removeStorage,
  STORAGE_KEYS 
} from '@/utils/storage'

// 存储数据
setStorage('userInfo', { name: '张三', age: 25 })
setStorage(STORAGE_KEYS.TOKEN, 'auth-token')

// 获取数据
const userInfo = getStorage('userInfo')
const token = getStorage(STORAGE_KEYS.TOKEN)

// 获取数据（带默认值）
const theme = getStorage('theme', 'light')

// 删除数据
removeStorage('userInfo')
removeStorage(STORAGE_KEYS.TOKEN)
```

### 4. 设备工具
```typescript
import { 
  getSystemInfo,
  getPlatform,
  isIOS,
  isAndroid,
  getStatusBarHeight,
  rpxToPx 
} from '@/utils/device'

// 获取系统信息
const systemInfo = getSystemInfo()

// 获取平台
const platform = getPlatform() // 'ios' | 'android' | 'unknown'

// 平台判断
if (isIOS()) {
  console.log('当前是iOS平台')
}

if (isAndroid()) {
  console.log('当前是Android平台')
}

// 获取状态栏高度
const statusBarHeight = getStatusBarHeight() // 44

// 尺寸转换
const pxValue = rpxToPx(100) // 将100rpx转换为px
```

### 5. 通用工具
```typescript
import { 
  debounce, 
  throttle, 
  deepClone,
  generateId,
  delay,
  retry 
} from '@/utils/common'

// 防抖
const debouncedFn = debounce(() => {
  console.log('执行搜索')
}, 300)

// 节流
const throttledFn = throttle(() => {
  console.log('执行滚动处理')
}, 100)

// 深拷贝
const original = { a: 1, b: { c: 2 } }
const copied = deepClone(original)

// 生成ID
const id = generateId(8) // "AbC12345"

// 延迟执行
await delay(1000) // 等待1秒

// 重试机制
const result = await retry(async () => {
  // 可能失败的操作
  return await someApiCall()
}, 3, 1000) // 最多重试3次，每次间隔1秒
```

## 完整页面示例

```vue
<template>
  <view class="demo-page">
    <view class="form-section">
      <CustomInput 
        v-model="formData.username" 
        label="用户名"
        placeholder="请输入用户名"
        :error="errors.username"
        clearable
      />
      
      <CustomInput 
        v-model="formData.password" 
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error="errors.password"
      />
      
      <CustomButton 
        type="primary" 
        size="large"
        :loading="loading"
        @click="handleSubmit"
      >
        提交
      </CustomButton>
    </view>

    <Empty v-if="showEmpty" text="暂无数据">
      <CustomButton @click="loadData">重新加载</CustomButton>
    </Empty>

    <Loading :visible="loading" text="处理中..." />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { CustomInput, CustomButton, Empty, Loading } from '@/components'
import { useUserStore } from '@/stores/user'
import { validateRequired } from '@/utils/validate'
import { formatPhone } from '@/utils/format'
import { setStorage } from '@/utils/storage'
import { debounce } from '@/utils/common'

// 表单数据
const formData = reactive({
  username: '',
  password: ''
})

// 错误信息
const errors = reactive({
  username: '',
  password: ''
})

// 状态
const loading = ref(false)
const showEmpty = ref(false)

// 状态管理
const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)

// 防抖搜索
const debouncedSearch = debounce((keyword: string) => {
  console.log('搜索:', keyword)
}, 300)

// 表单验证
const validateForm = (): boolean => {
  errors.username = ''
  errors.password = ''

  if (!validateRequired(formData.username)) {
    errors.username = '请输入用户名'
    return false
  }

  if (!validateRequired(formData.password)) {
    errors.password = '请输入密码'
    return false
  }

  return true
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // API调用
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 存储数据
    setStorage('formData', formData)
    
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
  } catch (error) {
    console.error('提交失败:', error)
  } finally {
    loading.value = false
  }
}

// 加载数据
const loadData = () => {
  showEmpty.value = false
  // 加载逻辑
}
</script>

<style lang="scss" scoped>
.demo-page {
  padding: 40rpx;
}

.form-section {
  margin-bottom: 40rpx;
}
</style>
```

这个目录结构和使用示例为你的uni-app项目提供了完整的开发基础设施，包括：

1. **API接口管理** - 统一的请求处理和错误处理
2. **公共组件库** - 可复用的UI组件
3. **状态管理** - 全局状态管理方案
4. **工具函数库** - 常用的工具函数
5. **页面层** - 规范的页面开发模式

使用这个架构可以大大提高开发效率和代码质量。 