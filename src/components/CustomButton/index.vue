<template>
  <button 
    class="custom-button"
    :class="[
      `custom-button--${type}`,
      `custom-button--${size}`,
      {
        'custom-button--disabled': disabled,
        'custom-button--loading': loading,
        'custom-button--round': round,
        'custom-button--plain': plain
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <view v-if="loading" class="custom-button__loading">
      <text>加载中...</text>
    </view>
    <slot v-else></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'mini' | 'small' | 'normal' | 'large'
  disabled?: boolean
  loading?: boolean
  round?: boolean
  plain?: boolean
}

interface Emits {
  (e: 'click', event: Event): void
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'normal',
  disabled: false,
  loading: false,
  round: false,
  plain: false
})

const emit = defineEmits<Emits>()

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1rpx solid #dcdfe6;
  border-radius: 8rpx;
  background: #fff;
  color: #606266;
  font-size: 28rpx;
  padding: 20rpx 30rpx;
  cursor: pointer;
  transition: all 0.3s;

  &--mini {
    padding: 10rpx 20rpx;
    font-size: 24rpx;
  }

  &--small {
    padding: 15rpx 25rpx;
    font-size: 26rpx;
  }

  &--large {
    padding: 25rpx 35rpx;
    font-size: 32rpx;
  }

  &--primary {
    background: #409eff;
    border-color: #409eff;
    color: #fff;

    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }

  &--success {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;

    &:hover {
      background: #85ce61;
      border-color: #85ce61;
    }
  }

  &--warning {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;

    &:hover {
      background: #ebb563;
      border-color: #ebb563;
    }
  }

  &--danger {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;

    &:hover {
      background: #f78989;
      border-color: #f78989;
    }
  }

  &--disabled {
    background: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  &--loading {
    pointer-events: none;
  }

  &--round {
    border-radius: 40rpx;
  }

  &--plain {
    background: #fff;

    &.custom-button--primary {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
    }

    &.custom-button--success {
      color: #67c23a;
      background: #f0f9ff;
      border-color: #c2e7b0;
    }

    &.custom-button--warning {
      color: #e6a23c;
      background: #fdf6ec;
      border-color: #f5dab1;
    }

    &.custom-button--danger {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
  }
}
</style> 