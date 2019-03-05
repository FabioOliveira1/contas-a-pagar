export const get = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('get'), 1000)
  })
}
export const create = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('create'), 1000)
  })
}
export const update = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('update'), 1000)
  })
}
