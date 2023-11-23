import Cookies from 'js-cookie'

const TokenKey = 'vue3-admin-template-token'
const UserInfoKey = 'userInfo'

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

export function getUserInfo () {
  const userInfo = sessionStorage.getItem(UserInfoKey)

  if (userInfo) {
    return JSON.parse(userInfo)
  }

  return null
}

export function setUserInfo (userInfo) {
  sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}

export function removeStorage () {
  sessionStorage.removeItem(UserInfoKey)
}

export function logOut () {
  removeToken()
  removeStorage()
}
