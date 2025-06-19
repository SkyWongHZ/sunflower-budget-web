/**
 * 网络请求统一处理
 */

// 请求基础配置
const BASE_URL = 'https://api.example.com'
const TIMEOUT = 10000

// 请求响应接口定义
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 请求配置接口
export interface RequestConfig {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
  timeout?: number
}

/**
 * 封装uni.request
 */
export const request = <T = any>(config: RequestConfig): Promise<ApiResponse<T>> => {
  return new Promise((resolve, reject) => {
    // 显示loading
    uni.showLoading({
      title: '加载中...',
      mask: true
    })

    uni.request({
      url: BASE_URL + config.url,
      method: config.method || 'GET',
      data: config.data,
      header: {
        'Content-Type': 'application/json',
        // 添加token等认证信息
        'Authorization': uni.getStorageSync('token') || '',
        ...config.header
      },
      timeout: config.timeout || TIMEOUT,
      success: (res: any) => {
        uni.hideLoading()
        
        const response = res.data as ApiResponse<T>
        
        if (response.code === 200) {
          resolve(response)
        } else {
          // 处理业务错误
          uni.showToast({
            title: response.message || '请求失败',
            icon: 'none'
          })
          reject(new Error(response.message || '请求失败'))
        }
      },
      fail: (error) => {
        uni.hideLoading()
        console.error('请求失败:', error)
        
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

/**
 * GET请求
 */
export const get = <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => {
  return request<T>({
    url,
    method: 'GET',
    data,
    ...config
  })
}

/**
 * POST请求
 */
export const post = <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => {
  return request<T>({
    url,
    method: 'POST',
    data,
    ...config
  })
}

/**
 * PUT请求
 */
export const put = <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => {
  return request<T>({
    url,
    method: 'PUT',
    data,
    ...config
  })
}

/**
 * DELETE请求
 */
export const del = <T = any>(url: string, data?: any, config?: Partial<RequestConfig>) => {
  return request<T>({
    url,
    method: 'DELETE',
    data,
    ...config
  })
} 