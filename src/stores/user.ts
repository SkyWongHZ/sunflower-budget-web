/**
 * 用户状态管理
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { UserInfo } from '../api/user'
import { setStorage, getStorage, removeStorage, STORAGE_KEYS } from '../utils/storage'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string>('')
  const userInfo = ref<UserInfo | null>(null)
  const isLogin = computed(() => !!token.value && !!userInfo.value)

  // 初始化从本地存储恢复状态
  const initFromStorage = () => {
    token.value = getStorage(STORAGE_KEYS.TOKEN) || ''
    userInfo.value = getStorage(STORAGE_KEYS.USER_INFO)
  }

  // 设置token
  const setToken = (newToken: string) => {
    token.value = newToken
    setStorage(STORAGE_KEYS.TOKEN, newToken)
  }

  // 设置用户信息
  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info
    setStorage(STORAGE_KEYS.USER_INFO, info)
  }

  // 登录
  const login = (tokenValue: string, userInfoValue: UserInfo) => {
    setToken(tokenValue)
    setUserInfo(userInfoValue)
  }

  // 登出
  const logout = () => {
    token.value = ''
    userInfo.value = null
    removeStorage(STORAGE_KEYS.TOKEN)
    removeStorage(STORAGE_KEYS.USER_INFO)
  }

  // 更新用户信息
  const updateUserInfo = (updates: Partial<UserInfo>) => {
    if (userInfo.value) {
      userInfo.value = { ...userInfo.value, ...updates }
      setStorage(STORAGE_KEYS.USER_INFO, userInfo.value)
    }
  }

  return {
    // 状态
    token,
    userInfo,
    isLogin,
    
    // 方法
    initFromStorage,
    setToken,
    setUserInfo,
    login,
    logout,
    updateUserInfo
  }
}) 