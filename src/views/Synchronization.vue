<template>
    <div class="settings-page">


        <div class="page-content">
            <van-cell-group inset class="settings-group">
                <van-cell center title="自动同步微信支付账单" class="switch-cell">
                    <template #right-icon>
                        <van-switch v-model="syncWechatBills" size="22px" @change="onSyncWechatChange" />
                    </template>
                </van-cell>
            </van-cell-group>

            <van-cell-group inset class="settings-group">
                <van-cell center title="记账日报" class="switch-cell">
                    <template #right-icon>
                        <van-switch v-model="dailyReport" size="22px" @change="onDailyReportChange" />
                    </template>
                </van-cell>
                <van-cell center title="记账月报" class="switch-cell with-label">
                    <template #label>
                        开启后，你将在每日上午接收记账日报，在每月1号上午接收记账月报。
                    </template>
                    <template #right-icon>
                        <van-switch v-model="monthlyReport" size="22px" @change="onMonthlyReportChange" />
                    </template>
                </van-cell>
            </van-cell-group>

            <van-cell-group inset class="settings-group">
                <van-cell title="每月收付款提醒" is-link @click="navigateToMonthlyReminder" />
                <van-cell title="分类管理" is-link @click="navigateToCategoryManagement" />
            </van-cell-group>

            <van-cell-group inset class="settings-group">
                <van-cell center class="action-cell recommend-cell" @click="recommendToFriends">
                    <template #title>
                        <div class="cell-title-with-icon">
                            <van-icon name="share-o" size="20" class="title-icon" />
                            <span>把记账本推荐给朋友</span>
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>

            <div class="footer-links">
                <span @click="navigateToFaq">常见问题</span>
                <span class="divider">|</span>
                <span @click="navigateToFeedback">我要反馈</span>
            </div>
        </div>

        <van-tabbar v-model="activeTab" fixed placeholder safe-area-inset-bottom route class="custom-tabbar">
            <van-tabbar-item name="details" icon="orders-o" to="/details">明细</van-tabbar-item>
            <van-tabbar-item name="stats" icon="chart-trending-o" to="/statistics">统计</van-tabbar-item>
            <van-tabbar-item name="settings" icon="setting-o" to="/settings">设置</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue';
import { useRouter } from 'vue-router'; // 假设使用 Vue Router
import { showToast } from 'vant';
// import 'vant/es/toast/style';

defineOptions({
    name: 'SettingsPage',
});

const router = useRouter();

// 导航栏和标签栏状态
const activeTab = ref('settings'); // 当前页面对应的标签

// 开关状态
const syncWechatBills = ref<boolean>(false);
const dailyReport = ref<boolean>(true); // 假设日报默认开启
const monthlyReport = ref<boolean>(true); // 假设月报默认开启

// 导航栏右上角操作
const showMoreOptions = () => {
    showToast('更多选项...');
};
const toggleGlobalVisibility = () => {
    showToast('切换全局可见性...');
};

// 开关变化事件处理
const onSyncWechatChange = (checked: boolean) => {
    showToast(`自动同步微信支付账单: ${checked ? '已开启' : '已关闭'}`);
    // 在此添加实际的逻辑，例如保存用户设置
};
const onDailyReportChange = (checked: boolean) => {
    showToast(`记账日报: ${checked ? '已开启' : '已关闭'}`);
};
const onMonthlyReportChange = (checked: boolean) => {
    showToast(`记账月报: ${checked ? '已开启' : '已关闭'}`);
};

// 导航事件处理
const navigateToMonthlyReminder = () => {
    showToast('跳转到每月收付款提醒');
    // router.push('/monthly-reminder-settings');
};
const navigateToCategoryManagement = () => {
    showToast('跳转到分类管理');
    // router.push('/category-management');
};
const recommendToFriends = () => {
    showToast('正在调起分享...');
    // 实现分享逻辑，例如使用浏览器的 Web Share API 或调用 App 的分享接口
    if (navigator.share) {
        navigator.share({
            title: '推荐记账本App',
            text: '快来试试这款好用的记账本App吧！',
            url: window.location.origin, // 或者你的App推广链接
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    } else {
        showToast('您的浏览器不支持分享功能，请手动复制链接。');
    }
};
const navigateToFaq = () => {
    showToast('跳转到常见问题');
    // router.push('/faq');
};
const navigateToFeedback = () => {
    showToast('跳转到我要反馈');
    // router.push('/feedback');
};

</script>

<style lang="less" scoped>
// 颜色和尺寸变量 (可以从您之前的代码或全局CSS变量中引入)
@primary-color: #008080; // 主题绿色 (与记账本首页导航栏一致)
@background-color: #f7f8fa;
@cell-background-color: #ffffff;
@text-color: #323233;
@text-color-light: #969799;
@text-color-link: #586994; // 底部链接颜色
@border-color: #ebedf0;

.settings-page {
    background-color: @background-color;
    min-height: 100vh;
    padding-bottom: 60px; // 为底部 TabBar 预留空间
}

.custom-nav-bar {
    --van-nav-bar-background-color: @primary-color;
    --van-nav-bar-title-text-color: #ffffff;
    --van-nav-bar-icon-color: #ffffff;

    :deep(.van-nav-bar__title) {
        font-weight: normal; // 设计稿标题不加粗
    }

    .nav-right-actions {
        display: flex;
        align-items: center;

        .van-icon {
            color: #fff; // 确保图标也是白色
        }
    }
}

.page-content {
    padding-top: 10px; // 与导航栏的间距
}

.settings-group {
    margin-bottom: 10px; // 组之间的间距
    // Vant CellGroup inset 默认有圆角和左右边距
}

.switch-cell {

    // Vant Cell center 已经帮助垂直居中
    :deep(.van-cell__title) {
        font-size: 15px;
    }

    &.with-label {

        // 带说明文字的cell
        :deep(.van-cell__label) {
            margin-top: 4px;
            font-size: 12px;
            color: @text-color-light;
            line-height: 1.4;
        }
    }
}


.action-cell {
    &.recommend-cell {
        :deep(.van-cell__title) {
            color: @text-color; // 推荐给朋友的文字颜色
            font-size: 15px;
        }

        .cell-title-with-icon {
            display: flex;
            align-items: center;

            .title-icon {
                margin-right: 8px;
                color: @text-color-light; // 分享图标颜色
            }
        }
    }
}


.footer-links {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 13px;
    color: @text-color-link;

    span {
        cursor: pointer;
        padding: 0 5px;
    }

    .divider {
        color: @text-color-light; // 分隔线颜色
        cursor: default;
    }
}

.custom-tabbar {
    // 可以根据需要自定义标签栏样式，例如激活颜色
    // --van-tabbar-item-active-color: @primary-color;
}
</style>