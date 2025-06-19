/**
 * 通用API接口
 */
import { get, post } from './request'

// 上传文件响应接口
export interface UploadResponse {
  url: string
  filename: string
  size: number
}

/**
 * 文件上传
 */
export const uploadFile = (filePath: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'https://api.example.com/upload',
      filePath,
      name: 'file',
      header: {
        'Authorization': uni.getStorageSync('token') || ''
      },
      success: (res) => {
        try {
          const data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(data.data)
          } else {
            reject(new Error(data.message))
          }
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

/**
 * 获取系统配置
 */
export const getSystemConfig = () => {
  return get('/system/config')
}

/**
 * 意见反馈
 */
export const submitFeedback = (content: string, contact?: string) => {
  return post('/feedback', { content, contact })
} 