import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // 如果token存在，往请求头塞入token
  if (store.getters.userInfo.token) {
    config.headers['mytoken'] = store.getters.userInfo.token
  }
  return config
})

// response interceptor
service.interceptors.response.use(rep => {
  const { success, message, data } = rep.data
  if (success) {
    return data
  } else {
    Message.error(message) // 提示錯誤信息
    return Promise.reject(new Error(message))
  }
}, err => {
  console.log(err)
  Message.error('出错了！！！') // 提示錯誤信息
  return Promise.reject(err)
}
)

export default service
