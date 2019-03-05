import Main from '@/views/Main.vue'

export default [
  {
    path: '/simulacao',
    name: 'simulation',
    component: Main,
    meta: {
      title: 'M2 Print | Simulação',
      header: {
        title: 'Simulação',
        breadcrumbs: ['Simulação']
      }
    }
  }
]
