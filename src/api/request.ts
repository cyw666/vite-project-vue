import axios, { type AxiosError } from 'axios'
import { cloneDeep, omit } from 'lodash-es'
import storage from 'store'
import { ElMessage, ElLoading } from 'element-plus'
import { ACCESS_TOKEN } from '~/stores/mutation-types'
import { deleteEmpty } from '~/utils'
import router from '~/router'
import { useUserStore } from '~/stores/user'

let loadingInstance: any
// 创建 axios 实例
const baseURL =
  import.meta.env.VITE_API_BASE_URL || `${import.meta.env.BASE_URL}api`
const request = axios.create({
  // API 请求的默认前缀
  baseURL,
  withCredentials: true,
  timeout: 6000, // 请求超时时间
})

export interface ErrorResponseData {
  message: string
}

// 异常拦截处理器
const errorHandler = (error: AxiosError<ErrorResponseData>) => {
  loadingInstance?.close()
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      ElMessage.error(data.message || '访问受限')
    } else if (error.response.status === 401) {
      ElMessage.error('请重新登录')
      useUserStore().Logout()
      router.push('/user/login')
    } else {
      ElMessage.error(data.message)
    }
    return Promise.reject(data)
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
  if (!config.params || config.params.loading !== false) {
    loadingInstance = ElLoading.service()
  }
  const token = storage.get(ACCESS_TOKEN)
  const params = cloneDeep(omit(config.params, 'loading'))
  config.params = deleteEmpty(params)
  if (token && config.headers) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  loadingInstance?.close()
  return response.data
}, errorHandler)

export default request
