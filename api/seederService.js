import apiInstance from './index'

const baseURLRelative = '/seed'

export function seedExecute() {
  return apiInstance({
    url: `${baseURLRelative}`,
    method: 'GET',
  })
}
