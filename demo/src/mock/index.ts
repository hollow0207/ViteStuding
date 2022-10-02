import Mock from 'mockjs'
import home from './home_mock'
import { MockParams } from './typing'
import user from './user'
// 需要遍历的请求
const mocks = [...user, ...home]

// 设置200-2000毫秒延时请求数据
// Mock.setup({
//   timeout: '200-600'
// })

// 接口拦截
export function mockRequest() {
  let i: MockParams
  for (i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
  }
}

