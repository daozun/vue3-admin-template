import { get } from '../axios'

// 全部菜单
export const getMenuList = (params) => get('menu/list', params)
