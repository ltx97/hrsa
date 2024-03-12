import { setUserInfo, removeUserInfo } from '@/utils/auth'
import { login, getInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo(state, userInfo) {
      console.log(state.userInfo)
      state.userInfo = Object.assign(state.userInfo, userInfo)
      console.log(state.userInfo)
      setUserInfo(state.userInfo)
    },
    removeUserInfo(state) {
      console.log('456')
      state.userInfo = {}
      removeUserInfo()
    },
    setToken(state, token) {
      state.userInfo.token = token
    }
  },
  actions: {
    async login(context, data) {
      const result = await login(data)
      // 获取token成功
      context.commit('setToken', result)
    },
    async clearUser(context) {
      context.commit('removeUserInfo')
    },
    async getUserInfo(context) {
      const apiUserInfo = await getInfo()
      // 用户信息获取成功，组合信息
      context.commit('setUserInfo', apiUserInfo)
    },
    async logout(context) {
      // 删除token
      // 删除用户资料
      context.commit('removeUserInfo')
    }
  }
}
