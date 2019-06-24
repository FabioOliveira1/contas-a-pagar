<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de conta a pagar</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="submit" ref="form">
          <v-layout wrap>

            <v-flex sm12 md6>
              <v-text-field v-model="record.Cta_descrConta"
                :rules="[v => !!v || 'Campo obrigatório']"
                label="Descrição"
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-select v-model="record.Cta_idGrupo" @change="$refs.form.resetValidation()"
                :rules="[v => !!v || 'Selecione um grupo ']"
                :items="accountsGroups"
                item-value="id"
                item-text="name"
                label="Grupo de contas"
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-select v-model="record.Cta_idFornecedor"
                :rules="[v => !!v || 'Selecione um fornecedor']"
                :items="suppliers"
                item-value="id"
                item-text="name"
                label="Fornecedores"
              />
            </v-flex>

            <v-flex sm6 md3>
              <v-text-field v-model="record.Cta_Multa"
                suffix="%"
                label="Multa"
                :disabled="!requireds.find(r => r === 'Cta_Multa')"
                :rules="[v => !requireds.find(r => r === 'Cta_Multa') || !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex sm6 md3>
              <v-text-field v-model="record.Cta_Juros"
                suffix="%"
                label="Juros"
                :disabled="!requireds.find(r => r === 'Cta_Juros')"
                :rules="[v => !requireds.find(r => r === 'Cta_Juros') || !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-text-field v-model="record.Cta_valConta"
                :rules="[v => !!v || 'Campo obrigatório']"
                label="Valor original"
                prefix="R$"
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.Cta_tempoProtesto"
                label="Tempo de protesto"
                :disabled="!requireds.find(r => r === 'Cta_tempoProtesto')"
                :rules="[v => !requireds.find(r => r === 'Cta_tempoProtesto') || !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.Cta_valProtesto"
                prefix="R$"
                label="Valor do protesto"
                :disabled="!requireds.find(r => r === 'Cta_valProtesto')"
                :rules="[v => !requireds.find(r => r === 'Cta_valProtesto') || !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <m2-date-picker v-model="record.Cta_dataEmissao"
                label="Data de emissão"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <m2-date-picker v-model="record.Cta_dataVencimento"
                label="Data de vencimento"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm8>
              <v-text-field v-model="record.Cta_codBarra"
                type="number"
                label="Código de barras"
                :disabled="!requireds.find(r => r === 'Cta_codBarra')"
                :rules="[v => !requireds.find(r => r === 'Cta_codBarra') || !!v || 'Campo obrigatório']"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm4>
              <v-text-field v-model="record.Cta_numConta"
                type="number"
                label="Nosso número"
                :disabled="!requireds.find(r => r === 'Cta_numConta')"
                :rules="[v => !requireds.find(r => r === 'Cta_numConta') || !!v || 'Campo obrigatório']"
                clearable
              />
            </v-flex>

            <v-flex sm12 class="m-t-5">
              <m2-multi-file-input v-model="record.files" label="Anexos" />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-btn dark @click.prevent="$router.go(-1)">
              <span class="f-bold m-r-10">Cancelar</span>
              <i class="fa fa-times"></i>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn :loading="loadingSave" color="success" dark type="submit">
              <span class="f-bold m-r-10">Salvar</span>
              <i class="fa fa-check"></i>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>

    </v-card>
  </section>
</template>

