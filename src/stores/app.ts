/**
 * 应用状态管理
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { setStorage, getStorage, STORAGE_KEYS } from '@/utils/storage'

export const useAppStore = defineStore('app', () => {
  // 状态
  const theme = ref<'light' | 'dark'>('light')
  const language = ref<'zh-CN' | 'en-US'>('zh-CN')
  const loading = ref(false)
  const networkStatus = ref<'online' | 'offline'>('online')
  
  // 系统信息
  const systemInfo = ref<UniApp.GetSystemInfoResult | null>(null)

  // 初始化从本地存储恢复状态
  const initFromStorage = () => {
    theme.value = getStorage(STORAGE_KEYS.THEME) || 'light'
    language.value = getStorage(STORAGE_KEYS.LANGUAGE) || 'zh-CN'
  }

  // 设置主题
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    setStorage(STORAGE_KEYS.THEME, newTheme)
  }

  // 切换主题
  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  // 设置语言
  const setLanguage = (newLanguage: 'zh-CN' | 'en-US') => {
    language.value = newLanguage
    setStorage(STORAGE_KEYS.LANGUAGE, newLanguage)
  }

  // 设置加载状态
  const setLoading = (status: boolean) => {
    loading.value = status
  }

  // 设置网络状态
  const setNetworkStatus = (status: 'online' | 'offline') => {
    networkStatus.value = status
  }

  // 设置系统信息
  const setSystemInfo = (info: UniApp.GetSystemInfoResult) => {
    systemInfo.value = info
  }

  // 初始化系统信息
  const initSystemInfo = () => {
    try {
      const info = uni.getSystemInfoSync()
      setSystemInfo(info)
    } catch (error) {
      console.error('获取系统信息失败:', error)
    }
  }

  // 监听网络状态
  const initNetworkListener = () => {
    uni.onNetworkStatusChange((res) => {
      setNetworkStatus(res.isConnected ? 'online' : 'offline')
    })
  }

  return {
    // 状态
    theme,
    language,
    loading,
    networkStatus,
    systemInfo,
    
    // 方法
    initFromStorage,
    setTheme,
    toggleTheme,
    setLanguage,
    setLoading,
    setNetworkStatus,
    setSystemInfo,
    initSystemInfo,
    initNetworkListener
  }
}) 