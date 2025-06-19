# uni-app 页面跳转机制指南

## 1. 页面注册

在uni-app中，所有页面都需要在 `pages.json` 文件中注册才能访问。

### pages.json 配置示例：
```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": "首页"
      }
    },
    {
      "path": "pages/pageA/index",
      "style": {
        "navigationBarTitleText": "页面A"
      }
    }
  ]
}
```

**重要说明：**
- `pages` 数组中的第一项为应用启动页
- `path` 不需要添加 `.vue` 后缀
- 每个页面目录下的 `index.vue` 文件对应 `path` 中的路径

## 2. uni-app 页面跳转 API

uni-app **不使用** Vue Router，而是提供了自己的页面跳转API：

### 2.1 uni.navigateTo() - 保留当前页面
```typescript
// 跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面
uni.navigateTo({
  url: '/pages/pageA/index'
})

// 携带参数跳转
uni.navigateTo({
  url: '/pages/detail/index?id=123&name=test'
})
```

**特点：**
- 保留当前页面，不会销毁
- 可以返回上一页
- 页面栈最多10层

### 2.2 uni.redirectTo() - 关闭当前页面
```typescript
// 关闭当前页面，跳转到应用内的某个页面
uni.redirectTo({
  url: '/pages/login/index'
})
```

**特点：**
- 关闭当前页面
- 不能返回上一页
- 不会增加页面栈层数

### 2.3 uni.reLaunch() - 关闭所有页面
```typescript
// 关闭所有页面，打开到应用内的某个页面
uni.reLaunch({
  url: '/pages/index/index'
})
```

**特点：**
- 清空整个页面栈
- 重新启动应用
- 常用于登录后跳转首页

### 2.4 uni.switchTab() - 跳转到 tabBar 页面
```typescript
// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
uni.switchTab({
  url: '/pages/index/index'
})
```

**特点：**
- 只能跳转到 tabBar 页面
- 不能携带参数

### 2.5 uni.navigateBack() - 返回上一页
```typescript
// 返回上一页面
uni.navigateBack()

// 返回上2页
uni.navigateBack({
  delta: 2
})
```

**特点：**
- `delta` 表示返回的页面数
- 如果 delta 大于现有页面数，则返回到首页

## 3. 页面间传参

### 3.1 通过 URL 传参
```typescript
// 发送方
uni.navigateTo({
  url: '/pages/detail/index?id=123&name=张三&age=25'
})

// 接收方 (onLoad 生命周期)
export default {
  onLoad(option) {
    console.log(option.id)    // 123
    console.log(option.name)  // 张三
    console.log(option.age)   // 25
  }
}

// Vue3 Composition API 方式
import { onLoad } from '@dcloudio/uni-app'

onLoad((option) => {
  console.log(option)
})
```

### 3.2 通过全局状态传参
```typescript
// 使用 Pinia store
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
userStore.setTempData({ id: 123, name: '张三' })

uni.navigateTo({
  url: '/pages/detail/index'
})
```

### 3.3 通过本地存储传参
```typescript
// 发送方
uni.setStorageSync('tempData', { id: 123, name: '张三' })
uni.navigateTo({
  url: '/pages/detail/index'
})

// 接收方
const tempData = uni.getStorageSync('tempData')
console.log(tempData)
```

## 4. 生命周期函数

### 4.1 页面生命周期
```typescript
import { onLoad, onShow, onReady, onHide, onUnload } from '@dcloudio/uni-app'

export default {
  onLoad(option) {
    // 页面加载时触发，只触发一次
    console.log('页面参数:', option)
  },
  
  onShow() {
    // 页面显示/切入前台时触发
    console.log('页面显示')
  },
  
  onReady() {
    // 页面初次渲染完成时触发，只触发一次
    console.log('页面渲染完成')
  },
  
  onHide() {
    // 页面隐藏/切入后台时触发
    console.log('页面隐藏')
  },
  
  onUnload() {
    // 页面卸载时触发
    console.log('页面卸载')
  }
}

// Vue3 Composition API 方式
onLoad((option) => {
  console.log('页面加载:', option)
})

onShow(() => {
  console.log('页面显示')
})
```

## 5. 实际应用示例

### 5.1 列表页跳转详情页
```typescript
// 列表页
const goToDetail = (item: any) => {
  uni.navigateTo({
    url: `/pages/detail/index?id=${item.id}&title=${encodeURIComponent(item.title)}`
  })
}
```

### 5.2 表单提交后跳转
```typescript
// 表单页
const handleSubmit = async () => {
  try {
    await submitForm(formData)
    
    uni.showToast({
      title: '提交成功',
      icon: 'success'
    })
    
    // 提交成功后返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
    
  } catch (error) {
    uni.showToast({
      title: '提交失败',
      icon: 'none'
    })
  }
}
```

### 5.3 登录后跳转
```typescript
// 登录页
const handleLogin = async () => {
  try {
    const result = await login(formData)
    
    // 保存登录状态
    userStore.login(result.token, result.userInfo)
    
    // 清空页面栈，跳转到首页
    uni.reLaunch({
      url: '/pages/index/index'
    })
    
  } catch (error) {
    uni.showToast({
      title: '登录失败',
      icon: 'none'
    })
  }
}
```

## 6. 最佳实践

### 6.1 封装跳转方法
```typescript
// utils/navigation.ts
export const navigationUtils = {
  // 安全跳转 - 检查页面是否存在
  navigateTo(url: string) {
    uni.navigateTo({
      url,
      fail() {
        uni.showToast({
          title: '页面不存在',
          icon: 'none'
        })
      }
    })
  },
  
  // 带确认的跳转
  navigateWithConfirm(url: string, message = '确定要离开当前页面吗？') {
    uni.showModal({
      title: '确认',
      content: message,
      success(res) {
        if (res.confirm) {
          uni.navigateTo({ url })
        }
      }
    })
  },
  
  // 回到首页
  goHome() {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }
}
```

### 6.2 页面栈管理
```typescript
// 获取当前页面栈
const pages = getCurrentPages()
console.log('当前页面栈长度:', pages.length)
console.log('当前页面:', pages[pages.length - 1].route)

// 检查是否可以返回
const canGoBack = pages.length > 1
if (canGoBack) {
  uni.navigateBack()
} else {
  uni.reLaunch({
    url: '/pages/index/index'
  })
}
```

## 7. 注意事项

1. **页面路径**：必须以 `/` 开头，相对于项目根目录
2. **参数传递**：URL 参数会被自动 decode，中文等特殊字符需要 encodeURIComponent
3. **页面栈限制**：最多10层，超过会自动销毁最底层页面
4. **tabBar 页面**：只能使用 `uni.switchTab()` 跳转
5. **生命周期**：注意页面的生命周期，避免重复操作

这套页面跳转机制是uni-app的核心功能之一，熟练掌握后可以灵活处理各种页面跳转场景。 