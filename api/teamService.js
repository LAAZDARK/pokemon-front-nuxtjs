import apiInstance from './index'

const baseURLRelative = '/teams'

export function getTeams() {
  return apiInstance({
    url: `${baseURLRelative}`,
    method: 'GET',
  })
}
export function getTeam() {
  return apiInstance({
    url: `${baseURLRelative}/${id}`,
    method: 'GET',
  })
}
export function storeTeam(data) {
  return apiInstance({
    url: `${baseURLRelative}`,
    method: 'POST',
    data,
  })
}
export function updateTeam(data) {
  return apiInstance({
    url: `${baseURLRelative}/${data._id}`,
    method: 'PATCH',
    data,
  })
}
export function deleteTeam(id) {
  return apiInstance({
    url: `${baseURLRelative}/${id}`,
    method: 'DELETE',
  })
}
