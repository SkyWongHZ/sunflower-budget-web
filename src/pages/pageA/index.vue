<template>
  <view class="container">
    <view class="header">
      <text class="title">页面A - 测试 uView Plus</text>
    </view>
    
    <view class="content">
      <!-- 原生text用于对比 -->
      <text class="test-text">原生 text 组件</text>
      
      <!-- uView Plus 组件测试 -->
      <u-text text="uView Plus u-text 组件" type="success" size="16"></u-text>
      
      <!-- uView Plus 按钮测试 -->
      <up-button text="uView Plus 按钮" type="success" @click="testClick"></up-button>
      
      <!-- 原生按钮用于对比 -->
      <button class="native-btn" @click="goBack">原生按钮 - 返回</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    testClick() {
      console.log('uView Plus 按钮点击成功！')
      uni.showToast({
        title: 'uView Plus 按钮工作正常！',
        icon: 'success'
      })
    },
    
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.content {
  text-align: center;
}

.test-text {
  display: block;
  margin: 20px 0;
  color: #666;
}

.native-btn {
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 10px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style> 