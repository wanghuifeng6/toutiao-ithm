import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入vuex
import store from '@/store'
// 引入全局css
import './styles/index.less'
import '@/styles/index.css'
// 引入Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入移动端 REM 适配
import 'amfe-flexible'
// 导入过滤时间的文件
import '@/utils/dayjs'
Vue.config.productionTip = false

Vue.use(Vant)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
