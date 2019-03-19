import Main from '@/views/Main.vue'
import List from '@/views/users/List.vue'
import Form from '@/views/users/Form.vue'

export default [
  {
    path: '/usuarios',
    component: Main,
    children: [
      {
        path: '',
        name: 'users',
        component: List,
        meta: {
          title: 'M2 Print | Usuários',
          header: {
            title: 'Usuários',
            breadcrumbs: ['Usuários']
          }
        }
      },
      {
        path: 'criar',
        name: 'users.create',
        component: Form,
        meta: {
          title: 'M2 Print | Usuários',
          header: {
            title: 'Usuários',
            breadcrumbs: ['Usuários', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'users.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Usuários',
          header: {
            title: 'Usuários',
            breadcrumbs: ['Usuários', 'Editar']
          }
        }
      }
    ]
  }
]
