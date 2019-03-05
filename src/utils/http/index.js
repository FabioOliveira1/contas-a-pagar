// import axios from 'axios'
// import store from '@/store'
// import router from '@/router'

// const client = axios.create({
//   baseURL: process.env.VUE_APP_URL_API,
//   timeout: 30000,
//   headers: {
//     'content-type': 'application/json'
//   }
// })

// client.interceptors.request.use((config) => {
//   let token = store.getters.getToken

//   if (token) {
//     config.headers.common['Authorization'] = `JWT ${token}`
//   }

//   return config
// })

// client.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.status === 401 && store.getters.expiredToken) {
//       store.dispatch('logout')
//       router.redirect({ name: 'login' })
//     }
//     if (error.status === 401) {
//       router.redirect({ name: 'login' })
//     }
//     if (error.status === 403) {
//       router.redirect({ name: 'error-403' })
//     }
//     if (error.status === 404) {
//       router.redirect({ name: 'error-404' })
//     }
//     if (error.status === 500) {
//       router.redirect({ name: 'error-500' })
//     }

//     return Promise.reject(error)
//   }
// )

// export default client
