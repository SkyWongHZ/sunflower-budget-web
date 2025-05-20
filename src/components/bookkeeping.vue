<template>
    <div class="bookkeeping-component">
        <!-- 记账弹出层 -->
        <van-popup v-model:show="showBookkeepingPopup" position="bottom" :style="{ height: '95%' }" round closeable
            close-icon-position="top-left" @closed="resetForm">
            <!-- 类型选择标签页 -->
            <div class="type-tabs">
                <van-tabs v-model:active="activeTab" :border="false" shrink swipeable>
                    <van-tab title="支出" name="expense"></van-tab>
                    <van-tab title="入账" name="income"></van-tab>
                    <van-tab title="不计入收支" name="excluded"></van-tab>
                </van-tabs>
                <!-- 日期选择器 -->
                <div class="date-selector" @click="showDatePicker = true">
                    <span>{{ formattedDate }}</span>
                    <van-icon name="arrow-down" />
                </div>
            </div>

            <!-- 金额输入区域 -->
            <div class="amount-input">
                <span class="currency-symbol">¥</span>
                <span class="amount-display">{{ amount || '0' }}</span>
            </div>

            <!-- 类别选择区 -->
            <div class="category-section">
                <van-swipe class="category-swiper" :loop="false" :width="375" :show-indicators="false">
                    <van-swipe-item>
                        <div class="category-grid">
                            <!-- 支出类别 -->
                            <template v-if="activeTab === 'expense'">
                                <div v-for="(category, index) in expenseCategories" :key="index"
                                    :class="['category-item', selectedCategory === category.name ? 'selected' : '']"
                                    @click="selectCategory(category.name)">
                                    <div class="category-icon"
                                        :style="{ backgroundColor: category.selected ? '#4caf50' : '#f5f5f5' }">
                                        <van-icon :name="category.icon"
                                            :color="category.selected ? '#ffffff' : '#999'" />
                                    </div>
                                    <div class="category-name">{{ category.name }}</div>
                                </div>
                            </template>

                            <!-- 收入类别 -->
                            <template v-else-if="activeTab === 'income'">
                                <div v-for="(category, index) in incomeCategories" :key="index"
                                    :class="['category-item', selectedCategory === category.name ? 'selected' : '']"
                                    @click="selectCategory(category.name)">
                                    <div class="category-icon"
                                        :style="{ backgroundColor: category.selected ? '#f8b26a' : '#f5f5f5' }">
                                        <van-icon :name="category.icon"
                                            :color="category.selected ? '#ffffff' : '#999'" />
                                    </div>
                                    <div class="category-name">{{ category.name }}</div>
                                </div>
                            </template>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>

            <!-- 备注输入区 -->
            <div class="remark-input">
                <van-field v-model="remark" placeholder="添加备注" :border="false" input-align="left">
                    <template #left-icon>
                        <van-icon name="edit" size="20" color="#999" />
                    </template>
                </van-field>
            </div>

            <!-- 数字键盘区域 -->
            <div class="number-keyboard">
                <div class="keyboard-row">
                    <div class="keyboard-key" @click="handleKeyPress('1')">1</div>
                    <div class="keyboard-key" @click="handleKeyPress('2')">2</div>
                    <div class="keyboard-key" @click="handleKeyPress('3')">3</div>
                    <div class="keyboard-key delete-key" @click="handleDelete">
                        <van-icon name="delete-o" size="20" />
                    </div>
                </div>
                <div class="keyboard-row">
                    <div class="keyboard-key" @click="handleKeyPress('4')">4</div>
                    <div class="keyboard-key" @click="handleKeyPress('5')">5</div>
                    <div class="keyboard-key" @click="handleKeyPress('6')">6</div>
                    <div class="keyboard-key" @click="handleConfirm"
                        :class="['confirm-key', activeTab === 'income' ? 'income-confirm' : 'expense-confirm']"
                        :style="{ gridRow: 'span 4' }">确定</div>
                </div>
                <div class="keyboard-row">
                    <div class="keyboard-key" @click="handleKeyPress('7')">7</div>
                    <div class="keyboard-key" @click="handleKeyPress('8')">8</div>
                    <div class="keyboard-key" @click="handleKeyPress('9')">9</div>
                </div>
                <div class="keyboard-row">
                    <div class="keyboard-key keyboard-zero" @click="handleKeyPress('0')">0</div>
                    <div class="keyboard-key" @click="handleKeyPress('.')">.</div>
                </div>
            </div>
        </van-popup>

        <!-- 日期选择弹窗 -->
        <!-- <van-popup v-model:show="showDatePicker" position="bottom">
            <van-datetime-picker v-model="selectedDate" type="date" title="选择日期" :min-date="minDate" :max-date="maxDate"
                @confirm="onDateConfirm" @cancel="showDatePicker = false" />
        </van-popup> -->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { showToast } from 'vant';


