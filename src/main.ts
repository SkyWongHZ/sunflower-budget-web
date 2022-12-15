import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 创建一个新的store实例
const store = createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  }
})

const app = createApp(App)

app.use(store).use(ElementPlus).use(router).mount('#app')
