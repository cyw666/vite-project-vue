import { acceptHMRUpdate, defineStore } from 'pinia'
import { isEmpty } from 'lodash-es'
import {
  login,
  signup,
  getUserInfo,
  updateUserInfo,
  authWechatSign,
} from '~/api/user'

import storage from 'store'

import { ACCESS_TOKEN, USER_INFO } from '~/stores/mutation-types'
import type { UserInfo } from '~/stores/types'

export interface UserState {
  token: string
  info: UserInfo
}
export interface ResponseUser {
  token: string
  userInfo: UserInfo
}
export const useUserStore = defineStore('user', () => {
  const state = reactive<UserState>({
    token: storage.get(ACCESS_TOKEN, ''),
    info: storage.get(USER_INFO, { id: '', username: '', avatar: '' }),
  })

  const userID = computed(() => state.info.id)
  const username = computed(() => state.info.username)
  const avatar = computed(() => state.info.avatar)
  const nickname = computed(() => state.info.nickname)

  const SET_TOKEN = (token: string) => {
    state.token = token
    storage.set(ACCESS_TOKEN, token)
  }

  const SET_INFO = (info: UserInfo) => {
    state.info = info
    storage.set(USER_INFO, info)
  }

  // 登录
  const Login = (payload: any) => {
    return login(payload).then((response: any) => {
      const { userInfo, token } = response
      SET_TOKEN(token)
      SET_INFO(userInfo)
      return userInfo
    })
  }

  // 获取用户信息
  const GetUserInfo = () => {
    if (!userID.value) return Promise.resolve()
    return getUserInfo(userID.value).then((response: any) => {
      SET_INFO(response)
      return response
    })
  }

  // 刷新用户信息
  const RefreshUserInfo = () => {
    const token = storage.get(ACCESS_TOKEN, '')
    const userInfo = storage.get(USER_INFO, {
      id: '',
      username: '',
      avatar: '',
    })
    SET_TOKEN(token)
    SET_INFO(userInfo)

    if (!userID.value) {
      return Promise.resolve(userInfo)
    } else {
      return getUserInfo(userID.value).then((response: any) => {
        SET_INFO(response)
        return response
      })
    }
  }

  // 更新用户信息
  const UpdateUserInfo = (payload: any) => {
    return updateUserInfo(userID.value, payload).then((response) => {
      RefreshUserInfo()
      return response
    })
  }

  // 登出
  const Logout = () => {
    SET_TOKEN('')
    SET_INFO({
      id: '',
      username: '',
      avatar: '',
    })
    storage.remove(ACCESS_TOKEN)
    storage.remove(USER_INFO)
  }

  const Signup = (payload: any) => {
    return signup(payload).then((response: any) => {
      const { userInfo, token } = response
      SET_TOKEN(token)
      SET_INFO(userInfo)
    })
  }

  // 微信登录
  const WechatLogin = (payload: any) => {
    return authWechatSign(payload).then((response: any) => {
      if (!response || isEmpty(response)) return
      const { userInfo, token } = response
      SET_TOKEN(token)
      SET_INFO(userInfo)
      return userInfo
    })
  }

  return {
    ...toRefs(state),
    userID,
    username,
    nickname,
    avatar,
    Login,
    GetUserInfo,
    RefreshUserInfo,
    UpdateUserInfo,
    Logout,
    Signup,
    WechatLogin,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
