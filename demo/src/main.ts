import { createSSRApp } from "vue";
import App from "./App.vue";
import {mockRequest} from './mock/index'

mockRequest();

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
