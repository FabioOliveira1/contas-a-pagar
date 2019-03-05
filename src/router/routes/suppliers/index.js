import Main from '@/views/Main.vue'

export default [
  {
    path: '/fornecedores',
    name: 'suppliers',
    component: Main,
    meta: {
      title: 'M2 Print | Fornecedores',
      header: {
        title: 'Fornecedores',
        breadcrumbs: ['Fornecedores']
      }
    }
  }
]
