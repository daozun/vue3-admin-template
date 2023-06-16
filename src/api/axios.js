import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import { reponseCode } from '@/enum/index'
import { getToken } from '@/utils/auth'

const baseURL = process.env.VUE_APP_BASE_API

const http = axios.create({
  baseURL: baseURL,
  timeout: 60 * 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'x-tenant-header': 'keycode'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use((req) => {
  const token = getToken()

  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }

  return req
})

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (res) => {
    if (res.data.statusCode !== reponseCode.OK) {
      ElMessage({
        message: res.data.data.message,
        type: 'error'
      })
    }

    return res.data;
  },
  (error) => {
    const message = error.response.data?.message
    ElMessage({
      type: 'error',
      message: message || '服务器错误',
      duration: 1500
    })
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [axios配置]
 */
export function get(url, params, config) {
  return new Promise((resolve, reject) => {
    http
      .get(url, {
        ...config,
        params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [axios配置]
 */
export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    http
      .post(url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * del方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [axios配置]
 */
export function del(url, params, config) {
  return new Promise((resolve, reject) => {
    http
      .delete(url, {
        ...config,
        params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [axios配置]
 */
export function put(url, params, config) {
  return new Promise((resolve, reject) => {
    http
      .put(url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/**
 * patch方法，对应patch请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [axios配置]
 */
export function patch(url, params, config) {
  return new Promise((resolve, reject) => {
    http
      .patch(url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
