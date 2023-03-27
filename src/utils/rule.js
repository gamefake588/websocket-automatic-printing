/**
 * 验证手机号格式 只要是13,14,15,16,17,18,19开头即可"
 */
const isPhone = (phone) => /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)

export { isPhone }
