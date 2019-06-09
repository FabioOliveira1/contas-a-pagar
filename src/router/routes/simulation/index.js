import Main from '@/views/Main.vue'
import List from '@/views/simulation/List.vue'
import Form from '@/views/simulation/Form.vue'
import Preview from '@/views/simulation/Preview.vue'

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
        path: 'visualizar',
        name: 'simulation.preview',
        component: Preview,
        meta: {
          title: 'M2 Print | Simulação',
          header: {
            title: 'Simulação',
            breadcrumbs: ['Simulação', 'Visualizar']
          }
        }
      }
    ]
  }
]
