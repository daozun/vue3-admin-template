import { post } from "../axios";

// 增加
export const addTable = (params) => post("table", params);
