<template>
    <div class="account-book">


        <!-- 标题区域 -->
        <div class="header">
            <h1 class="title">记账本</h1>
            <div class="menu-button">
                <span class="dots">···</span>
                <span class="circle"></span>
            </div>
        </div>

        <!-- 过滤区域 -->
        <div class="filter-area">
            <div class="category-filter">
                全部类型
                <van-icon name="apps-o" />
            </div>
            <div class="month-selector">
                <span>2025年5月</span>
                <van-icon name="arrow-down" />
                <span class="summary">总支出¥167.00 总入账¥23.00</span>
            </div>
        </div>

        <!-- 账单列表 -->
        <div class="account-list">
            <!-- 日期栏 -->
            <div class="date-header">
                <div class="date-info">5月18日 今天</div>
                <div class="daily-summary">
                    <span class="expense">出 167.00</span>
                    <span class="income">入 23.00</span>
                </div>
            </div>

            <!-- 账单项目 -->
            <div class="account-items">
                <!-- 工资条目 -->
                <div class="account-item">
                    <div class="item-icon income-icon">
                        <van-icon name="credit-pay" />
                    </div>
                    <div class="item-info">
                        <div class="item-name">工资</div>
                        <div class="item-time">14:41</div>
                    </div>
                    <div class="item-amount income">+23.00</div>
                </div>

                <!-- 购物条目 -->
                <div class="account-item">
                    <div class="item-icon expense-icon">
                        <van-icon name="shopping-cart-o" />
                    </div>
                    <div class="item-info">
                        <div class="item-name">购物</div>
                        <div class="item-time">14:41</div>
                    </div>
                    <div class="item-amount expense">-56.00</div>
                </div>

                <!-- 服饰条目 -->
                <div class="account-item">
                    <div class="item-icon expense-icon">
                        <van-icon name="shirt-o" />
                    </div>
                    <div class="item-info">
                        <div class="item-name">服饰</div>
                        <div class="item-time">14:41</div>
                    </div>
                    <div class="item-amount expense">-111.00</div>
                </div>
            </div>

            <!-- 加载更多 -->
            <div class="load-more">
                <div class="line"></div>
                <span>上滑加载更多</span>
                <div class="line"></div>
            </div>
        </div>

        <!-- 记一笔按钮 -->
        <div class="add-button">
            <van-icon name="edit" />
            <span>记一笔</span>
        </div>

        <!-- 底部导航 -->
        <div class="bottom-nav">
            <div class="nav-item active">
                <van-icon name="records" />
                <span>明细</span>
            </div>
            <div class="nav-item">
                <van-icon name="chart-trending-o" />
                <span>统计</span>
            </div>
            <div class="nav-item">
                <van-icon name="setting-o" />
                <span>设置</span>
            </div>
        </div>
        <bookkeeping-form />
    </div>
</template>

<script setup lang="ts">
// 修复组件名称应为多词的问题
defineOptions({
    name: 'AccountDetails'
})

import { ref, defineAsyncComponent } from 'vue'

const BookkeepingForm = defineAsyncComponent(() => import('../components/bookkeeping.vue'))

/* eslint-disable */
// 模拟数据
const currentMonth = ref('2025年5月')
const totalExpense = ref('167.00')
const totalIncome = ref('23.00')

const records = ref([
    {
        id: 1,
        type: 'income',
        category: '工资',
        amount: '23.00',
        time: '14:41',
        icon: 'balance-pay'
    },
    {
        id: 2,
        type: 'expense',
        category: '购物',
        amount: '56.00',
        time: '14:41',
        icon: 'bag'
    },
    {
        id: 3,
        type: 'expense',
        category: '服饰',
        amount: '111.00',
        time: '14:41',
        icon: 'shirt'
    }
])
/* eslint-enable */
</script>

<style lang="less" scoped>
// 颜色变量
@primary-color: #4caf50; // 记账本主色调（绿色）
@income-color: #f8b26a; // 收入颜色（橙黄色）
@expense-color: #333333; // 支出颜色（黑色）
@text-color: #333333;
@text-color-light: #999999;
@background-color: #f5f5f5;
@white: #ffffff;
@header-height: 44px;
@border-radius: 15px;

