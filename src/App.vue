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
        this.setRequireds(requireds)
        this.setRisks(risks)
      })
      .then(() => { this.setInit(true) })
  },
  methods: {
    ...mapMutations({
      setRequireds: 'SET_REQUIREDS',
      setRisks: 'SET_RISKS',
      setInit: 'SET_INIT'
    })
  },
}
</script>
