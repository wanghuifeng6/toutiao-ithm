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
    user: getItem(TOKEN_KET),
    // 存放搜索历史
    History: JSON.parse(window.localStorage.getItem('HistoricalSearch')) || []
  },
  getters: {},
  mutations: {
    setUser: (state, user) => {
      state.user = user
      // window.localStorage.setItem('toutiao_token', JSON.stringify(user))
      // 这边直接使用封装好的方法来进行本地存储(第一个参数为键,第二个为值)
      setItem(TOKEN_KET, state.user)
    },
    // 更新搜索历史
    UpdateSearchHistory (state, p) {
      const index = state.History.findIndex((item) => item === p)
      console.log(index)
      // 看看是否有相同的值,如果有就截取掉之前的值并且在列表最前面添加
      if (index !== -1) {
        state.History.splice(index, 1)
        state.History.unshift(p)
        // 否则直接在最前面添加
      } else {
        state.History.unshift(p)
      }
      // 存储到本地(实现数据持久化)
      window.localStorage.setItem(
        'HistoricalSearch',
        JSON.stringify(state.History)
      )
    },
    // 删除搜索历史(删除之后同步数据,和本地)
    DeleteSearchHistory (state, p) {
      state.History.splice(p, 1)
      window.localStorage.setItem(
        'HistoricalSearch',
        JSON.stringify(state.History)
      )
    }
  },
  actions: {},
  modules: {}
})
