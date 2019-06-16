// auth_token
export function hasAuthToken () {
  // return !!localStorage.getItem('authToken_huayao')
  return !!sessionStorage.getItem('authToken_huayao')
}
export function setAuthToken (authToken) {
  // localStorage.setItem('authToken_huayao', JSON.stringify(authToken))
  sessionStorage.setItem('authToken_huayao', JSON.stringify(authToken))
}

export function getAuthToken () {
  // return JSON.parse(localStorage.getItem('authToken_huayao'))
  return JSON.parse(sessionStorage.getItem('authToken_huayao'))
}
// 用户是否登录
export function setUsername (username) {
  return localStorage.setItem('username', JSON.stringify(username))
}
export function getUsername (username) {
  return JSON.parse(localStorage.getItem('username'))
}
export function clearUsername () {
  localStorage.removeItem('username')
}
