import axios from "axios";

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
http.interceptors.request.use((config) => {
  console.log(
    "%c [ config ]-17",
    "font-size:13px; background:pink; color:#bf2c9f;",
    config
  );
  return config;
});

/**
 * 响应拦截
 */
http.interceptors.response.use((config) => {
  return config.data;
});

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
