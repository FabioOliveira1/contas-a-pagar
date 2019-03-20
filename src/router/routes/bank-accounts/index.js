import Main from '@/views/Main.vue'
import List from '@/views/bank-accounts/List.vue'
import Form from '@/views/bank-accounts/Form.vue'

export default [
  {
    path: '/conta-bancaria',
    component: Main,
    children: [
      {
        path: '',
        name: 'bank-accounts',
        component: List,
        meta: {
          title: 'M2 Print | Contas bancárias',
          header: {
            title: 'Contas bancárias',
            breadcrumbs: ['Contas bancárias']
          }
        }
      },
      {
        path: 'criar',
        name: 'bank-accounts.create',
        component: Form,
        meta: {
          title: 'M2 Print | Contas bancárias',
          header: {
            title: 'Contas bancárias',
            breadcrumbs: ['Contas bancárias', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'bank-accounts.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Contas bancárias',
          header: {
            title: 'Contas bancárias',
            breadcrumbs: ['Contas bancárias', 'Editar']
          }
        }
      }
    ]
  }
]
