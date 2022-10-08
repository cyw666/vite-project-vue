export function getConstName(val, list, key = 'value', getKey = 'label') {
  if (!list) return
  const item = find(list, (v) => v[key] === val)
  return item && item[getKey]
}

// 通知平台
export const PLATFORM_NOTICE = {
  WEB_HOOK: 'WEB_HOOK',
  EMAIL: 'EMAIL',
  PHONE: 'PHONE',
}

// 用户打赏物状态
export const TICKETS_STATE = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
}
export const TICKETS_STATE_LIST = [
  { label: '启用', value: TICKETS_STATE.ENABLE },
  { label: '禁用', value: TICKETS_STATE.DISABLE },
]

export const PAY_TYPE = {
  ALIPAY: 'ALIPAY',
  WECHAT: 'WECHAT',
}
export const PAY_TYPE_LIST = [
  { label: '支付宝', value: PAY_TYPE.ALIPAY },
  { label: '微信支付', value: PAY_TYPE.WECHAT },
]

export const PAY_RESULT_STATUS = {
  WAIT_TO_PAY: 'WAIT_TO_PAY',
  DONE: 'DONE',
}

export const PLATFORM_TYPE = {
  PC: 'PC',
  MOBILE: 'MOBILE',
}

export const CHANNELNAMEMAP = {
  [PAY_TYPE.ALIPAY]: '支付宝',
  [PAY_TYPE.WECHAT]: '微信',
}

export const TRANSFERSTATUS = {
  DISABLED: 'DISABLED',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}
// 验证码类型
export const SEND_CODE_TYPE = {
  SIGNUP: 'signup',
  LOGIN: 'login',
  RESET_PHONE: 'reset-phone',
  UNBIND_WECHAT: 'unbind-wechat',
  UNBIND_ALIPAY: 'unbind-alipay',
}
