/**
 * 本地存储工具函数
 */

/**
 * 设置存储
 */
export const setStorage = (key: string, value: any): boolean => {
  try {
    uni.setStorageSync(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('存储设置失败:', error)
    return false
  }
}

/**
 * 获取存储
 */
export const getStorage = <T = any>(key: string, defaultValue?: T): T | null => {
  try {
    const value = uni.getStorageSync(key)
    if (value) {
      return JSON.parse(value) as T
    }
    return defaultValue || null
  } catch (error) {
    console.error('存储获取失败:', error)
    return defaultValue || null
  }
}

/**
 * 移除存储
 */
export const removeStorage = (key: string): boolean => {
  try {
    uni.removeStorageSync(key)
    return true
  } catch (error) {
    console.error('存储移除失败:', error)
    return false
  }
}

/**
 * 清空所有存储
 */
export const clearStorage = (): boolean => {
  try {
    uni.clearStorageSync()
    return true
  } catch (error) {
    console.error('存储清空失败:', error)
    return false
  }
}

/**
 * 获取存储信息
 */
export const getStorageInfo = () => {
  try {
    return uni.getStorageInfoSync()
  } catch (error) {
    console.error('获取存储信息失败:', error)
    return null
  }
}

// 常用的存储键名
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo',
  THEME: 'theme',
  LANGUAGE: 'language',
  SETTINGS: 'settings'
} as const 