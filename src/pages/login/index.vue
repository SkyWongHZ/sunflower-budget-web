<template>
  <view class="login-page">
    <view class="login-container">
      <view class="login-header">
        <text class="login-title">欢迎登录</text>
        <text class="login-subtitle">请输入您的账号密码</text>
      </view>

      <view class="login-form">
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
          clearable
        />

        <CustomButton
          type="primary"
          size="large"
          :loading="loading"
          @click="handleLogin"
          class="login-button"
        >
          登录
        </CustomButton>
      </view>
    </view>

    <Loading :visible="loading" text="登录中..." />
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { CustomInput, CustomButton, Loading } from '@/components'
import { login } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { validateRequired, validatePhone } from '@/utils/validate'

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

// 加载状态
const loading = ref(false)

// 用户状态管理
const userStore = useUserStore()

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

  if (formData.password.length < 6) {
    errors.password = '密码长度至少6位'
    return false
  }

  return true
}

// 处理登录
const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const response = await login({
      username: formData.username,
      password: formData.password
    })

    if (response.code === 200) {
      // 保存登录状态
      userStore.login(response.data.token, response.data.userInfo)
      
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })

      // 跳转到首页
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/index/index'
        })
      }, 1500)
    }
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.login-container {
  width: 100%;
  max-width: 600rpx;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 60rpx 40rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 60rpx;
}

.login-title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 20rpx;
}

.login-subtitle {
  font-size: 28rpx;
  color: #666;
  display: block;
}

.login-form {
  .login-button {
    width: 100%;
    margin-top: 40rpx;
  }
}
</style> 