<template>
  <view class="container">
    <view class="header">
      <text class="title">页面A</text>
      <text class="subtitle">这是从首页跳转过来的页面</text>
    </view>
    
    <view class="content">
      <text class="info">当前页面：pages/pageA/index</text>
      <button class="btn" @click="goBack">返回上一页</button>
      <button class="btn" @click="goToHome">回到首页</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    
    goToHome() {
      uni.reLaunch({
        url: '/pages/index/index'
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

.info {
  display: block;
  margin-bottom: 30px;
  font-size: 14px;
  color: #999;
}

.btn {
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 15px;
  background: #34c759;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
}

.btn:active {
  background: #28a745;
}
</style> 