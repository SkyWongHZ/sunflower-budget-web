import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// 引入uView Plus
import uviewPlus from 'uview-plus'

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  
  app.use(pinia);
  // 使用uView Plus
  app.use(uviewPlus);
  
  return {
    app,
    pinia
  };
}
