import Cookies from 'js-cookie'

const TokenKey = 'vue3-admin-template-token'
const storageKey = 'userInfo'

// token
export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// sessionStorage
export function getStorage () {
  const token = sessionStorage.getItem(storageKey)

  if (!token && token !== 'undefined') {
    return JSON.parse(token)
  }

  return null
}

export function setStorage (userInfo) {
  sessionStorage.setItem(storageKey, JSON.stringify(userInfo))
}

export function removeStorage () {
  sessionStorage.removeItem(storageKey)
}

export function logOut () {
  removeToken()
  removeStorage()
}