// 定义组件名称
defineOptions({
    name: 'BookkeepingForm'
});

// 是否显示记账弹窗
const showBookkeepingPopup = ref(true);
// 是否显示日期选择器
const showDatePicker = ref(false);
// 当前选中的标签页
const activeTab = ref('expense');
// 当前日期
const currentDate = ref(new Date());
// 日期选择器数据
const selectedDate = ref(new Date());
// 金额
const amount = ref('');
// 选中的分类
const selectedCategory = ref('');
// 备注
const remark = ref('');
// 设置日期选择器范围
const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2030, 11, 31);

// 格式化日期显示
const formattedDate = computed(() => {
    const date = currentDate.value;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
});

// 支出分类数据
const expenseCategories = ref([
    { name: '服饰', icon: 'goods-collect-o', selected: true },
    { name: '餐饮', icon: 'shop-o', selected: false },
    { name: '购物', icon: 'shopping-cart-o', selected: false },
    { name: '服务', icon: 'service-o', selected: false },
    { name: '教育', icon: 'bookmark-o', selected: false },
    { name: '娱乐', icon: 'music-o', selected: false },
    { name: '运动', icon: 'fire-o', selected: false },
    { name: '生活缴费', icon: 'home-o', selected: false },
    { name: '旅行', icon: 'guide-o', selected: false },
    { name: '宠物', icon: 'friends-o', selected: false },
    { name: '交通', icon: 'logistics', selected: false },
    { name: '医疗', icon: 'bulb-o', selected: false },
]);

// 收入分类数据
const incomeCategories = ref([
    { name: '生意', icon: 'shop-o', selected: false },
    { name: '工资', icon: 'gold-coin-o', selected: true },
    { name: '奖金', icon: 'gift-o', selected: false },
    { name: '其他人情', icon: 'smile-o', selected: false },
    { name: '收红包', icon: 'bill-o', selected: false },
    { name: '收转账', icon: 'exchange', selected: false },
    { name: '商家转账', icon: 'shop-collect-o', selected: false },
    { name: '退款', icon: 'refund-o', selected: false },
    { name: '其他', icon: 'more-o', selected: false },
    { name: '服饰', icon: 'goods-collect-o', selected: false },
    { name: '测试', icon: 'cluster-o', selected: false },
]);

// 选择分类
const selectCategory = (categoryName: string) => {
    selectedCategory.value = categoryName;

    // 更新支出分类的选中状态
    if (activeTab.value === 'expense') {
        expenseCategories.value.forEach(item => {
            item.selected = item.name === categoryName;
        });
    }
    // 更新收入分类的选中状态
    else if (activeTab.value === 'income') {
        incomeCategories.value.forEach(item => {
            item.selected = item.name === categoryName;
        });
    }
};

// 按键处理
const handleKeyPress = (key: string) => {
    // 如果是第一次按.，并且amount中没有.
    if (key === '.' && !amount.value.includes('.')) {
        // 如果amount为空，添加前导0
        if (amount.value === '') {
            amount.value = '0.';
        } else {
            amount.value += '.';
        }
        return;
    }

    // 小数点后最多两位
    if (amount.value.includes('.') && amount.value.split('.')[1]?.length >= 2 && key !== '.') {
        return;
    }

    // 整数部分最多9位
    if (!amount.value.includes('.') && amount.value.length >= 9 && key !== '.') {
        return;
    }

    // 如果是0且输入数字，替换0
    if (amount.value === '0' && key !== '.') {
        amount.value = key;
    } else {
        amount.value += key;
    }
};

// 删除按键处理
const handleDelete = () => {
    if (amount.value.length > 0) {
        amount.value = amount.value.slice(0, -1);
    }
};

