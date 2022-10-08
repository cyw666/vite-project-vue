/**
 * @desc 邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @desc 手机号
 * @export
 * @param {string | number} val
 * @returns {Boolean}
 */
export function validPhone(val) {
  const reg = /^1(2|3|4|5|6|7|8)\d{9}$/
  return reg.test(val)
}

/**
 * @desc 身份证
 * @export
 * @param {string} val
 * @returns {Boolean}
 */
export function validIDCard(val) {
  const reg =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
  return reg.test(val)
}