// 整体容器
.account-book {
    position: relative;
    min-height: 100vh;
    width: 375px;
    margin: 0 auto;
    background-color: @background-color;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    color: @text-color;

    // 顶部状态栏
    .status-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44px;
        width: 100%;
        padding: 0 16px;
        background-color: @primary-color;
        color: @white;

        .time {
            font-size: 16px;
            font-weight: 500;

            .moon-icon {
                font-size: 14px;
                margin-left: 4px;
            }
        }

        .right-icons {
            display: flex;
            align-items: center;

            span {
                margin-left: 8px;
            }

            .signal,
            .network {
                font-size: 14px;
            }

            .battery {
                font-size: 18px;
            }
        }
    }

    // 标题区域
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: @header-height;
        padding: 0 16px;
        background-color: @primary-color;
        color: @white;

        .title {
            font-size: 20px;
            font-weight: normal;
        }

        .menu-button {
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 5px 10px;

            .dots {
                font-size: 20px;
                margin-right: 5px;
            }

            .circle {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: @white;
            }
        }
    }

    // 过滤区域
    .filter-area {
        background-color: @primary-color;
        padding: 10px 20px 20px;
        color: @white;

        .category-filter {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 10px 16px;
            margin-bottom: 15px;
            font-size: 15px;
        }

        .month-selector {
            display: flex;
            align-items: center;
            font-size: 15px;

            span {
                margin-right: 5px;
            }

            .summary {
                margin-left: auto;
                font-size: 13px;
            }
        }
    }

    // 账单列表
    .account-list {
        border-radius: @border-radius @border-radius 0 0;
        background-color: @white;
        margin-top: -10px;
        padding: 0;
        padding-bottom: 100px;

        // 日期栏
        .date-header {
            display: flex;
            justify-content: space-between;
            padding: 15px 20px;
            border-bottom: 1px solid #f5f5f5;

            .date-info {
                font-size: 16px;
                font-weight: 500;
            }

            .daily-summary {
                font-size: 14px;

                .expense {
                    margin-right: 15px;
                    color: @text-color;
                }

                .income {
                    color: @text-color;
                }
            }
        }

        // 账单项目容器
        .account-items {
            .account-item {
                display: flex;
                align-items: center;
                padding: 16px 20px;
                border-bottom: 1px solid #f5f5f5;

                .item-icon {
                    width: 46px;
                    height: 46px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 15px;
                    font-size: 22px;
                    color: @white;

                    &.income-icon {
                        background-color: @income-color;
                    }

                    &.expense-icon {
                        background-color: @primary-color;
                    }
                }

                .item-info {
                    flex: 1;

                    .item-name {
                        font-size: 16px;
                        margin-bottom: 4px;
                    }

                    .item-time {
                        font-size: 13px;
                        color: @text-color-light;
                    }
                }

                .item-amount {
                    font-size: 17px;
                    font-weight: 500;

                    &.income {
                        color: #F8B26A;
                    }

                    &.expense {
                        color: @expense-color;
                    }
                }
            }
        }

        // 加载更多
        .load-more {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 25px 0;
            color: @text-color-light;
            font-size: 13px;

            .line {
                height: 1px;
                background-color: #e8e8e8;
                width: 80px;
                margin: 0 10px;
            }
        }
    }

    // 记一笔按钮
    .add-button {
        position: fixed;
        right: 20px;
        bottom: 80px;
        background-color: @white;
        color: @primary-color;
        border-radius: 30px;
        display: flex;
        align-items: center;
        padding: 12px 20px;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

        span {
            margin-left: 8px;
        }
    }

    // 底部导航
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 375px;
        margin: 0 auto;
        height: 60px;
        background-color: @white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid #f0f0f0;

        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: @text-color-light;

            .van-icon {
                font-size: 22px;
                margin-bottom: 3px;
            }

            &.active {
                color: @primary-color;
            }
        }
    }
}
</style>
