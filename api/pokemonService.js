import apiInstance from './index'

const baseURLRelative = '/pokemons'

export function getPokemons() {
  return apiInstance({
    url: `${baseURLRelative}`,
    method: 'GET',
  })
}
export function getPokemon() {
  return apiInstance({
    url: `${baseURLRelative}/${id}`,
    method: 'GET',
  })
}
export function storePokemon(data) {
  return apiInstance({
    url: `${baseURLRelative}`,
    method: 'POST',
    data,
  })
}
export function updatePokemon(data) {
  return apiInstance({
    url: `${baseURLRelative}/${data._id}`,
    method: 'PATCH',
    data,
  })
}
export function deletePokemon(id) {
  return apiInstance({
    url: `${baseURLRelative}/${id}`,
    method: 'DELETE',
  })
}
