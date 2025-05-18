<template>
    <div class="monthly-reminder-page">

        <div class="page-content">
            <div class="header-info">
                <h1 class="page-title">每月交易提醒</h1>
                <p class="page-description">
                    为每月定期的收款或付款设置提醒，避免忘记。
                    <span class="link" @click="showFunctionDescription">功能说明</span>
                </p>
            </div>

            <div class="reminder-section">
                <div class="section-title">提醒内容</div>
                <div class="tags-container">
                    <van-tag v-for="tag in predefinedTags" :key="tag.id"
                        :type="selectedTag === tag.name ? 'primary' : 'default'" :plain="selectedTag !== tag.name"
                        size="large" class="reminder-tag" @click="selectTag(tag.name)">
                        {{ tag.name }}
                    </van-tag>
                    <van-tag type="default" plain size="large" class="reminder-tag custom-tag"
                        @click="showCustomTagInput">
                        <van-icon name="plus" style="margin-right: 2px;" /> 自定义
                    </van-tag>
                </div>
                <van-field v-if="showCustomInput" v-model="customTagName" placeholder="请输入自定义提醒内容"
                    class="custom-input-field" @blur="applyCustomTag" />
            </div>

            <van-cell title="提醒日期" is-link :value="reminderDateDisplay" @click="showDatePicker = true" center
                class="form-cell" />

            <van-field v-model="reminderAmount" label="金额" type="number" placeholder="选填" clearable
                class="form-cell amount-field">
                <template #label>
                    <span class="field-label-custom">金额</span>
                </template>
                <template #input>
                    <span class="currency-symbol">¥</span>
                    <input v-model="reminderAmount" type="number" placeholder="选填" class="amount-input-custom" />
                </template>
            </van-field>

            <div class="confirm-button-container">
                <van-button type="primary" block round class="confirm-button" @click="submitReminder"
                    :disabled="!selectedTag && !customTagName">
                    确定
                </van-button>
            </div>
        </div>

        <van-popup v-model:show="showDatePicker" position="bottom" round>
            <van-date-picker v-model="currentReminderDateArray" title="选择提醒日期" :columns-type="['day']"
                :min-date="minDate" :max-date="maxDate" @confirm="onDateConfirm" @cancel="showDatePicker = false"
                :formatter="dayFormatter" />
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, defineOptions } from 'vue';
import { showToast, showDialog } from 'vant'; // Vant的轻提示和对话框组件
// import 'vant/es/toast/style'; ( Vite/Webpack )
// import 'vant/es/dialog/style';

defineOptions({
    name: 'MonthlyReminderPage',
});

interface PredefinedTag {
    id: number;
    name: string;
}

// 导航栏
const isReminderEnabled = ref<boolean>(true); // 右上角开关状态
const onClickLeft = () => history.back(); // 或使用 Vue Router

// 页面信息
const showFunctionDescription = () => {
    showDialog({
        title: '功能说明',
        message: '这里是关于每月交易提醒功能的详细说明文字...',
    }).catch(() => {
        // on cancel
    });
};

// 提醒内容
const predefinedTags = ref<PredefinedTag[]>([
    { id: 1, name: '交房租' },
    { id: 2, name: '还信用卡' },
    { id: 3, name: '话费' },
    { id: 4, name: '水电燃气' },
]);
const selectedTag = ref<string>(''); // 存储选中的预设标签名
const customTagName = ref<string>('');
const showCustomInput = ref<boolean>(false);

const selectTag = (tagName: string) => {
    selectedTag.value = tagName;
    customTagName.value = ''; // 清空自定义输入
    showCustomInput.value = false;
};

const showCustomTagInput = () => {
    selectedTag.value = ''; // 清空预设标签选择
    showCustomInput.value = true;
    // 可以选择让自定义输入框自动聚焦
};
const applyCustomTag = () => {
    if (customTagName.value.trim() !== '') {
        selectedTag.value = ''; // 确保没有预设标签被选中
        // 此时 customTagName.value 就是用户自定义的内容
    } else if (selectedTag.value === '') { // 如果自定义为空且没有选中预设
        showCustomInput.value = false;
    }
}


// 提醒日期
const showDatePicker = ref<boolean>(false);
const reminderDate = ref<number | null>(null); // 存储选中的日期 (几号)

const minDate = new Date(2000, 0, 1); // 示例最小日期
const maxDate = new Date(2099, 11, 31); // 示例最大日期
// currentReminderDateArray 只需要一个值，代表日
const currentReminderDateArray = computed<string[]>({
    get: () => reminderDate.value ? [String(reminderDate.value)] : [String(new Date().getDate())], // 默认为当天
    set: (val) => {
        if (val && val.length > 0) {
            reminderDate.value = parseInt(val[0], 10);
        }
    }
});


const reminderDateDisplay = computed<string>(() => {
    return reminderDate.value ? `每月${reminderDate.value}日` : '选择提醒日期';
});

const onDateConfirm = ({ selectedValues }: { selectedValues: string[] }) => {
    reminderDate.value = parseInt(selectedValues[0], 10);
    showDatePicker.value = false;
};
const dayFormatter = (type: string, option: any) => {
    if (type === 'day') {
        option.text += '日';
    }
    return option;
};


// 金额
const reminderAmount = ref<string>(''); // 使用字符串以允许空值和更好地控制输入

