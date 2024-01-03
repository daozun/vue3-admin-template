import { get, post } from '../axios'

// 获取单个用户
export const getAllRole = (params) => get(`role`)

// 保存选中数据
export const saveRoleMenu = (params) => post(`role/menu`, params)

// 获取默认选中数据
export const getRoleMenu = (params) => get(`role/menu`, params)

// 获取登录后的动态菜单
export const getAuthMenu = (params) => get(`role/auth/menu`, params)
