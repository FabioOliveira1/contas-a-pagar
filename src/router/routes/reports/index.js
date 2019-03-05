import Home from '@/views/Home.vue'

export default [
  {
    path: '/relatorios',
    name: 'reports',
    component: Home,
    meta: {
      title: 'M2 Print | Relatórios',
      header: {
        title: 'Relatórios',
        breadcrumbs: ['Relatórios']
      }
    }
  }
]
