<template>
    <div class="less-demo">
        <h2 class="title">Less样式演示</h2>

        <section class="section">
            <h3>颜色展示</h3>
            <div class="color-blocks">
                <div class="color-block primary">Primary</div>
                <div class="color-block success">Success</div>
                <div class="color-block warning">Warning</div>
                <div class="color-block danger">Danger</div>
            </div>
        </section>

        <section class="section">
            <h3>文本样式</h3>
            <p class="text text-primary">Primary文本颜色</p>
            <p class="text text-success">Success文本颜色</p>
            <p class="text text-warning">Warning文本颜色</p>
            <p class="text text-danger">Danger文本颜色</p>
            <p class="text text-light">Light文本颜色</p>
        </section>

        <section class="section">
            <h3>字体大小</h3>
            <p class="font-xs">超小号字体 (12px)</p>
            <p class="font-sm">小号字体 (14px)</p>
            <p class="font-md">中号字体 (16px)</p>
            <p class="font-lg">大号字体 (18px)</p>
            <p class="font-xl">超大号字体 (20px)</p>
        </section>

        <section class="section">
            <h3>内边距演示</h3>
            <div class="padding-demo">
                <div class="p-xs">超小内边距 (8px)</div>
                <div class="p-sm">小内边距 (12px)</div>
                <div class="p-md">中内边距 (16px)</div>
                <div class="p-lg">大内边距 (20px)</div>
                <div class="p-xl">超大内边距 (24px)</div>
            </div>
        </section>

        <section class="section">
            <h3>Less嵌套和混合示例</h3>
            <div class="nested-demo">
                <div class="nested-item">
                    <p>Less支持嵌套语法</p>
                    <span>这是一个嵌套元素</span>
                </div>
                <button class="demo-button primary">主要按钮</button>
                <button class="demo-button success">成功按钮</button>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LessDemo'
})
</script>

<script setup lang="ts">
// 组件逻辑
</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';

.less-demo {
    padding: @padding-lg;

    .title {
        font-size: @font-size-xl;
        color: @text-color;
        margin-bottom: @padding-lg;
        text-align: center;
    }

    .section {
        margin-bottom: @padding-xl;

        h3 {
            margin-bottom: @padding-md;
            color: @text-color;
            font-size: @font-size-lg;
            border-bottom: 1px solid #eee;
            padding-bottom: @padding-xs;
        }
    }

    .color-blocks {
        display: flex;
        flex-wrap: wrap;
        gap: @padding-sm;

        .color-block {
            width: 100px;
            height: 80px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: @border-radius-md;

            &.primary {
                background-color: @primary-color;
            }

            &.success {
                background-color: @success-color;
            }

            &.warning {
                background-color: @warning-color;
            }

            &.danger {
                background-color: @danger-color;
            }
        }
    }

    .text {
        margin-bottom: @padding-xs;
    }

    .padding-demo {
        >div {
            margin-bottom: @padding-xs;
            background-color: #f5f5f5;
            border-radius: @border-radius-sm;
            border: 1px dashed #ccc;
        }
    }

    // 混合器示例
    .button-style(@bg-color) {
        background-color: @bg-color;
        color: white;
        border: none;
        padding: @padding-xs @padding-md;
        border-radius: @border-radius-md;
        margin-right: @padding-sm;
        cursor: pointer;

        &:hover {
            opacity: 0.8;
        }
    }

    .nested-demo {
        margin-top: @padding-md;

        .nested-item {
            padding: @padding-md;
            background-color: #f9f9f9;
            border-radius: @border-radius-md;
            margin-bottom: @padding-md;

            p {
                margin-bottom: @padding-xs;
                font-weight: bold;
            }

            span {
                color: @text-color-light;
            }
        }

        .demo-button {
            &.primary {
                .button-style(@primary-color);
            }

            &.success {
                .button-style(@success-color);
            }
        }
    }
}
</style>