// 提交
const submitReminder = () => {
    const finalTag = customTagName.value.trim() !== '' ? customTagName.value.trim() : selectedTag.value;
    if (!finalTag) {
        showToast('请选择或输入提醒内容');
        return;
    }
    if (!reminderDate.value) {
        showToast('请选择提醒日期');
        return;
    }

    const dataToSubmit = {
        reminderContent: finalTag,
        reminderDayOfMonth: reminderDate.value,
        amount: reminderAmount.value ? parseFloat(reminderAmount.value) : null,
        isEnabled: isReminderEnabled.value,
    };

    console.log('提交提醒数据:', dataToSubmit);
    showToast({
        message: `提醒设置成功: ${finalTag} 每月${dataToSubmit.reminderDayOfMonth}日`,
        icon: 'success',
    });
    // 此处可以添加 API 调用等逻辑
};
</script>

<style lang="less" scoped>
// 颜色和尺寸变量 (可以从您之前的代码或全局CSS变量中引入)
@primary-color: #4caf50; // 或您的记账本主色调
@background-color: #f7f8fa; // Vant 默认背景色或自定义
@text-color: #333;
@text-color-light: #969799;
@text-color-link: #1989fa; // Vant link color
@white: #ffffff;
@cell-background: #ffffff;
@border-color: #ebedf0;

.monthly-reminder-page {
    background-color: @background-color;
    min-height: 100vh;
    padding-bottom: 20px; // 为底部内容留出空间
}

.custom-nav-bar {

    // 与您之前的导航栏样式保持一致或自定义
    // --van-nav-bar-background-color: @primary-color;
    // --van-nav-bar-title-text-color: @white;
    // --van-nav-bar-icon-color: @white;
    :deep(.van-nav-bar__title) {
        font-weight: normal; // 设计稿标题不加粗
    }
}

.nav-right-button {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.08); // 根据设计稿调整背景色
    border-radius: 20px;
    padding: 4px 8px;
    height: 28px; // 确保和左箭头高度协调

    .dots {
        font-size: 18px; // 调整点的大小和间距
        color: #888; // 根据设计稿调整颜色
        margin-right: 6px;
        line-height: 1;
        letter-spacing: -1px;
    }

    .circle-switch {
        // 开关的样式Vant已经处理，主要是外层容器的对齐
        display: flex;
        align-items: center;
        // 如果需要让开关看起来更像设计图中的圆形背景上的滑块，可能需要更复杂的CSS或图片
        // :deep(.van-switch__node) { /* Vant开关节点 */ }
        // :deep(.van-switch) { /* Vant开关整体 */ }
    }
}


.page-content {
    padding: 16px;
}

.header-info {
    margin-bottom: 24px;

    .page-title {
        font-size: 24px;
        font-weight: 500; // 设计稿中标题较粗
        color: @text-color;
        margin-bottom: 8px;
    }

    .page-description {
        font-size: 14px;
        color: @text-color-light;
        line-height: 1.6;

        .link {
            color: @text-color-link;
            cursor: pointer;
        }
    }
}

.reminder-section {
    margin-bottom: 20px;

    .section-title {
        font-size: 15px;
        color: @text-color;
        margin-bottom: 12px;
        font-weight: 500; // 设计稿中分组标题也较粗
    }

    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; // 标签之间的间距
        margin-bottom: 10px;
    }

    .reminder-tag {
        // Vant Tag 默认有不错的样式，这里可以微调
        // padding: 6px 12px; // Vant的size="large"已经比较合适
        cursor: pointer;
        border-radius: 6px; // 设计稿中标签圆角较小

        &.van-tag--primary {
            background-color: lighten(@primary-color, 40%); // 选中时更浅的背景
            color: @primary-color; // 选中时的主题色文字
            border-color: @primary-color;
        }

        &.van-tag--default.van-tag--plain {
            // 未选中状态
            background-color: #f0f0f0; // 设计稿中未选中标签的背景色
            color: @text-color;
            border-color: transparent; // 未选中时无明显边框
        }
    }

    .custom-tag {
        display: inline-flex;
        align-items: center;
    }

    .custom-input-field {
        margin-top: 10px;
        border-radius: 6px;

        :deep(.van-field__control) {
            font-size: 14px;
        }
    }
}

.form-cell {
    background-color: @cell-background; // 确保cell有背景色
    border-radius: 8px;
    margin-bottom: 12px;
    padding-top: 12px;
    padding-bottom: 12px;

    :deep(.van-cell__title) {
        // font-weight: 500; // 设计稿中label不加粗
        font-size: 15px;
    }

    :deep(.van-cell__value) {
        font-size: 15px;
    }
}

.amount-field {
    display: flex; // 使用flex布局以更好地控制内部元素
    align-items: center;

    .field-label-custom {
        // 自定义label，因为Vant Field的label prop会占据左侧固定宽度
        font-size: 15px;
        color: @text-color; // 保持与van-cell title一致
        margin-right: 10px; // 和金额输入框的间距
        flex-shrink: 0; // 防止被压缩
    }

    :deep(.van-field__body) {
        // Vant Field的输入区域
        flex-grow: 1;
        display: flex;
        align-items: center;
    }

    .currency-symbol {
        font-size: 18px; // ¥ 符号大一些
        color: @text-color;
        margin-right: 8px;
        font-weight: 500;
    }

    .amount-input-custom {
        flex-grow: 1;
        border: none;
        outline: none;
        font-size: 15px;
        color: @text-color;
        background-color: transparent; // 确保背景透明

        &::placeholder {
            color: @text-color-light;
        }
    }
}


.confirm-button-container {
    margin-top: 30px;

    .confirm-button {
        --van-button-primary-background-color: @primary-color; // 与您之前代码一致的主题色
        --van-button-primary-border-color: @primary-color;
        height: 48px; // 按钮大一些
        font-size: 16px;
    }
}
</style>