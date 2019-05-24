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
              <v-text-field v-model="record.name"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Nome Fantasia"
                clearable
              />
            </v-flex>

            <v-flex sm12 md5>
              <v-text-field v-model="record.rsocial"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Razão Social"
                clearable
              />
            </v-flex>

            <v-flex sm12 md2>
              <v-select v-model="record.riskType"
                :rules="[v => !!v || 'O tipo de risco é obrigatório']"
                :items="options.risks"
                item-text="name"
                item-value="id"
                label="Tipo de risco"
              />
            </v-flex>

            <v-flex sm12 md5>
              <v-text-field v-model="record.cnpj"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="CNPJ"
                clearable
              />
            </v-flex>

            <v-flex sm12 md5>
              <v-text-field v-model="record.inscEstadual"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Inscrição Estadual"
                clearable
              />
            </v-flex>

            <v-flex sm12 md2>
              <v-text-field v-model="record.cep"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="CEP"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-text-field v-model="record.address"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Logradouro"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.neighborhood"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Bairro"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.city"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Cidade"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-select v-model="record.state"
                :rules="[v => !!v || 'Campo Obrigatório']"
                :items="['SP', 'TO']"
                label="UF"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-select v-model="record.bank"
                :rules="[v => !!v || 'Campo Obrigatório']"
                :items="['Itau SA', 'Banco do Brasil SA']"
                label="Banco"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-text-field v-model="record.agency"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Agência"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-text-field v-model="record.bankAccount"
                :rules="[v => !!v || 'Campo obirgatório']"
                label="Conta corrente"
                clearable
              />
            </v-flex>
            <v-flex sm12 md6>
              <v-select
                v-model="record.payment"
                :items="[{ id: 1, name: 'Depósito' },{ id: 2, name: 'Boleto' }]"
                :rules="[v => v && v.length || 'Campo obrigatório']"
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
import { get, create, update } from '@/services'
import { mapGetters } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'renegociação',
      loading: false,
      record: {
        id: null,
        supplierId: null,
        contactId: null,
        accountId: null,
        newValue: null,
        newDate: null,
        subject: null,
        message: null,
        status: null
      },
      accountCombo: {
        id: null,
        name: null,
        value: null,
        fee: null,
        interest: null,
        emitedAt: null,
        dueDateAt: null
      },
      supplierCombo: {
        id: null,
        name: null
      },
      contactCombo: {
        id: null,
        name: null
      },
      options: {
        suppliers: [],
        contacts: [],
        accounts: []
      }
    }
  },
  created () {
    if (this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
    }
  },
  computed: {
    ...mapGetters({
      currentId: 'getRenegociationForm'
    })
  },
  methods: {
    create: payload => create(payload),
    update: payload => update(payload),
    get: id => get(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
