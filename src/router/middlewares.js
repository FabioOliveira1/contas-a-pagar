import store from '@/store'

export const authenticated = (to, from, next) => {
  if (store.getters.getToken) {
    return next()
  }

  return next({ name: 'login' })
}