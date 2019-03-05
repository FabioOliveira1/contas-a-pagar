import Home from '@/views/Home.vue'

export default [
  {
    path: '/simulacao',
    name: 'simulation',
    component: Home,
    meta: {
      title: 'M2 Print | Simulação',
      header: {
        title: 'Simulação',
        breadcrumbs: ['Simulação']
      }
    }
  }
]
