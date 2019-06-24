import { authenticated } from '@/router/middlewares'

import Main from '@/views/Main.vue'
import List from '@/views/suppliers/List.vue'
import Form from '@/views/suppliers/Form.vue'

export default [
  {
    path: '/fornecedores',
    component: Main,
    beforeEnter: authenticated,
    children: [
      {
        path: '',
        name: 'suppliers',
        component: List,
        meta: {
          title: 'M2 Print | Fornecedores',
          header: {
            title: 'Fornecedores',
            breadcrumbs: ['Fornecedores']
          }
        }
      },
      {
        path: 'criar',
        name: 'suppliers.create',
        component: Form,
        meta: {
          title: 'M2 Print | Fornecedores',
          header: {
            title: 'Fornecedores',
            breadcrumbs: ['Fornecedores', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'suppliers.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Fornecedores',
          header: {
            title: 'Fornecedores',
            breadcrumbs: ['Fornecedores', 'Editar']
          }
        }
      }
    ]
  }
]
