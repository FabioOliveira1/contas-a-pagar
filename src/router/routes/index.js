import Main from '@/views/Main.vue'

import renegociation from '@/router/routes/renegociation'
import simulation from '@/router/routes/simulation'
import accountsPayable from '@/router/routes/accounts-payable'
import accountsGroup from '@/router/routes/accounts-group'
import auth from '@/router/routes/auth'
import errors from '@/router/routes/errors'
import suppliers from '@/router/routes/suppliers'
// import riskTypes from '@/router/routes/risk-types'
import reports from '@/router/routes/reports'
import users from '@/router/routes/users'
import bankAccounts from '@/router/routes/bank-accounts'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Main,
    meta: {
      title: 'M2 Print | Dashboard',
      header: {
        title: 'Dashboard',
        breadcrumbs: ['Dashboard']
      }
    }
  },
  ...auth,
  ...renegociation,
  ...simulation,
  ...accountsPayable,
  ...accountsGroup,
  ...suppliers,
  // ...riskTypes,
  ...reports,
  ...users,
  ...bankAccounts,

  // Must be the last item always
  ...errors
]
