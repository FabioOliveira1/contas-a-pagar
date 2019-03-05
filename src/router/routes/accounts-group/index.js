import Main from '@/views/Main.vue'

export default [
  {
    path: '/grupo-de-contas',
    name: 'accounts-group',
    component: Main,
    meta: {
      title: 'M2 Print | Grupo de contas',
      header: {
        title: 'Grupo de contas',
        breadcrumbs: ['Grupo de contas']
      }
    }
  }
]
