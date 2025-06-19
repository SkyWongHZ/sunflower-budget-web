<template>
  <view class="empty">
    <view class="empty__image">
      <image v-if="image" :src="image" class="empty__img" />
      <view v-else class="empty__icon">📭</view>
    </view>
    <text class="empty__text">{{ text }}</text>
    <view v-if="$slots.default" class="empty__actions">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  text?: string
  image?: string
}

withDefaults(defineProps<Props>(), {
  text: '暂无数据'
})
</script>

<style lang="scss" scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 40rpx;
  text-align: center;
}

.empty__image {
  margin-bottom: 30rpx;
}

.empty__img {
  width: 200rpx;
  height: 200rpx;
}

.empty__icon {
  font-size: 120rpx;
  opacity: 0.6;
}

.empty__text {
  font-size: 28rpx;
  color: #909399;
  margin-bottom: 30rpx;
}

.empty__actions {
  margin-top: 20rpx;
}
</style> 