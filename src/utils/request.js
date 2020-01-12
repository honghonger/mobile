// 封装axios模块
// 导入axios
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
// 复制一个axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 配置后端返回数据超出js安全整数范围
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 读取到store里面的数据user
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// 导出request
export default request
