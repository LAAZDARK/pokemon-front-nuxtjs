import apiInstance from './index'
// import queryParams from './queryParams'

const baseURLRelative = '/auth'

export function getUsers() {
  return apiInstance({
    url: `${baseURLRelative}/users`,
    method: 'GET',
  })
}
export function getUser() {
  return apiInstance({
    url: `${baseURLRelative}/user`,
    method: 'GET',
  })
}
export function login(data) {
  return apiInstance({
    url: `${baseURLRelative}/login`,
    method: 'POST',
    data,
  })
}
export function register(data) {
  return apiInstance({
    url: `${baseURLRelative}/register`,
    method: 'POST',
    data,
  })
}
