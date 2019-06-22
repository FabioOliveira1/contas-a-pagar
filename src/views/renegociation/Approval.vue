<template>
  <minimal-layout expanded>
    <section class="w-100 f-size-16 text-justify" v-if="!loading">
      <!-- List -->
        <v-layout wrap>
          <v-card-title><b>Olá, {{record.contact.Cnt_nomeContato}},</b></v-card-title>
          <v-card-text class="p-t-0">Gostariamos de renegociar a conta a pagar sobre: "{{record.bill.Cta_descrConta}}" com a sua companhia, {{ record.contact.supplier.Forn_NomeFantasia }}.</v-card-text>
          <v-card-text class="p-t-0">{{ record.Rng_descrProposta }}</v-card-text>
          <v-card-text class="p-t-0">Atualmente, o valor e data de vencimento correspondem a <b>R$ {{ record.Rng_valAntigo }}</b> e <b>{{ record.Rng_vencAntigo | dateFormat }}</b>.</v-card-text>
          <v-card-text class="p-t-0">Caso aceite, o valor e data de vencimento passarão a ser <b>R$ {{ record.Rng_valProposta }}</b> e <b>{{ record.Rng_vencProposta | dateFormat }}</b>.</v-card-text>
          
          <v-card-text>
            Se necessário, salve os novos documentos:
            <m2-multi-file-input class="m-t-5" v-model="files" label="Anexos" />
          </v-card-text>
          <v-btn dark color="error" :loading="loadingDeny" @click="deny">Recusar</v-btn>
          <v-spacer/>
          <v-btn dark color="success" :loading="loadingAccept" @click="accept">Aceitar</v-btn>
        </v-layout>

    </section>
  </minimal-layout>
</template>

<script>
import Notify from '@/utils/notify'
import { getRenegociation, endRenegociation, addAttachment } from '@/services'

export default {
  data () {
    return {
      loading: true,
      loadingAccept: false,
      loadingDeny: false,
      record: { contact: { supplier: {} }, bill: {} },
      files: []
    }
  },
  mounted () {
    this.loading = true
    getRenegociation(this.$route.params.token)
      .then(({ data }) => {
        this.record = { ...data }
      })
      // .catch
    this.loading = false
  },
  methods: {
    accept () {
      this.loadingAccept = true
      endRenegociation({ id: this.record.Rng_idProposta, Rng_Status: 'Aprovada' })
        .then(() => {
          if (this.files.length) {
            this.uploadFiles()
          } else {
            Notify.success('Obrigado por aceitar nossa proposta.', 'Boa escolha!')
            this.$router.push({ name: 'home' })
          }
        })
        .catch(() => { Notify.error('Algo deu errado, tente mais tarde.') })
        .then(() => { this.loadingAccept = false })
    },
    deny () {
      this.loadingDeny = true
      endRenegociation({ id: this.record.Rng_idProposta, Rng_Status: 'Recusada' })
        .then(() => {
          Notify.info('Vamos elaborar uma proposta melhor.', 'Que pena!')
          this.$router.push({ name: 'home' })
        })
        .catch(() => { Notify.error('Algo deu errado, tente mais tarde.') })
        .then(() => { this.loadingDeny = false })
    },
    uploadFiles () {
      let id = this.record.Rng_idConta
      let files = this.files.map(f => {
        delete f.url
        return f
      })

      let form = new FormData()
      form.append('id', id)
      form.append('filesLength', files.length)
      for (let f in files) {
        form.append(`files.${f}.name`, files[f].name)
        form.append(`files.${f}.file`, files[f].file)
      }

      addAttachment(id, form)
        .then(response => {
          Notify.success('Obrigado por aceitar nossa proposta.', 'Boa escolha!')
          this.$router.push({ name: 'home' })
        })
        .catch(() => {
          Notify.error('Não conseguimos salvar os anexos, nos envie por email')
          this.$router.push({ name: 'home' })
        })
        .then(() => { this.loadingAccept = false })
    }
  }
}
</script>
