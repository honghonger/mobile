// 封装用户请求模块
import request from '@/utils/request'
// 导出一个函数 组件中直接调用
export function onLogin (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
