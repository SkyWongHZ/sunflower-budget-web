<template>
  <view class="home-page">
    <view class="home-header">
      <text class="welcome-text">欢迎使用</text>
      <text class="app-title">{{ title }}</text>
      <text v-if="isLogin" class="user-greeting">你好，{{ userInfo?.nickname || '用户' }}！</text>
    </view>

    <view class="home-content">
      <view class="feature-grid">
        <view class="feature-item" @click="navigateToFeature('budget')">
          <text class="feature-icon">💰</text>
          <text class="feature-title">预算管理</text>
          <text class="feature-desc">管理您的收支预算</text>
        </view>

        <view class="feature-item" @click="navigateToFeature('expense')">
          <text class="feature-icon">📊</text>
          <text class="feature-title">支出记录</text>
          <text class="feature-desc">记录日常支出明细</text>
        </view>

        <view class="feature-item" @click="navigateToFeature('report')">
          <text class="feature-icon">📈</text>
          <text class="feature-title">统计报表</text>
          <text class="feature-desc">查看支出统计分析</text>
        </view>

        <view class="feature-item" @click="navigateToFeature('settings')">
          <text class="feature-icon">⚙️</text>
          <text class="feature-title">系统设置</text>
          <text class="feature-desc">个性化设置选项</text>
        </view>
      </view>

      <view class="action-section">
        <CustomButton
          v-if="!isLogin"
          type="primary"
          size="large"
          @click="goToLogin"
        >
          立即登录
        </CustomButton>

        <view v-else class="user-actions">
          <CustomButton
            type="primary"
            @click="navigateToFeature('expense')"
          >
            记一笔
          </CustomButton>
          
          <CustomButton
            type="success"
            plain
            @click="navigateToFeature('report')"
          >
            查看报表
          </CustomButton>
        </view>
      </view>
    </view>

    <Loading :visible="loading" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CustomButton, Loading } from '@/components'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

const title = ref('向日葵预算')
const loading = ref(false)

// 状态管理
const userStore = useUserStore()
const appStore = useAppStore()

// 计算属性
const isLogin = computed(() => userStore.isLogin)
const userInfo = computed(() => userStore.userInfo)

// 页面初始化
onMounted(() => {
  // 从本地存储恢复状态
  userStore.initFromStorage()
  appStore.initFromStorage()
  appStore.initSystemInfo()
  appStore.initNetworkListener()
})

// 导航到功能页面
const navigateToFeature = (feature: string) => {
  if (!isLogin.value && feature !== 'settings') {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    goToLogin()
    return
  }

  // 这里可以根据feature参数导航到不同的功能页面
  switch (feature) {
    case 'budget':
      uni.navigateTo({ url: '/pages/budget/index' })
      break
    case 'expense':
      uni.navigateTo({ url: '/pages/expense/index' })
      break
    case 'report':
      uni.navigateTo({ url: '/pages/report/index' })
      break
    case 'settings':
      uni.navigateTo({ url: '/pages/settings/index' })
      break
    default:
      uni.showToast({
        title: '功能开发中',
        icon: 'none'
      })
  }
}

// 跳转到登录页
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/index'
  })
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.home-header {
  padding: 100rpx 40rpx 60rpx;
  text-align: center;
  color: white;
}

.welcome-text {
  font-size: 28rpx;
  opacity: 0.8;
  display: block;
  margin-bottom: 10rpx;
}

.app-title {
  font-size: 48rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 20rpx;
}

.user-greeting {
  font-size: 32rpx;
  opacity: 0.9;
  display: block;
}

.home-content {
  background: white;
  border-radius: 40rpx 40rpx 0 0;
  padding: 60rpx 40rpx;
  min-height: 60vh;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30rpx;
  margin-bottom: 60rpx;
}

.feature-item {
  background: #f8f9fa;
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  text-align: center;
  transition: all 0.3s;

  &:active {
    transform: scale(0.95);
    background: #e9ecef;
  }
}

.feature-icon {
  font-size: 60rpx;
  display: block;
  margin-bottom: 20rpx;
}

.feature-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}

.feature-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.action-section {
  text-align: center;
}

.user-actions {
  display: flex;
  gap: 20rpx;
  justify-content: center;
}
</style>
