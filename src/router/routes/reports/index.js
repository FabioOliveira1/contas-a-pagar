import Main from '@/views/Main.vue'

export default [
  {
    path: '/relatorios',
    name: 'reports',
    component: Main,
    meta: {
      title: 'M2 Print | Relatórios',
      header: {
        title: 'Relatórios',
        breadcrumbs: ['Relatórios']
      }
    }
  }
]
