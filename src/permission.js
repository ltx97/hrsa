// 权限拦截 导航守卫 路由守卫  router
import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
import { getTokenTime } from '@/utils/auth'

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 获取当前的token
  console.log(store.getters.userInfo)
  if (!store.getters.userInfo.token) {
    // token不存在
    if (whiteList.includes(to.fullPath)) {
      // 如果to在白名单里 放行
      next()
    } else {
      // 不在白名单 跳转到登录页
      next('/login')
    }
  } else {
    // token存在，判断当前token是否有效
    // 当前时间 - token存储时间 > 60 ? 无效 : 有效
    if ((Date.now() - getTokenTime()) / 1000 > 10) {
      // 无效，清空token,跳转到登录
      await store.dispatch('user/clearUser')
      next('/login')
    } else {
      if (!store.state.user.userInfo.username) {
        await store.dispatch('user/getUserInfo')
      }
      // 有效放行
      next()
    }
  }
  NProgress.done() // 完成进度条
})

router.afterEach(() => {
  NProgress.done() // 完成进度条
})
