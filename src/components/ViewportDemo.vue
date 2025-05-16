<template>
    <div class="viewport-demo">
        <h2 class="title">Viewport适配测试 (375px设计稿)</h2>
        <div class="box">
            <p>这个盒子宽度是375px（设计稿宽度），应该占满全屏</p>
        </div>
        <div class="box-half">
            <p>这个盒子宽度是187.5px（设计稿一半宽度），应该占屏幕的50%</p>
        </div>
        <div class="buttons-container">
            <van-button type="primary" size="normal">按钮也会适配</van-button>
            <van-button type="success" size="small">小按钮</van-button>
        </div>
        <div class="text-container">
            <p class="text-normal">这是16px的文字</p>
            <p class="text-large">这是24px的文字</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ViewportDemo'
})
</script>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.viewport-demo {
    padding: 20px;
}

.title {
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
}

.box {
    width: 375px;
    height: 100px;
    background-color: #f2f2f2;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid #ccc;
}

.box-half {
    width: 187.5px;
    height: 100px;
    background-color: #e0e0e0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border: 1px solid #ccc;
}

.buttons-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
}

.text-container {
    margin-top: 20px;
}

.text-normal {
    font-size: 16px;
    margin-bottom: 10px;
}

.text-large {
    font-size: 24px;
    margin-bottom: 10px;
}
</style>