import Home from '@/views/Home.vue'

import renegociation from '@/router/routes/renegociation'
import simulation from '@/router/routes/simulation'
import accountsPayable from '@/router/routes/accounts-payable'
import accountsGroup from '@/router/routes/accounts-group'
import auth from '@/router/routes/auth'
import errors from '@/router/routes/errors'
import suppliers from '@/router/routes/suppliers'
import riskTypes from '@/router/routes/risk-types'
import reports from '@/router/routes/reports'

export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
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
  ...riskTypes,
  ...reports,

  // Must be the last item always
  ...errors
]
