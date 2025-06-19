/**
 * 验证工具函数
 */

/**
 * 验证手机号
 */
export const validatePhone = (phone: string): boolean => {
  const phoneReg = /^1[3-9]\d{9}$/
  return phoneReg.test(phone)
}

/**
 * 验证邮箱
 */
export const validateEmail = (email: string): boolean => {
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailReg.test(email)
}

/**
 * 验证身份证号
 */
export const validateIdCard = (idCard: string): boolean => {
  const idCardReg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return idCardReg.test(idCard)
}

/**
 * 验证密码强度
 */
export const validatePassword = (password: string): {
  valid: boolean
  strength: 'weak' | 'medium' | 'strong'
  message: string
} => {
  if (password.length < 6) {
    return {
      valid: false,
      strength: 'weak',
      message: '密码长度至少6位'
    }
  }

  let score = 0
  
  // 包含小写字母
  if (/[a-z]/.test(password)) score++
  // 包含大写字母
  if (/[A-Z]/.test(password)) score++
  // 包含数字
  if (/\d/.test(password)) score++
  // 包含特殊字符
  if (/[^a-zA-Z0-9]/.test(password)) score++

  if (score < 2) {
    return {
      valid: false,
      strength: 'weak',
      message: '密码强度太弱，请包含字母和数字'
    }
  } else if (score < 3) {
    return {
      valid: true,
      strength: 'medium',
      message: '密码强度中等'
    }
  } else {
    return {
      valid: true,
      strength: 'strong',
      message: '密码强度很强'
    }
  }
}

/**
 * 验证URL
 */
export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证中文姓名
 */
export const validateChineseName = (name: string): boolean => {
  const nameReg = /^[\u4e00-\u9fa5]{2,10}$/
  return nameReg.test(name)
}

/**
 * 验证银行卡号
 */
export const validateBankCard = (cardNumber: string): boolean => {
  const cardReg = /^\d{16,19}$/
  return cardReg.test(cardNumber)
}

/**
 * 验证必填项
 */
export const validateRequired = (value: any): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
} 