// 确认按钮处理
const handleConfirm = () => {
    if (!amount.value || parseFloat(amount.value) === 0) {
        showToast('请输入金额');
        return;
    }

    if (!selectedCategory.value) {
        showToast('请选择分类');
        return;
    }

    // 在实际应用中，这里会提交表单数据
    const formData = {
        type: activeTab.value,
        amount: parseFloat(amount.value),
        category: selectedCategory.value,
        date: currentDate.value,
        remark: remark.value
    };

    console.log('记账数据:', formData);
    showToast('记账成功');

    // 关闭弹窗
    showBookkeepingPopup.value = false;
};

// 日期确认
const onDateConfirm = (date: Date) => {
    currentDate.value = date;
    showDatePicker.value = false;
};

// 重置表单
const resetForm = () => {
    amount.value = '';
    remark.value = '';

    // 重置支出类别选中状态
    expenseCategories.value.forEach((item, index) => {
        item.selected = index === 0;
    });

    // 重置收入类别选中状态
    incomeCategories.value.forEach((item, index) => {
        item.selected = index === 1; // 工资默认选中
    });

    // 设置默认选中的类别
    if (activeTab.value === 'expense') {
        selectedCategory.value = expenseCategories.value[0].name;
    } else {
        selectedCategory.value = incomeCategories.value[1].name;
    }
};

// 初始化默认选中的类别
if (activeTab.value === 'expense') {
    selectedCategory.value = expenseCategories.value[0].name;
} else {
    selectedCategory.value = incomeCategories.value[1].name;
}
</script>

<style lang="less" scoped>
.bookkeeping-component {
    width: 100%;
}

// 类型选择标签页
.type-tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 10px;

    :deep(.van-tabs) {
        flex: 1;
    }

    :deep(.van-tabs__wrap) {
        height: 34px;
    }

    :deep(.van-tab) {
        padding: 0 15px;
        font-size: 14px;
        color: #333;
        min-width: 60px;

        &--active {
            font-weight: 500;
        }
    }

    :deep(.van-tabs__line) {
        background-color: #333;
        height: 2px;
    }

    .date-selector {
        display: flex;
        align-items: center;
        background-color: #f5f5f5;
        padding: 5px 10px;
        border-radius: 4px;
        margin-left: 10px;

        span {
            font-size: 14px;
            margin-right: 4px;
        }
    }
}

// 金额输入区域
.amount-input {
    display: flex;
    align-items: center;
    padding: 20px 16px;
    border-bottom: 1px solid #f5f5f5;

    .currency-symbol {
        font-size: 30px;
        font-weight: bold;
        margin-right: 8px;
    }

    .amount-display {
        font-size: 30px;
        font-weight: bold;
        flex: 1;
    }
}

// 类别选择区
.category-section {
    padding: 10px 0;

    .category-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 15px;
        padding: 10px 16px;
    }

    .category-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;

        &.selected {
            .category-name {
                color: #333;
                font-weight: 500;
            }
        }

        .category-icon {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 5px;
            transition: background-color 0.2s;

            .van-icon {
                font-size: 22px;
            }
        }

        .category-name {
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    }
}

// 备注输入区
.remark-input {
    margin: 10px 0;

    :deep(.van-field__left-icon) {
        margin-right: 8px;
    }

    :deep(.van-field__control) {
        color: #333;
    }
}

// 数字键盘区域
.number-keyboard {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    background-color: #f5f5f5;
    padding: 5px;
    border-top: 1px solid #eee;

    .keyboard-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        margin-bottom: 4px;
    }

    .keyboard-key {
        background-color: #fff;
        border-radius: 6px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: 500;
        user-select: none;
        cursor: pointer;

        &:active {
            background-color: #f0f0f0;
        }
    }

    .keyboard-zero {
        grid-column: span 2;
    }

    .confirm-key {
        grid-row: span 3;
        border-radius: 6px;
        font-size: 16px;
        color: #fff;
        word-break: break-word;
        writing-mode: vertical-lr;
        text-orientation: mixed;
        letter-spacing: 4px;

        &.expense-confirm {
            background-color: #4caf50;
        }

        &.income-confirm {
            background-color: #f8b26a;
        }

        &:active {
            opacity: 0.9;
        }
    }

    .delete-key {
        font-size: 18px;
    }
}

// 根据活动标签页设置主题色
:deep(.van-popup) {
    max-height: 95%;
    overflow-y: hidden;
}
</style>
