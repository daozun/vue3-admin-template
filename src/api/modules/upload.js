import { post } from '../axios'

// 上传头像
export const uploadImg = (params) => post('user/upload/avatar', params)
