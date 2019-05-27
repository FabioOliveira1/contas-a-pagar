import Main from '@/views/Main.vue'
import List from '@/views/bank-accounts/List.vue'
import Form from '@/views/bank-accounts/Form.vue'

export default [
  {
    path: '/informacoes-bancarias',
    component: Main,
    children: [
      {
        path: '',
        name: 'bank-accounts',
        component: List,
        meta: {
          title: 'M2 Print | Informações bancárias',
          header: {
            title: 'Informações bancárias',
            breadcrumbs: ['Informações bancárias']
          }
        }
      },
      {
        path: 'criar-conta-bancaria',
        name: 'bank-accounts.create',
        component: Form,
        meta: {
          title: 'M2 Print | Informações bancárias',
          header: {
            title: 'Criar conta bancária',
            breadcrumbs: ['Informações bancárias', 'Criar conta bancária']
          }
        }
      },
      {
        path: 'editar-conta-bancaria',
        name: 'bank-accounts.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Informações bancárias',
          header: {
            title: 'Editar conta bancária',
            breadcrumbs: ['Informações bancárias', 'Editar conta bancária']
          }
        }
      }
    ]
  }
]
