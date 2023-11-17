import { post } from '../axios'

// 登录
export const loginApi = (params) => post('login', params)
