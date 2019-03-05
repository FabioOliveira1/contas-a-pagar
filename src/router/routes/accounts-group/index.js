import Home from '@/views/Home.vue'

export default [
  {
    path: '/grupo-de-contas',
    name: 'accounts-group',
    component: Home,
    meta: {
      title: 'M2 Print | Grupo de contas',
      header: {
        title: 'Grupo de contas',
        breadcrumbs: ['Grupo de contas']
      }
    }
  }
]
