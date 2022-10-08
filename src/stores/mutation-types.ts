const storePrefix = 'c'
function createName(key: string) {
  return `${storePrefix}-${key}`
}
export const ACCESS_TOKEN = createName('Access-Token')
export const USER_INFO = createName('user_info')
