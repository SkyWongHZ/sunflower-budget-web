<template>
    <div class="transaction-detail-page">
        <div class="page-content">
            <div class="transaction-card">
                <div class="category-section" @click="editCategory">
                    <div class="category-icon-wrapper" :style="{ backgroundColor: transaction.iconBgColor }">
                        <van-icon :name="transaction.iconName" class="category-icon" />
                    </div>
                    <span class="category-name">{{ transaction.category }}</span>
                    <van-icon name="arrow" class="arrow-icon" />
                </div>

                <div :class="['amount-display', transaction.type === 'income' ? 'income' : 'expense']">
                    {{ transaction.type === 'income' ? '+' : '-' }}{{ parseFloat(String(transaction.amount)).toFixed(2)
                    }}
                </div>

                <van-cell-group :border="false" class="detail-list">
                    <van-cell title="记录时间" :value="formatDateTime(transaction.recordTime)" class="detail-cell" />
                    <van-cell title="来源" :value="transaction.source" class="detail-cell" />
                    <van-cell v-if="transaction.notes" title="备注" :value="transaction.notes" class="detail-cell" />
                </van-cell-group>

                <div class="card-action-buttons">
                    <van-button plain type="danger" icon="delete-o" class="action-button delete-button"
                        @click="confirmDelete">
                        删除
                    </van-button>
                    <div class="button-divider"></div>
                    <van-button plain type="default" icon="edit" class="action-button edit-button"
                        @click="editTransaction">
                        编辑
                    </van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineOptions, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { showToast, showConfirmDialog } from 'vant';

defineOptions({
    name: 'TransactionDetailPage',
});

interface Transaction {
    id: string | number;
    type: 'income' | 'expense';
    category: string;
    iconName: string;
    iconBgColor?: string;
    amount: string | number;
    recordTime: string | Date;
    source: string;
    notes?: string;
}

const router = useRouter();
const route = useRoute();

const transaction = ref<Transaction>({
    id: '123',
    type: 'income',
    category: '工资',
    iconName: 'gold-coin-o',
    iconBgColor: '#FFD700', // 类似设计稿中的黄色 (橙黄色)
    amount: '100.00',
    recordTime: '2025-03-27T18:48:00Z',
    source: '手动记账',
    notes: '三月份基本工资',
});

onMounted(() => {
    const transactionId = route.params.id;
    if (transactionId) {
        console.log('Fetching details for transaction ID:', transactionId);
        // 实际项目中: fetchTransactionDetails(transactionId).then(data => transaction.value = data);
    }
});

// const goBack = () => router.back(); // 如果有导航栏
// const showMoreOptions = () => showToast('更多操作...');
// const toggleVisibility = () => showToast('切换金额可见性...');

const editCategory = () => {
    showToast(`编辑分类: ${transaction.value.category}`);
};

const formatDateTime = (dateTime: string | Date): string => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
};

const confirmDelete = () => {
    showConfirmDialog({
        title: '确认删除',
        message: '确定要删除这笔交易记录吗？此操作无法撤销。',
    })
        .then(() => {
            console.log('删除交易:', transaction.value.id);
            showToast({ message: '删除成功', icon: 'success' });
            // router.replace('/path-to-list');
        })
        .catch(() => {
            showToast('已取消删除');
        });
};

const editTransaction = () => {
    showToast(`编辑交易: ${transaction.value.id}`);
    // router.push(`/edit-transaction/${transaction.value.id}`);
};
</script>

<style lang="less" scoped>
// 为避免 @white is undefined, 直接定义或使用 Vant CSS 变量 / 直接颜色值
// 在实际项目中, 这些变量应在全局 less 文件中定义并引入
@primary-color: #4caf50; // 主题色 (绿色), 如果需要
@income-color-text: #f8b26a; // 收入金额颜色 (橙黄色, 与设计稿一致)
@expense-color-text: #333333; // 支出金额颜色
@text-color: #323233; // Vant 默认文本颜色 / 主要文本颜色
@text-color-light: #969799; // Vant 浅色文本 / 次要文本颜色
@background-color: #f7f8fa; // 页面背景色
@card-background-color: #ffffff; // 卡片背景色 (白色)
@border-color: #ebedf0; // Vant 边框颜色 / 分割线颜色
@icon-wrapper-size: 36px;
@icon-size: 20px;
@delete-button-color: #ee0a24; // Vant Danger Color

