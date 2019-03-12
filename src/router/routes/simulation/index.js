import Main from '@/views/Main.vue'
import List from '@/views/simulation/List.vue'
import Form from '@/views/simulation/Form.vue'

export default [
  {
    path: '/simulacao',
    component: Main,
    children: [
      {
        path: '',
        name: 'simulation',
        component: List,
        meta: {
          title: 'M2 Print | Simulação',
          header: {
            title: 'Simulação',
            breadcrumbs: ['Simulação']
          }
        }
      },
      {
        path: 'criar',
        name: 'simulation.create',
        component: Form,
        meta: {
          title: 'M2 Print | Simulação',
          header: {
            title: 'Simulação',
            breadcrumbs: ['Simulação', 'Criar']
          }
        }
      },
      {
        path: 'editar',
        name: 'simulation.edit',
        component: Form,
        meta: {
          title: 'M2 Print | Simulação',
          header: {
            title: 'Simulação',
            breadcrumbs: ['Simulação', 'Editar']
          }
        }
      }
    ]
  }
]
