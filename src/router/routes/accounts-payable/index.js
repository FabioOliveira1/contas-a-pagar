import { authenticated } from '@/router/middlewares'

import Main from '@/views/Main.vue'
import List from '@/views/accounts-payable/List.vue'
import Form from '@/views/accounts-payable/Form.vue'

export default [
  {
    path: '/contas-a-pagar',
    component: Main,
    beforeEnter: authenticated,
    children: [
      {
        path: '',
        name: 'accounts-payable',
        component: List,
        meta: {
          title: 'M2 Print | Contas a pagar',
          header: {
            title: 'Contas a pagar',
            breadcrumbs: ['Contas a pagar']
          }
        }
      },
      {
        path: 'criar',
        name: 'accounts-payable.create',
        component: Form,
        meta: {
          title: 'M2 Print | Contas a pagar',
          header: {
            title: 'Contas a pagar',
            breadcrumbs: ['Contas a pagar', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'accounts-payable.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Contas a pagar',
          header: {
            title: 'Contas a pagar',
            breadcrumbs: ['Contas a pagar', 'Editar']
          }
        }
      }
    ]
  }
]
