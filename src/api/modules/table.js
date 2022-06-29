import { get, post, put, del } from "../axios";

// 增加
export const addTable = (params) => post("table", params);

// 搜索单个
export const getTable = (params) => get("table", params);

// 搜索列表
export const getTableList = (params) => get("tablelist", params);

// 更新
export const updateTable = (params) => put("table", params);

// 删除
export const delTable = (params) => del("table", params);
