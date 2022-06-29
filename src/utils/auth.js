import Cookies from "js-cookie";

const TokenKey = "vue3-admin-template-token";
const storageKey = "userInfo";

// token
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

// sessionStorage
export function getStorage() {
  return JSON.parse(sessionStorage.getItem(storageKey));
}

export function setStorage(userInfo) {
  sessionStorage.setItem(storageKey, JSON.stringify(userInfo));
}

export function removeStorage() {
  sessionStorage.removeItem(storageKey);
}

export function logOut() {
  removeToken();
  removeStorage();
}
