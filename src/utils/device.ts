/**
 * 设备相关工具函数
 */

/**
 * 获取系统信息
 */
export const getSystemInfo = () => {
  try {
    return uni.getSystemInfoSync()
  } catch (error) {
    console.error('获取系统信息失败:', error)
    return null
  }
}

/**
 * 获取平台信息
 */
export const getPlatform = (): string => {
  const systemInfo = getSystemInfo()
  return systemInfo?.platform || 'unknown'
}

/**
 * 判断是否为iOS
 */
export const isIOS = (): boolean => {
  return getPlatform() === 'ios'
}

/**
 * 判断是否为Android
 */
export const isAndroid = (): boolean => {
  return getPlatform() === 'android'
}

/**
 * 判断是否为微信小程序
 */
export const isWeChat = (): boolean => {
  // #ifdef MP-WEIXIN
  return true
  // #endif
  // #ifndef MP-WEIXIN
  return false
  // #endif
}

/**
 * 判断是否为H5
 */
export const isH5 = (): boolean => {
  // #ifdef H5
  return true
  // #endif
  // #ifndef H5
  return false
  // #endif
}

/**
 * 判断是否为App
 */
export const isApp = (): boolean => {
  // #ifdef APP-PLUS
  return true
  // #endif
  // #ifndef APP-PLUS
  return false
  // #endif
}

/**
 * 获取状态栏高度
 */
export const getStatusBarHeight = (): number => {
  const systemInfo = getSystemInfo()
  return systemInfo?.statusBarHeight || 0
}

/**
 * 获取导航栏高度
 */
export const getNavBarHeight = (): number => {
  const systemInfo = getSystemInfo()
  if (!systemInfo) return 44
  
  const { statusBarHeight = 0, platform } = systemInfo
  
  // iOS导航栏高度为44px
  if (platform === 'ios') {
    return statusBarHeight + 44
  }
  
  // Android导航栏高度为48px
  return statusBarHeight + 48
}

/**
 * 获取底部安全区域高度
 */
export const getSafeAreaBottom = (): number => {
  const systemInfo = getSystemInfo()
  if (!systemInfo) return 0
  
  const { safeArea, screenHeight, safeAreaInsets } = systemInfo
  
  if (safeAreaInsets) {
    return safeAreaInsets.bottom
  }
  
  if (safeArea) {
    return screenHeight - safeArea.bottom
  }
  
  return 0
}

/**
 * 获取屏幕宽度
 */
export const getScreenWidth = (): number => {
  const systemInfo = getSystemInfo()
  return systemInfo?.screenWidth || 375
}

/**
 * 获取屏幕高度
 */
export const getScreenHeight = (): number => {
  const systemInfo = getSystemInfo()
  return systemInfo?.screenHeight || 667
}

/**
 * rpx转px
 */
export const rpxToPx = (rpx: number): number => {
  const screenWidth = getScreenWidth()
  return (rpx * screenWidth) / 750
}

/**
 * px转rpx
 */
export const pxToRpx = (px: number): number => {
  const screenWidth = getScreenWidth()
  return (px * 750) / screenWidth
} 