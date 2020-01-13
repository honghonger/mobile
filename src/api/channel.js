/**
 * 封装全部频道请求模块
 */
import request from '@/utils/request'
/**
 *
 * 封装全部频道请求
 */
export function getAllChannels () {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
