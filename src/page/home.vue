<!--
 * @Description  : 
 * @Author       : Sky
 * @Date         : 2022-12-08 11:38:22
-->

<template>
  <div>这是home页面</div>
  <div>
    <el-button @click="increment" type="primary">add</el-button>
    <el-button type="success">Success</el-button>
    <!-- <button>add</button> -->
  </div>
  <div>Count is :{{ count }}</div>
  <h1 :class="titleClass">make me red</h1>

  <input v-model="text" placeholder="Type here" />
  <p>{{ text }}</p>

  <Fragment>
    <button @click="toggle">toggle</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
  </Fragment>

  <Fragment>
    <ul v-for="item in todos">
      <li :key="item.id">{{ item.text }}</li>
    </ul>
  </Fragment>

  <Fragment>
    <p ref="p">hello world</p>
  </Fragment>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const count = ref(0)
const titleClass = ref('title')
const p = ref(null)

const text = ref('')
let awesome = ref(true)

const todos = ref([
  { id: 1, text: 'learn html' },
  { id: 2, text: 'learn javascript' },
  { id: 3, text: 'learn vue' }
])

function onInput(e) {
  text.value = e.target.value
}

function increment() {
  count.value++
  // console.log(this.$store);
}

function toggle(params) {
  console.log('awesome:', awesome)
  awesome.value = !awesome.value
}
onMounted(() => {
  // console.log(`The initial count is ${count.value}`);
  p.value.texContent = 'mounted'
  console.log(`value`, p.value)
})
</script>

<style scoped lang="less">
.title {
  color: red;
}
</style>
