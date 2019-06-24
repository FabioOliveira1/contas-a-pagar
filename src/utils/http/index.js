import axios from 'axios'
import store from '@/store'
import router from '@/router'

const client = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'content-type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

client.interceptors.request.use(config => {
  let token = store.getters.getToken

  if (token) {
    config.headers.common['Authorization'] = `${token}`
  }

  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      router.redirect({ name: 'login' })
    }
    if (error.status === 404) {
      router.redirect({ name: 'error-404' })
    }

    return Promise.reject(error)
  }
)

export default client
