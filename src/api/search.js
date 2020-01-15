import request from '@/utils/request'
// 导出一个函数 组件中直接调用
/**
 *
 * 封装搜索内容模块
 */
export function getSearch (q) {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
