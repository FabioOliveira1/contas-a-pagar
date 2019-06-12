<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de renegociação</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md6 lg4>
              <v-select v-model="supplier"
                :rules="[v => !!v || 'Selecione um fornecedor']"
                :items="suppliers"
                item-value="id"
                item-text="name"
                label="Fornecedores"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="record.Rng_idContato"
                :rules="[v => !!v || 'Selecione um contato']"
                :items="contacts"
                item-value="id"
                item-text="name"
                label="Contato"
                :disabled="!supplier"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="record.Rng_idConta"
                :rules="[v => !!v || 'Selecione a conta para renegociar']"
                :items="accountsPayable"
                item-value="id"
                item-text="name"
                label="Contas"
                :disabled="!supplier"
              />
            </v-flex>

            <v-flex sm12 md6 lg2>
              <v-select v-model="record.Rng_Iniciativa"
                :items="['Interna', 'Externa']"
                label="Iniciativa"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-text-field v-model="accountPayable.value"
                label="Valor original"
                disabled
              />
            </v-flex>

            <v-flex sm12 md6 lg3>
              <v-text-field v-model="accountPayable.fee"
                label="Multa"
                disabled
              />
            </v-flex>

            <v-flex sm12 md6 lg3>
              <v-text-field v-model="accountPayable.interest"
                label="Juros"
                disabled
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <v-text-field v-model="accountPayable.emitedAt"
                label="Data de emissão"
                disabled
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <v-text-field v-model="accountPayable.dueDateAt"
                label="Data de vencimento"
                disabled
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <m2-date-picker v-model="record.Rng_vencProposta"
                label="Data de vencimento proposta"
                :rules="[v => !!v || 'Proponha uma data de vencimento']"
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <v-text-field v-model="record.Rng_valProposta"
                type="number"
                :rules="[v => !!v || 'Proponha um novo valor a ser pago']"
                label="Valor proposto"
                clearable
              />
            </v-flex>

            <v-flex sm12>
              <v-textarea v-model="record.Rng_descrProposta"
                :rules="[v => !!v || 'A renegociação precisa ter mensagem']"
                label="Descrição"
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
import { createRenegociation, getAllAccountsPayable, getAllSupplier, getAllContact } from '@/services'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'renegociação',
      loading: false,
      record: {
        id: null,
        Rng_idContato: null,
        Rng_idConta: null,
        Rng_Iniciativa: null,
        Rng_vencProposta: null,
        Rng_valProposta: null,
        Rng_descrProposta: null,
        Rng_valAntigo: null,
        Rng_vencAntigo: null
      },
      supplier: null,
      suppliers: [],
      contacts: [],
      accountsPayable: []
    }
  },
  created () {
    this.getOptions()
  },
  computed: {
    accountPayable () {
      if (!this.record.Rng_idConta || !this.accountsPayable.length) {
        return []
      }

      return this.accountsPayable.find(ac => ac.id === this.record.Rng_idConta)
    }
  },
  watch: {
    supplier (val) {
      this.getDependantOptions(val)
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
    },
    getDependantOptions (id) {
      getAllAccountsPayable({ Cta_idFornecedor: id, Cta_Status: 'A' })
        .then(({ data }) => {
          this.accountsPayable = data.map(r => ({
            id: r.Cta_idConta,
            name: r.Cta_descrConta,
            value: r.Cta_valConta,
            fee: r.Cta_Multa,
            interest: r.Cta_Juros,
            emitedAt: r.Cta_dataEmissao,
            dueDateAt: r.Cta_dataVencimento,
          }))
        })
      getAllContact({ Cnt_idFornecedor: id })
        .then(({ data }) => {
          this.contacts = data.map(r => ({
            id: r.Cnt_idContato,
            name: r.Cnt_nomeContato,
          }))
        })
    },
    create: payload => createRenegociation(payload),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.record['Rng_valAntigo'] = this.accountPayable.value
        this.record['Rng_vencAntigo'] = this.accountPayable.dueDateAt
        this.save()
      }
    }
  }
}
</script>
