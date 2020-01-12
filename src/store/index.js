import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 数据初始化
    user: null
  },
  mutations: {
    // 定义一个方法，第一个参数默认就是state数据，第二个是用户传过来
    // 的参数，需要接收，里面逻辑就是修改state中的数据
    setuser (state, data) {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
