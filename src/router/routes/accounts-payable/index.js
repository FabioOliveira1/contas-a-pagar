import Home from '@/views/Home.vue'

export default [
  {
    path: '/contas-a-pagar',
    name: 'accounts-payable',
    component: Home,
    meta: {
      title: 'M2 Print | Contas a pagar',
      header: {
        title: 'Contas a pagar',
        breadcrumbs: ['Contas a pagar']
      }
    }
  }
]
