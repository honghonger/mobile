
import request from '@/utils/request'
// 导出一个函数 组件中直接调用
/**
 *
 * 封装文章列表请求
 */
export function getArticles (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
