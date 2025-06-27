<template>
  <view class="page">
    <!-- uview-plus 自定义导航栏 -->
    <up-navbar
      title="记账本"
      :bgColor="navbarBgColor"
      :titleStyle="titleStyle"
      :fixed="true"
      :placeholder="true"
      height="44"
      leftIcon=""
      leftText=""
    >
      <!-- <template #right>
        <view class="navbar-icons">
          <u-icon name="more-dot-fill" color="white" size="44rpx" style="margin-right: 16rpx;"></u-icon>
          <u-icon name="clock" color="white" size="44rpx"></u-icon>
        </view>
      </template> -->
    </up-navbar>

    <!-- 顶部绿色区域 -->
    <view class="header">
      <!-- 筛选器 -->
      <view class="filter-section">
        <view class="filter-left">
          <text class="category-text">全部类型</text>
          <u-icon name="grid" color="white" size="32rpx"></u-icon>
        </view>
      </view>
      
      <!-- 汇总区域 -->
      <view class="summary-section">
        <view class="date-selector">
          <text class="date-text">2025年3月</text>
          <u-icon name="arrow-down" color="white" size="24rpx"></u-icon>
        </view>
        <view class="amount-summary">
          <text class="summary-text">总支出 ¥17.00 总入¥100.00</text>
        </view>
      </view>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 日期标题 -->
      <view class="date-header">
        <text class="date-title">3月27日星期四</text>
        <view class="day-summary">
          <text class="out-amount">出 17.00</text>
          <text class="in-amount">入 100.00</text>
        </view>
      </view>
      
      <!-- 记录列表 -->
      <view class="record-list">
        <!-- 工资收入 -->
        <view class="record-item">
          <view class="record-icon income">
            <u-icon name="rmb-circle-fill" color="white" size="36rpx"></u-icon>
          </view>
          <view class="record-info">
            <view class="record-title">工资</view>
            <view class="record-time">18:48</view>
          </view>
          <view class="record-amount income-amount">+100.00</view>
        </view>
        
        <!-- 餐饮支出 -->
        <view class="record-item">
          <view class="record-icon expense-food">
            <u-icon name="checkmark" color="white" size="36rpx"></u-icon>
          </view>
          <view class="record-info">
            <view class="record-title">餐饮</view>
            <view class="record-time">18:47</view>
          </view>
          <view class="record-amount expense-amount">-5.00</view>
        </view>
        
        <!-- 服饰支出 -->
        <view class="record-item">
          <view class="record-icon expense-clothes">
            <u-icon name="bag-fill" color="white" size="36rpx"></u-icon>
          </view>
          <view class="record-info">
            <view class="record-title">服饰</view>
            <view class="record-time">18:46</view>
            <view class="record-note">微信记账</view>
          </view>
          <view class="record-amount expense-amount">-12.00</view>
        </view>
      </view>
      
      <!-- 加载更多 -->
      <view class="load-more">
        <text class="load-text">上滑加载更多</text>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="bottom-nav">
      <view class="nav-item active">
        <u-icon name="list" color="#4CD964" size="48rpx"></u-icon>
        <text class="nav-text active">明细</text>
      </view>
      <view class="nav-item">
        <u-icon name="red-packet" color="#999" size="48rpx"></u-icon>
        <text class="nav-text">统计</text>
      </view>
      <view class="nav-item">
        <u-icon name="setting" color="#999" size="48rpx"></u-icon>
        <text class="nav-text">设置</text>
      </view>
    </view>

    <!-- 浮动添加按钮 -->
    <view class="fab-container">
      <view class="fab-button" @click="addRecord">
        <u-icon name="plus-circle-fill" color="white" size="48rpx"></u-icon>
        <text class="fab-text">记一笔</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航栏配置
const navbarBgColor = ref('#3EB575')
const titleStyle = ref({
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold'
})

// 添加记录
const addRecord = () => {
  uni.showToast({
    title: '添加记录',
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

/* 导航栏右侧图标样式 */
.navbar-icons {
  display: flex;
  align-items: center;
}

/* 顶部绿色区域 */
.header {
  background: #3EB575;
  color: white;
  padding-top: 20rpx;
  padding-bottom: 40rpx;
}

.filter-section {
  padding: 20rpx 40rpx;
  
  .filter-left {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    width: 242rpx;
    height: 76rpx;
    background: #51BC83;
    border-radius: 5rpx;
  }
  
  .category-text {
    font-size: 28rpx;
    color: white;
  }
}

.summary-section {
  padding: 0 40rpx 20rpx;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  
  .date-selector {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-right: 20rpx;
    margin-left: 40rpx;
  }
  
  .date-text {
    font-size: 28rpx;
    color: white;
  }
  
  .summary-text {
    font-size: 24rpx;
    color: #89D4AA;
  }
}

/* 内容区域 */
.content {
  flex: 1;
  background: #ffffff;
  border-radius: 32rpx 32rpx 0 0;
  margin-top: -20rpx;
  padding: 32rpx 0;
  overflow-y: auto;
  margin: 16rpx 20rpx 16rpx;
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 100rpx;
  padding: 0 40rpx;
  
  .date-title {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }
  
  .day-summary {
    display: flex;
    gap: 32rpx;
    
    .out-amount, .in-amount {
      font-size: 24rpx;
    }
    
    .out-amount {
      color: #333;
    }
    
    .in-amount {
      color: #333;
    }
  }
}

.record-list {
  padding: 0 40rpx;
  background-color: #ffffff;
}

.record-item {
  display: flex;
  align-items: center;
  padding: 32rpx 0;
  border-bottom: 2rpx solid #f8f8f8;
  
  &:last-child {
    border-bottom: none;
  }
}

.record-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
  
  &.income {
    background: #FF9500;
  }
  
  &.expense-food {
    background: #4CD964;
  }
  
  &.expense-clothes {
    background: #4CD964;
  }
}

.record-info {
  flex: 1;
  
  .record-title {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 8rpx;
  }
  
  .record-time {
    font-size: 24rpx;
    color: #999;
  }
  
  .record-note {
    font-size: 24rpx;
    color: #999;
    margin-top: 4rpx;
  }
}

.record-amount {
  font-size: 32rpx;
  font-weight: 500;
  
  &.income-amount {
    color: #FF9500;
  }
  
  &.expense-amount {
    color: #333;
  }
}

.load-more {
  text-align: center;
  padding: 60rpx 0;
  
  .load-text {
    color: #ccc;
    font-size: 24rpx;
  }
}

/* 底部导航 */
.bottom-nav {
  display: flex;
  background: white;
  border-top: 2rpx solid #f0f0f0;
  padding: 16rpx 0 32rpx;
  
  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;
    
    .nav-text {
      font-size: 20rpx;
      color: #999;
      
      &.active {
        color: #4CD964;
      }
    }
  }
}

/* 浮动按钮 */
.fab-container {
  position: fixed;
  right: 40rpx;
  bottom: 200rpx;
  z-index: 999;
}

.fab-button {
  background: linear-gradient(135deg, #4CD964 0%, #5AC86C 100%);
  border-radius: 60rpx;
  padding: 24rpx 32rpx;
  display: flex;
  align-items: center;
  gap: 12rpx;
  box-shadow: 0 8rpx 24rpx rgba(76, 217, 100, 0.3);
  
  .fab-text {
    color: white;
    font-size: 24rpx;
  }
}
</style>
