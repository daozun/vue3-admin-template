import { get, post, put, del } from '../axios'

// 增加
export const addTable = (params) => post('api/article', params)

// 搜索单个
export const getTable = (params) => get('api/article', params)

// 搜索列表
export const getTableList = (params) => get('api/articleList', params)

// 更新
export const updateTable = (params) => put('api/article', params)

// 删除
export const delTable = (params) => del('api/article', params)
