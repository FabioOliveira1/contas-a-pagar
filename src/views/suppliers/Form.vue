<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de fornecedores</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md5>
              <v-text-field v-model="record.Forn_NomeFantasia"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Nome Fantasia"
                clearable
              />
            </v-flex>

            <v-flex sm12 md5>
              <v-text-field v-model="record.Forn_RazaoSocial"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Razão Social"
                clearable
              />
            </v-flex>

            <v-flex sm12 md2>
              <v-select v-model="record.Forn_idRisco"
                :rules="[v => !!v || 'O tipo de risco é obrigatório']"
                :items="risks"
                item-text="name"
                item-value="id"
                label="Tipo de risco"
              />
            </v-flex>

            <v-flex sm12 md5>
              <v-text-field v-model="record.Forn_CNPJ"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="CNPJ"
                clearable
              />
            </v-flex>

            <v-flex sm12 md5>
              <v-text-field v-model="record.Forn_InscrEstadual"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Inscrição Estadual"
                clearable
              />
            </v-flex>

            <v-flex sm12 md2>
              <v-text-field v-model="record.Forn_CEP"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="CEP"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-text-field v-model="record.Forn_Endereco"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Logradouro"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.Forn_Bairro"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Bairro"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.Forn_Cidade"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Cidade"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-select v-model="record.Forn_UF"
                :rules="[v => !!v || 'Campo Obrigatório']"
                :items="states"
                item-text="name"
                item-value="id"
                label="UF"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-select v-model="record.Forn_Banco"
                :rules="[v => !!v || 'Campo Obrigatório']"
                item-text="name"
                item-value="number"
                :items="banks"
                label="Banco"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-text-field v-model="record.Forn_Agencia"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Agência"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-text-field v-model="record.Forn_ContaBancaria"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Conta corrente"
                clearable
              />
            </v-flex>
            <v-flex sm12 md6>
              <v-select
                v-model="record.payment_ways"
                :items="paymentWays"
                :rules="[v => v && !!v.length || 'Campo obrigatório']"
                item-text="name"
                item-value="id"
                attach
                chips
                label="Forma de pagamento"
                multiple
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
import { getSupplier, createSupplier, updateSupplier } from '@/services'
import { mapGetters, mapState } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'fornecedor',
      loading: false,
      record: {
        id: null,
        Forn_NomeFantasia: null,
        Forn_RazaoSocial: null,
        Forn_idRisco: null,
        Forn_CNPJ: null,
        Forn_InscrEstadual: null,
        Forn_CEP: null,
        Forn_Endereco: null,
        Forn_Bairro: null,
        Forn_Cidade: null,
        Forn_UF: null,
        Forn_Banco: null,
        Forn_Agencia: null,
        Forn_ContaBancaria: null,
        payment_ways: [],
      }
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
    ...mapState([ 'risks', 'banks', 'paymentWays', 'states' ]),
    ...mapGetters(['getFormReference']),
    currentId () {
      return this.getFormReference('supplier')
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      this.get(this.record.id)
        .then(({ data }) => {
          data.payment_ways = data.payment_ways.map(p => p.FrPg_idFormaPgto)
          this.record = { ...data, id: data.Forn_idFornecedor }
        })
        .then(() => { this.loading = false })
    },
    create: payload => createSupplier(payload),
    update: payload => updateSupplier(payload),
    get: id => getSupplier(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
