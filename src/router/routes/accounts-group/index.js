import Main from '@/views/Main.vue'
import List from '@/views/accounts-group/List.vue'
import Form from '@/views/accounts-group/Form.vue'

export default [
  {
    path: '/grupo-de-contas',
    component: Main,
    children: [
      {
        path: '',
        name: 'accounts-group',
        component: List,
        meta: {
          title: 'M2 Print | Grupo de contas',
          header: {
            title: 'Grupo de contas',
            breadcrumbs: ['Grupo de contas']
          }
        }
      },
      {
        path: 'criar',
        name: 'accounts-group.create',
        component: Form,
        meta: {
          title: 'M2 Print | Grupo de contas',
          header: {
            title: 'Grupo de contas',
            breadcrumbs: ['Grupo de contas', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'accounts-group.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Grupo de contas',
          header: {
            title: 'Grupo de contas',
            breadcrumbs: ['Grupo de contas', 'Editar']
          }
        }
      }
    ]
  }
]
