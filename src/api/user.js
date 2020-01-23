// 封装用户请求模块
import request from '@/utils/request'
// 导出一个函数 组件中直接调用
/**
 *
 * 封装用户登录
 */
export function onLogin (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 *
 * 封装首页频道列表
 */
export function getUserChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 *
 * 封装用户关注
 */
export function following (userId) {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 *
 * 封装用户取消关注
 */
export function unfollowing (userId) {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}