.transaction-detail-page {
    background-color: @background-color;
    min-height: 100vh;
    // 如果需要模拟375px宽度居中显示
    // width: 375px;
    // margin: 0 auto;
    // box-shadow: 0 0 10px rgba(0,0,0,0.1); // 可选，模拟设备边框
}

.page-content {
    padding: 16px;
}

.transaction-card {
    background-color: @card-background-color;
    border-radius: 12px;
    padding: 20px; // 卡片整体内边距
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.category-section {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    cursor: pointer;

    .category-icon-wrapper {
        width: @icon-wrapper-size;
        height: @icon-wrapper-size;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        flex-shrink: 0;

        .category-icon {
            font-size: @icon-size;
            color: @card-background-color; // 图标颜色通常为白色，与背景色形成对比
        }
    }

    .category-name {
        font-size: 16px;
        font-weight: 500;
        color: @text-color;
        flex-grow: 1;
    }

    .arrow-icon {
        font-size: 14px;
        color: @text-color-light;
    }
}

.amount-display {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 24px;

    &.income {
        color: @income-color-text;
    }

    &.expense {
        color: @expense-color-text;
    }
}

.detail-list {
    // margin-bottom: 24px; // 调整与下方按钮区域的间距, 现在按钮区是卡片一部分

    :deep(.van-cell-group) {
        margin: 0; // 移除 Vant Cell Group 默认的内外边距
    }

    .detail-cell {
        padding: 12px 0; // 上下内边距，移除左右内边距由父容器控制
        background-color: transparent;

        &:after {
            left: 0;
            right: 0;
            border-bottom: 1px solid @border-color;
        }

        &:last-child::after {
            // 最后一个详情项（备注，如果存在）之后也应该有分割线，因为下面是按钮区
            // border-bottom: 1px solid @border-color; // 如果希望备注后也有一条线
            // 根据设计稿 image_6be06e.png, 来源下方是分割线, 然后是按钮。所以备注后可能不需要线，或者按钮区自带上边框
            border-bottom: none; // 假设详情列表的最后一项下方无分割线，分割线在按钮区顶部
        }

        :deep(.van-cell__title) {
            color: @text-color-light;
            font-size: 14px;
            flex: none;
            width: 80px; // 标签宽度，根据实际内容调整
        }

        :deep(.van-cell__value) {
            color: @text-color;
            font-size: 14px;
            text-align: left;
        }
    }
}

.card-action-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 20px; // 与上方详情列表的间距
    margin-top: 20px; // 如果 detail-list 的 margin-bottom 被移除，则在这里加
    border-top: 1px solid @border-color; // 按钮区域顶部的分割线，符合设计稿

    .action-button {
        flex: 1;
        border: none; // Vant plain 按钮默认有边框，设计稿中看起来更像是无边框的文字+图标
        height: 44px; // 按钮高度
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;

        &.delete-button {
            color: @delete-button-color; // 删除按钮文字和图标颜色

            :deep(.van-icon) {
                color: @delete-button-color;
            }
        }

        &.edit-button {
            color: @text-color; // 编辑按钮文字和图标颜色 (设计稿中是深灰色)

            :deep(.van-icon) {
                color: @text-color;
            }
        }

        // 移除 Vant plain 按钮的默认 padding, 如果需要更紧凑的布局
        // :deep(.van-button__content) {
        //   padding: 0 8px;
        // }
        // :deep(.van-button__text) {
        //   margin-left: 4px;
        // }
        .van-icon {
            margin-right: 4px;
        }
    }

    .button-divider {
        width: 1px;
        height: 20px;
        background-color: @border-color;
    }
}
</style>