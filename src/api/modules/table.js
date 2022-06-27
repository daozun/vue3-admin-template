import { get, post, put, del } from "../axios";

// 增加
export const addTable = (params) => post("table", params);

// 搜索
export const getTable = (params) => get("table", params);
