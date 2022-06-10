import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import "normalize.css/normalize.css";

import "@/styles/index.scss"; // global cs

import "@/icons"; // icon

import zhCn from "element-plus/es/locale/lang/zh-cn";

import "@/permission"; // permission control

// pinia
import pinia from "@/store/index";

// lodash
import _ from "lodash";

const app = createApp(App);
app.use(router).use(pinia).use({ locale: zhCn }).mount("#app");
