import Home from '@/views/Home.vue'

export default [
  {
    path: '/fornecedores',
    name: 'suppliers',
    component: Home,
    meta: {
      title: 'M2 Print | Fornecedores',
      header: {
        title: 'Fornecedores',
        breadcrumbs: ['Fornecedores']
      }
    }
  }
]
