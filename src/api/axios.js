import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import { RESPONSECODE } from '@/enum/index'
import { getToken, logOut } from '@/utils/auth'
import router from '../router'

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
    if (
      res.data.statusCode !== RESPONSECODE.OK &&
      res.data.statusCode !== RESPONSECODE.CREATED
    ) {
      ElMessage({
        message: res.data.message,
        type: 'error'
      })
    }

    return res.data
  },
  (error) => {
    const message = error.response.data?.message
    const statusCode = error.response.data?.statusCode

    if (statusCode === RESPONSECODE.UNAUTHORIZED) {
      logOut()
      router.push('/login')
    }

    ElMessage({
      type: 'error',
      message: message || '服务器错误'
    })

    return error.response.data
  }
)

export function get (url, params, config) {
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

export function post (url, params, config) {
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

export function del (url, params, config) {
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

export function put (url, params, config) {
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

export function patch (url, params, config) {
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
