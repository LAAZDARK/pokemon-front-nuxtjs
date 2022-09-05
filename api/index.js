/* eslint-disable */
import axios from 'axios'

/* definir url base */
const baseURL = 'http://localhost:4000/api/v1'

/* crear instancia axios */
const apiInstance = axios.create({
  baseURL: `${baseURL}/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/* usar interceptor tipo request */
apiInstance.interceptors.request.use(
  (config) => {
    /* obtener token desde localStorage */
    const accessToken = localStorage.getItem('access_token')

    /* si el token existe, agregar a la cabecera de las peticiones el 'Authorization Header' */
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    /* retornar nueva configuración */
    return config
  },
  (error) => Promise.reject(error)
)

/* usar interceptor tipo response */
apiInstance.interceptors.response.use(
  /* retornar response si todo marcha bien */
  (response) => response,
  async (error) => {
    /* asignar status */
    const status = error?.response?.status // status es igual a 401

    if (
      status === 401 &&
      error.response.data.message[0] === 'Unauthenticated.'
    ) {
      console.log('interseptor')
    } else {
      return Promise.reject(error)
    }
  }
)

export default apiInstance
