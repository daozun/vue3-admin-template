import { get } from '../axios'

// 获取单个用户
export const getUser = (params) => get(`user/${params.id}`)
