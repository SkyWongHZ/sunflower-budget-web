<template>
  <view class="profile-page">
    <view class="profile-header">
      <view class="user-avatar">
        <image :src="userInfo?.avatar || '/static/default-avatar.png'" class="avatar-img" />
      </view>
      <view class="user-info">
        <text class="user-name">{{ userInfo?.nickname || '未设置昵称' }}</text>
        <text class="user-phone">{{ formatPhone(userInfo?.phone || '') }}</text>
      </view>
    </view>

    <view class="profile-content">
      <view class="menu-section">
        <view class="menu-item" @click="navigateTo('/pages/settings/index')">
          <text class="menu-icon">⚙️</text>
          <text class="menu-text">设置</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="navigateTo('/pages/about/index')">
          <text class="menu-icon">ℹ️</text>
          <text class="menu-text">关于我们</text>
          <text class="menu-arrow">></text>
        </view>
        
        <view class="menu-item" @click="handleFeedback">
          <text class="menu-icon">📝</text>
          <text class="menu-text">意见反馈</text>
          <text class="menu-arrow">></text>
        </view>
      </view>

      <CustomButton
        type="danger"
        size="large"
        plain
        @click="handleLogout"
        class="logout-button"
      >
        退出登录
      </CustomButton>
    </view>

    <Empty v-if="!userInfo" text="用户信息加载中..." />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CustomButton, Empty } from '@/components'
import { useUserStore } from '@/stores/user'
import { formatPhone } from '@/utils/format'

// 用户状态管理
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

// 页面导航
const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

// 意见反馈
const handleFeedback = () => {
  uni.navigateTo({
    url: '/pages/feedback/index'
  })
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.logout()
        uni.reLaunch({
          url: '/pages/login/index'
        })
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f7fa;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80rpx 40rpx 60rpx;
  display: flex;
  align-items: center;
  color: white;
}

.user-avatar {
  margin-right: 30rpx;
}

.avatar-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 36rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.user-phone {
  font-size: 28rpx;
  opacity: 0.8;
  display: block;
}

.profile-content {
  padding: 40rpx;
}

.menu-section {
  background: white;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background: #f8f9fa;
  }
}

.menu-icon {
  font-size: 32rpx;
  margin-right: 20rpx;
}

.menu-text {
  flex: 1;
  font-size: 32rpx;
  color: #333;
}

.menu-arrow {
  font-size: 28rpx;
  color: #ccc;
}

.logout-button {
  width: 100%;
}
</style> 