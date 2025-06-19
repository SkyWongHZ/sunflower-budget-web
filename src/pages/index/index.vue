<template>
  <view class="container">
    <view class="header">
      <text class="title">向日葵预算</text>
      <text class="subtitle">欢迎使用</text>
    </view>
    
    <view class="content">
      <button class="btn" @click="navigateToPageA">跳转到页面A</button>
      <button class="btn" @click="showMessage">显示消息</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    navigateToPageA() {
      uni.navigateTo({
        url: '/pages/pageA/index'
      })
    },
    
    showMessage() {
      uni.showToast({
        title: '测试消息',
        icon: 'none'
      })
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #666;
  display: block;
}

.content {
  text-align: center;
}

.btn {
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 15px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}

.btn:active {
  background: #0056cc;
}
</style>
