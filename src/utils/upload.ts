import {
  join,
  map,
  range,
  random,
  assign,
  pick,
  keys,
  last,
  split,
  each,
  startsWith,
} from 'lodash-es'
import axios from 'axios'
import request from '~/api/request'
// const uploadHost =
//   window.location.origin.indexOf('app.fetalk.cn') > -1
//     ? 'https://app.fetalk.cn/oss'
//     : '/oss/token'
const uploadHost = '/oss/token'
const store = {
  host: '',
  assetsPrefix: '',
  keyPrefix: '',
  expiration: '',
  certificate: {
    ossAccessKeyId: '',
    policy: '',
    signature: '',
  },
}

const isExpired = function isExpired(date, period = 1) {
  const target = new Date(date)

  return Date.now() >= target.getTime() - period * 60 * 1000
}

export const randomString = function randomString(len = 13) {
  const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  return join(
    map(range(0, len), () => str[random(str.length - 1)]),
    ''
  )
}

export function getUploadConfig() {
  if (store.expiration) {
    const hasExpired = isExpired(store.expiration)

    if (!hasExpired) {
      return Promise.resolve(store)
    }
  }
  return request.get(uploadHost).then((response) => {
    assign(store, pick(response, keys(store)))
    return store
  })
}

export async function uploadHandler(file) {
  console.log(file)
  try {
    const { host, keyPrefix, assetsPrefix, certificate } =
      await getUploadConfig()
    const ext = last(split(file.name, '.'))
    const slug = randomString()
    const filename = `${keyPrefix}${slug}.${ext}`

    const formData = new FormData()

    formData.append('Cache-Control', 'public, max-age=31536000')

    each(certificate, (value, key) => {
      formData.append(key, value)
    })

    formData.append('key', filename)

    if (file instanceof File) {
      formData.append('file', file)
    } else if (file.blob) {
      formData.append('file', file.blob)
    }
    await axios.post(`//${host}`, formData)
    let url = `${assetsPrefix}/${filename}`
    url = startsWith(url, 'http') ? url : `https:${url}`
    const result = {
      ossName: filename,
      originalName: file.name,
      url,
      name: filename,
    }
    return result
  } catch (error) {
    console.warn(error)
  }
}

export default function upload(context) {
  const { file } = context
  return uploadHandler(file)
}
