import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import 'normalize.css/normalize.css'

import '@/styles/index.scss' // global cs

// 样式丢失，按需引入
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-notification.css'

import '@/icons' // icon

import '@/permission' // permission control

// pinia
import pinia from '@/store/index'

// lodash
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'

// directive
import { handleBtnPermission } from '@/directive'

const app = createApp(App)
app.config.productionTip = false

handleBtnPermission(app)
app.use(router).use(pinia).mount('#app')
