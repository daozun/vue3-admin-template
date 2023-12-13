import { get, post, patch, del } from '../axios'

// 全部菜单
export const getMenuList = (params) => get('menu/list', params)

// 新增菜单
export const addMenu = (params) => post('menu', params)

// 获取单个菜单
export const getMenu = (params) => get(`menu/${params.id}`)

// 更改菜单
export const updateMenu = (params) => patch(`menu/${params.id}`, params)

// 删除菜单
export const deleteMenu = (params) => del(`menu/${params.id}`)

// 获取其下的子菜单
export const getMenuChildren = (params) => get(`menu/children/${params.id}`)
