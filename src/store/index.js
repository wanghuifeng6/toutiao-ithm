import Vue from 'vue'
import Vuex from 'vuex'
// 按需导入封装好的获取和存储本地方法
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)
const TOKEN_KET = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 存储token
    // user: JSON.parse(window.localStorage.getItem('toutiao_token'))
    // 直接使用封装好的方法来获取数据
    user: getItem(TOKEN_KET)
  },
  getters: {},
  mutations: {
    setUser: (state, user) => {
      state.user = user
      // window.localStorage.setItem('toutiao_token', JSON.stringify(user))
      // 这边直接使用封装好的方法来进行本地存储(第一个参数为键,第二个为值)
      setItem(TOKEN_KET, state.user)
    }
  },
  actions: {},
  modules: {}
})
