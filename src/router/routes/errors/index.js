import Error404 from '@/views/errors/Error404.vue'

export default [
  {
    path: '/*',
    name: 'error404',
    component: Error404,
    meta: {
      title: 'M2 Print | Página não encontrada'
    }
  }
]
