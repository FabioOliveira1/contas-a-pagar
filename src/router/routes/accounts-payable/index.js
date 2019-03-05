import Main from '@/views/Main.vue'

export default [
  {
    path: '/contas-a-pagar',
    name: 'accounts-payable',
    component: Main,
    meta: {
      title: 'M2 Print | Contas a pagar',
      header: {
        title: 'Contas a pagar',
        breadcrumbs: ['Contas a pagar']
      }
    }
  }
]
