import { post } from '../axios'

// 注册
export const registerApi = (params) => post('register', params)
