import { createSSRApp } from "vue";
import App from "./App.vue";
// 引入uview

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
