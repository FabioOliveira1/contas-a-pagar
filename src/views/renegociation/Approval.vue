<template>
  <minimal-layout expanded>
    <section class="w-100 f-size-16 text-justify">
      <!-- List -->
        <v-layout wrap>
          <v-card-title><b>Olá, {{record.contact}},</b></v-card-title>
          <v-card-text class="p-t-0">Gostariamos de renegociar a conta a pagar sobre: "{{record.accountsPayable}}" com a sua companhia, {{ record.supplier }}.</v-card-text>
          <v-card-text class="p-t-0">{{ record.message }}</v-card-text>
          <v-card-text class="p-t-0">Atualmente, o valor e data de vencimento correspondem a <b>R$ {{ record.oldValue }}</b> e <b>{{ record.oldDueDateAt }}</b>.</v-card-text>
          <v-card-text class="p-t-0">Caso aceite, o valor e data de vencimento passarão a ser <b>R$ {{ record.newValue }}</b> e <b>{{ record.newDueDateAt }}</b>.</v-card-text>
          <v-btn dark color="error" :loading="loadingDeny" @click="deny">Recusar</v-btn>
          <v-spacer/>
          <v-btn dark color="success" :loading="loadingAccept" @click="accept">Aceitar</v-btn>
        </v-layout>

    </section>
  </minimal-layout>
</template>

<script>
import Notify from '@/utils/notify'
import { endRenegociation } from '@/services'

export default {
  data () {
    return {
      loading: false,
      loadingAccept: false,
      loadingDeny: false,
      record: {
        id: '4ad2fa42fa4af2af2443f4',
        supplier: 'Papeis Silva',
        contact: 'Fulano Souza',
        accountsPayable: 'Chapas de impressão personalizadas',
        createdAt: '2019-03-22 15:30:32',
        status: 'Pendente',
        oldValue: 1000,
        oldDueDateAt: '15/03/2019',
        newValue: 1200,
        newDueDateAt: '30/03/2019',
        message: 'Em função de mudanças recentes, precisaremos de mais tempo para conseguir os recursos necessários para liquidar nossa dívida.'
      }
    }
  },
  mounted () {
    this.loading = true
    let a = confirm(this.$route.params.token)
    if (!a) {
      this.$router.push({ name: 'error404' })
    }
    this.loading = false
  },
  methods: {
    accept () {
      this.loadingAccept = true
      this.endRenegociation('aprovada')
        .then(() => {
          Notify.success('Obrigado por aceitar nossa proposta.', 'Boa escolha!')
        })
        .then(() => { this.loadingAccept = false })
    },
    deny () {
      this.loadingDeny = true
      this.endRenegociation('recusada')
        .then(() => {
          Notify.info('Vamos elaborar uma proposta melhor.', 'Que pena!')
        })
        .then(() => { this.loadingDeny = false })
    },
    endRenegociation: (v) => endRenegociation({ status: v })
  }
}
</script>
