<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de conta bancária</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md6 lg4>
              <v-select v-model="bank"
                :rules="[v => !!v || 'Selecione o banco']"
                :items="banks"
                item-value="id"
                item-text="name"
                label="Bancos"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="record.CtBc_idAgencia"
                :disabled="!bank"
                :loading="loadingAgencies"
                :rules="[v => !!v || 'Selecione a agência bancária']"
                :items="agencies"
                item-value="id"
                item-text="number"
                label="Agências"
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.CtBc_numContaBancaria"
                :rules="[v => !!v || 'Digite o número da conta corrente']"
                label="Conta corrente"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.CtBc_Saldo"
                :rules="[v => !!v || 'Digite o saldo']"
                label="Saldo"
                clearable
              />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-btn dark @click.prevent="$router.go(-1)">
              <span class="f-bold m-r-10">Cancelar</span>
              <i class="fa fa-times"></i>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="success" dark type="submit">
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
import { getAllAgency, getBankAccount, createBankAccount, updateBankAccount } from '@/services'
import { mapGetters, mapState } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'conta bancária',
      loading: false,
      loadingAgencies: false,
      record: {
        id: null,
        CtBc_idAgencia: null,
        CtBc_numContaBancaria: null,
        CtBc_Saldo: null
      },
      bank: null,
      agencies: []
    }
  },
  created () {
    if (this.$route.name.includes('edit') && this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
    }
    if (this.$route.name.includes('edit') && !this.currentId) {
      this.$router.push({ name: this.$route.name.replace('.edit', '')})
    }
  },
  computed: {
    ...mapGetters(['getFormReference']),
    ...mapState([ 'banks' ]),
    currentId () {
      return this.getFormReference('bankAccount')
    }
  },
  watch: {
    bank (val) {
      this.record.CtBc_idAgencia = null
      if (val) {
        this.loadingAgencies = true
        getAllAgency({ AgBc_idBanco: this.bank })
          .then(({ data }) => {
            this.agencies = data.map(d => {
              return {
                id: d.AgBc_idAgencia,
                number: d.AgBc_numAgencia
              }
            })
          })
          .then(() => { this.loadingAgencies = false })
      }
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      this.get(this.record.id)
        .then(({ data }) => {
          this.bank = data.agency_bank.AgBc_idBanco
          delete data.agency_bank;
          this.record = { ...data, id: data.CtBc_idContaBancaria }
        })
        .then(() => { this.loading = false })
    },
    create: payload => createBankAccount(payload),
    update: payload => updateBankAccount(payload),
    get: id => getBankAccount(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
