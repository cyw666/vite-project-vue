import dayjs from 'dayjs'
import ClipboardJS from 'clipboard'
import type { Options } from 'clipboard'
import type { ConfigType } from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export function copyText(text: string, container: Options['container']) {
  return new Promise(function (resolve, reject) {
    const fakeElement = document.createElement('button')
    const clipboard = new ClipboardJS(fakeElement, {
      text: () => text,
      action: () => 'copy',
      container: typeof container === 'object' ? container : document.body,
    })
    clipboard.on('success', function (e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function (e) {
      clipboard.destroy()
      reject(e)
    })
    document.body.appendChild(fakeElement)
    fakeElement.click()
    document.body.removeChild(fakeElement)
  })
}

/**
 * @desc 移除对象中空值
 * @param {*} obj
 * @param {*} recurse 是否递归
 */
type anyObj = {
  [key: string]: any
}
export function deleteEmpty(obj: anyObj, recurse = false): anyObj | undefined {
  if (!obj) return
  for (const i in obj) {
    if (obj[i] === '' || obj[i] === null || obj[i] === undefined) {
      delete obj[i]
    } else if (recurse && typeof obj[i] === 'object') {
      deleteEmpty(obj[i], recurse)
    }
  }
  return obj
}

export function dateFormat(date: ConfigType, format = 'YYYY-MM-DD') {
  if (!date) return
  return dayjs(date).format(format)
}

export function ossImageResize(url: string, width = 400) {
  return `${url}?x-oss-process=image/resize,w_${width},m_lfit`
}
