import Main from '@/views/Main.vue'
import List from '@/views/reports/List.vue'

export default [
  {
    path: '/relatorios',
    component: Main,
    children: [
      {
        path: '',
        name: 'reports',
        component: List,
        meta: {
          title: 'M2 Print | Relatórios',
          header: {
            title: 'Relatórios',
            breadcrumbs: ['Relatórios']
          }
        }
      }
    ]
  }
]
