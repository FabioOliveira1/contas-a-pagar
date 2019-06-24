<template>
  <minimal-layout>
    <v-form @submit.prevent="doLogin" ref="login">
      <v-text-field
        type="text"
        placeholder="E-mail"
        :rules="[v => !!v || 'Campo de e-mail é obrigatório']"
        v-model="record.email"
        required
      />
      <v-text-field
        type="password"
        placeholder="Senha"
        :rules="[v => !!v || 'Campo de senha é obrigatório']"
        v-model="record.password"
        required
      />

      <v-btn :loading="loading" class="m-t-10" type="submit" color="primary">Login</v-btn>
    </v-form>
  </minimal-layout>
</template>

<script>
import { login, initStore } from '@/services'
import Notify from '@/utils/notify'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      record: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    ...mapMutations({
      setAuth: 'SET_AUTH',
      setRequireds: 'SET_REQUIREDS',
      setRisks: 'SET_RISKS',
      setBanks: 'SET_BANKS',
      setPaymentWays: 'SET_PAYMENT_WAYS',
    }),
    doLogin () {
      if (this.$refs.login.validate()) {
        this.loading = true
        login(this.record)
          .then(({ data }) => {
            this.setAuth(data)
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

                this.$router.push({ name: 'home' })
              })
          })
          .catch(e => {
            console.log(e)
            Notify.error(e.response.data)
          })
          .catch((e) => Notify.error('Algo deu errado, tente novamente mais tarde'))
          .then(() => { this.loading = false })
      }
    }
  }
}
</script>
