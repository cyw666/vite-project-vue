import request from '~/api/request'

// 注册
export function signup(data: any) {
  return request.post('/auth/signup', data)
}

// 发送验证啊
export function sendPhoneCode(phone: string, type: string) {
  return request.post('/auth/phone/code', { phone, type })
}

// 登录
export function login(data: any) {
  return request.post('/auth/login/phone', data)
}

// 获取用户信息
export function getUserInfo(id: string) {
  return request.get(`/users/${id}`)
}

// 更新用户信息
export function updateUserInfo(id: string, data: any) {
  return request.put(`/users/${id}`, data)
}

// 获取微信code
export function authWechatCode(redirect: string) {
  return request.get('/auth/wechat/code', { params: { redirect } })
}

// 微信登录
export function authWechatSign(payload: any) {
  return request.post('/auth/wechat/sign', payload)
}
