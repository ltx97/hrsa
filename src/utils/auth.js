import Cookies from 'js-cookie'

const TokenTime = 'token-time'
const UserInfo = 'user-info'

export function getUserInfo() {
  return JSON.parse(Cookies.get(UserInfo))
}

export function setUserInfo(data) {
  Cookies.set(TokenTime, Date.now())
  return Cookies.set(UserInfo, JSON.stringify(data))
}

export function getTokenTime() {
  return Cookies.get(TokenTime)
}

export function removeUserInfo() {
  console.log('999')
  Cookies.remove(TokenTime)
  return Cookies.remove(UserInfo)
}
