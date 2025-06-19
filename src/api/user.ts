/**
 * 用户相关API接口
 */
import { get, post } from './request'

// 用户信息接口定义
export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  phone: string
}

// 登录参数接口
export interface LoginParams {
  username: string
  password: string
}

// 登录响应接口
export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

/**
 * 用户登录
 */
export const login = (params: LoginParams) => {
  return post<LoginResponse>('/auth/login', params)
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return get<UserInfo>('/user/info')
}

/**
 * 用户登出
 */
export const logout = () => {
  return post('/auth/logout')
}

/**
 * 更新用户信息
 */
export const updateUserInfo = (userInfo: Partial<UserInfo>) => {
  return post<UserInfo>('/user/update', userInfo)
} 