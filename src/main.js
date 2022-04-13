import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import "normalize.css/normalize.css";

import "@/styles/index.scss"; // global cs

import "@/icons"; // icon

import zhCn from "element-plus/es/locale/lang/zh-cn";

createApp(App).use(router).use({ locale: zhCn }).mount("#app");
