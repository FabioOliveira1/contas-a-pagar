import Main from '@/views/Main.vue'
import List from '@/views/risk-types/List.vue'
import Form from '@/views/risk-types/Form.vue'

export default [
  {
    path: '/tipos-de-risco',
    component: Main,
    children: [
      {
        path: '',
        name: 'risk-types',
        component: List,
        meta: {
          title: 'M2 Print | Tipos de risco',
          header: {
            title: 'Tipos de risco',
            breadcrumbs: ['Tipos de risco']
          }
        }
      },
      {
        path: 'criar',
        name: 'risk-types.create',
        component: Form,
        meta: {
          title: 'M2 Print | Tipos de risco',
          header: {
            title: 'Tipos de risco',
            breadcrumbs: ['Tipos de risco', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'risk-types.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Tipos de risco',
          header: {
            title: 'Tipos de risco',
            breadcrumbs: ['Tipos de risco', 'Editar']
          }
        }
      }
    ]
  }
]
