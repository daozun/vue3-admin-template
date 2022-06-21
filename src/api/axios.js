import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/src/message.scss";
import { reponseCode } from "@/enum/index";

const http = axios.create({
  baseURL: "/dev-api",
  timeout: 60 * 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "x-tenant-header": "keycode",
  },
});

/**
 * 请求拦截
 */
http.interceptors.request.use((req) => {
  return req;
});

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (res) => {
    const _res = {
      statusCode: res.data?.statusCode,
      message: res.data?.data?.message,
      data: res.data?.data?.data,
    };

    if (_res.statusCode === reponseCode.OK) {
      ElMessage({
        message: _res.message,
        type: "success",
      });
    } else {
      ElMessage({
        message: _res.message,
        type: "error",
      });
    }

    return _res;
  },
  (error) => {
    ElMessage({
      type: "error",
      message: "服务器出错！",
      duration: 1500,
    });
  }
);

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
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} config [axios配置]
 */
export function post(url, params, config) {
  console.log(
    "%c [ params ]-61",
    "font-size:13px; background:pink; color:#bf2c9f;",
    params
  );
  return new Promise((resolve, reject) => {
    http
      .post(url, params, config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
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
        params,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
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
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
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
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
