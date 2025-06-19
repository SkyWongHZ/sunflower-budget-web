<template>
  <view v-if="visible" class="loading-overlay" :class="{ 'loading-overlay--full': fullscreen }">
    <view class="loading-content">
      <view class="loading-spinner">
        <view class="loading-dot" v-for="i in 3" :key="i"></view>
      </view>
      <text v-if="text" class="loading-text">{{ text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  visible?: boolean
  text?: string
  fullscreen?: boolean
}

withDefaults(defineProps<Props>(), {
  visible: false,
  text: '加载中...',
  fullscreen: false
})
</script>

<style lang="scss" scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1000;

  &--full {
    position: fixed;
    z-index: 9999;
  }
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-spinner {
  display: flex;
  gap: 8rpx;
}

.loading-dot {
  width: 16rpx;
  height: 16rpx;
  background: #409eff;
  border-radius: 50%;
  animation: loading-bounce 1.4s ease-in-out infinite both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }
}

.loading-text {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #606266;
}

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style> 