<script>
import { getAccountsPayable, createAccountsPayable, updateAccountsPayable, getAllSupplier, getAllAccountsGroup, manageAttachment } from '@/services'
import { mapState, mapGetters } from 'vuex'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      loadingSave: false,
      record: {
        id: null,
        Cta_idConta: null,
        Cta_descrConta: null,
        Cta_numConta: null,
        Cta_idFornecedor: null,
        Cta_idGrupo: null,
        Cta_codBarra: null,
        Cta_Juros: null,
        Cta_Multa: null,
        Cta_dataEmissao: null,
        Cta_dataVencimento: null,
        Cta_tempoProtesto: null,
        Cta_valConta: null,
        Cta_valProtesto: null,
        Cta_Status: null
      },
      suppliers: [],
      accountsGroups: []
    }
  },
  created () {
    this.getOptions()
    if (this.$route.name.includes('edit') && this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
    }
    if (this.$route.name.includes('edit') && !this.currentId) {
      this.$router.push({ name: this.$route.name.replace('.edit', '')})
    }
  },
  computed: {
    ...mapState([ 'risks', 'requireds' ]),
    ...mapGetters(['getFormReference']),
    currentId () {
      return this.getFormReference('accountsPayable')
    },
    requireds () {
      if (!this.record.Cta_idGrupo || !this.accountsGroups.length) {
        return []
      }

      return this.accountsGroups.find(g => g.id === this.record.Cta_idGrupo).requireds
    }
  },
  methods: {
    getOptions () {
      getAllSupplier()
        .then(({ data }) => {
          this.suppliers = data.map(s => ({
            id: s.Forn_idFornecedor,
            name: s.Forn_NomeFantasia
          }))
        })
      getAllAccountsGroup()
        .then(({ data }) => {
          this.accountsGroups = data.map(r => ({
            id: r.GrCt_idGrupo,
            name: r.GrCt_NomeGrupo,
            requireds: r.requireds.map(i => i.Rq_DescrRequeridos)
          }))
        })
    },
    fetchRecord () {
      this.loading = true
      getAccountsPayable(this.currentId)
        .then(({ data }) => {
          this.record = { ...data, id: data.Cta_idConta }
          if (data.attachments) {
            this.record.files = data.attachments.map(a => {
              return {
                id: a.Anx_idAnexo,
                url: a.Anx_endereco,
                name: `${a.Anx_nome}.${a.Anx_formato}`,
              }
            })
          }_
          delete this.record.attachments
        })
        .then(() => { this.loading = false })
      
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.record['requireds'] = this.requireds
        if (!this.currentId) {
          this.create()
          return true
        }

        this.update()
        return true
      }
    },
    create () {
      let payload = { ...this.record }
      this.loadingSave = true
      createAccountsPayable(payload)
        .then(({ data }) => {
          this.uploadFiles(data.Cta_idConta)
        })
        .catch((e) => { console.log(e)
        Notify.error('Não conseguimos criar a conta a pagar.') })
    },
    update () {
      let payload = { ...this.record }
      this.loadingSave = true
      updateAccountsPayable(payload)
        .then(() => {
          this.uploadFiles()
        })
        .catch(() => { Notify.error('Não conseguimos atualizar a conta a pagar') })
    },
    uploadFiles (id = null) {
      if (id && (!this.record.files || !this.record.files.length)) {
        Notify.success('Conta a pagar salva!')
        this.loadingSave = false
        this.$router.go(-1)
        return true
      }

      if (!id) {
        id = this.currentId
      }

      let keep = this.record.files.filter(f => !!f.id)
      let files = this.record.files.map(f => {
        if (f.url && f.url.length > 200) {
          delete f.url
        }
        return f
      }).filter(f => !!f.file)

      let form = new FormData()
      form.append('id', id)
      form.append('keepLength', keep.length)
      form.append('filesLength', files.length)
      for (let k in keep) {
        form.append(`keep.${k}`, keep[k].id)
      }
      for (let f in files) {
        form.append(`files.${f}.name`, files[f].name)
        form.append(`files.${f}.file`, files[f].file)
      }

      manageAttachment(id, form)
        .then(response => {
          Notify.success('Conta a pagar salva!')
          this.$router.go(-1)
        })
        .catch(() => {
          Notify.error('A conta a pagar foi salva, mas não foi possível salvar os anexos.')
          this.$router.go(-1)
        })
        .then(() => { this.loadingSave = false })
    }
  }
}
</script>
