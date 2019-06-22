<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<style lang="sass">
  @import './scss/app'
</style>

<script>
import { initStore } from '@/services'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      init: false
    }
  },
  created () {
    this.setInit(false)
    initStore()
      .then(({ data }) => {
        const risks = data.risks.map(r => ({id: r.Rsc_idRisco, name: r.Rsc_descrRisco}))
        const requireds = data.requireds.map(r => ({id: r.Rq_idRequeridos, name: r.Rq_DescrRequeridos}))
        const banks = data.banks.map(b => ({id: b.Bc_idBanco, num: b.Bc_numBanco, name: b.Bc_nomeBanco}))
        const paymentWays = data.paymentWays.map(p => ({id: p.FrPg_idFormaPgto, name: p.FrPg_descrFormaPgto}))
        this.setRequireds(requireds)
        this.setRisks(risks)
        this.setBanks(banks)
        this.setPaymentWays(paymentWays)
      })
      .then(() => { this.setInit(true) })
  },
  methods: {
    ...mapMutations({
      setRequireds: 'SET_REQUIREDS',
      setRisks: 'SET_RISKS',
      setBanks: 'SET_BANKS',
      setPaymentWays: 'SET_PAYMENT_WAYS',
      setInit: 'SET_INIT'
    })
  },
}
</script>
