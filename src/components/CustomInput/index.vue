<template>
  <view class="custom-input" :class="{ 'custom-input--error': error }">
    <view v-if="label" class="custom-input__label">{{ label }}</view>
    <view class="custom-input__wrapper">
      <view v-if="$slots.prefix" class="custom-input__prefix">
        <slot name="prefix"></slot>
      </view>
      <input
        class="custom-input__inner"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :maxlength="maxlength"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <view v-if="$slots.suffix || clearable" class="custom-input__suffix">
        <view v-if="clearable && modelValue && !disabled" class="custom-input__clear" @click="handleClear">
          <text>×</text>
        </view>
        <slot name="suffix"></slot>
      </view>
    </view>
    <view v-if="error" class="custom-input__error">{{ error }}</view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  disabled?: boolean
  clearable?: boolean
  maxlength?: number
  error?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
  (e: 'clear'): void
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '请输入',
  disabled: false,
  clearable: false,
  maxlength: -1
})

const emit = defineEmits<Emits>()

const handleInput = (event: any) => {
  const value = event.detail.value
  emit('update:modelValue', value)
  emit('input', event)
}

const handleFocus = (event: Event) => {
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style lang="scss" scoped>
.custom-input {
  width: 100%;

  &__label {
    margin-bottom: 10rpx;
    font-size: 28rpx;
    color: #606266;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    border: 1rpx solid #dcdfe6;
    border-radius: 8rpx;
    background: #fff;
    transition: border-color 0.2s;

    &:focus-within {
      border-color: #409eff;
    }
  }

  &__prefix,
  &__suffix {
    display: flex;
    align-items: center;
    padding: 0 20rpx;
    color: #c0c4cc;
  }

  &__inner {
    flex: 1;
    padding: 20rpx;
    font-size: 28rpx;
    border: none;
    background: transparent;

    &::placeholder {
      color: #c0c4cc;
    }

    &:disabled {
      background: #f5f7fa;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  &__clear {
    cursor: pointer;
    font-size: 32rpx;
    color: #c0c4cc;

    &:hover {
      color: #909399;
    }
  }

  &__error {
    margin-top: 10rpx;
    font-size: 24rpx;
    color: #f56c6c;
  }

  &--error {
    .custom-input__wrapper {
      border-color: #f56c6c;
    }
  }
}
</style> 