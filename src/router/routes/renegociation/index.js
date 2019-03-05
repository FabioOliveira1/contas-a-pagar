import Main from '@/views/Main.vue'
import List from '@/views/renegociation/List.vue'
import Form from '@/views/renegociation/Form.vue'

export default [
  {
    path: '/renegociacao',
    component: Main,
    children: [
      {
        path: '',
        name: 'renegociation.index',
        component: List,
        meta: {
          title: 'M2 Print | Renegociação',
          header: {
            title: 'Renegociação',
            breadcrumbs: ['Renegociação']
          }
        }
      },
      {
        path: '/criar',
        name: 'renegociation.create',
        component: List,
        meta: {
          title: 'M2 Print | Renegociação',
          header: {
            title: 'Renegociação',
            breadcrumbs: ['Renegociação', 'Criar']
          }
        }
      },
      {
        path: '/editar',
        name: 'renegociation.edit',
        component: List,
        meta: {
          title: 'M2 Print | Renegociação',
          header: {
            title: 'Renegociação',
            breadcrumbs: ['Renegociação', 'Editar']
          }
        }
      }
    ]
  }
]
