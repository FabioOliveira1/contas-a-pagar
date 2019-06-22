<template>
  <section>
    <!-- Filter -->
    <v-card>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.Bc_numBanco"
                :items="options.banks"
                item-value="id"
                item-text="name"
                label="Bancos"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.CtBc_idAgencia"
                :items="options.agencies"
                item-value="id"
                item-text="name"
                label="Agências"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="filters.CtBc_numContaBancaria"
                label="Número de conta corrente"
                clearable
              />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-btn color="primary" class="m-r-10" dark @click.prevent="handleCreate">
              <span class="f-bold m-r-10">Conta bancária</span>
              <i class="fa fa-plus"></i>
            </v-btn>
            <v-btn color="primary" class="m-r-10" dark @click.prevent="show = 'banks'">
              <span class="f-bold m-r-10">Bancos</span>
              <i class="fa fa-building"></i>
            </v-btn>
            <v-btn color="primary" class="m-r-10" dark @click.prevent="show = 'agencies'">
              <span class="f-bold m-r-10">Agências</span>
              <i class="fa fa-home"></i>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="#004973" dark type="submit">
              <span class="f-bold m-r-10">Filtrar</span>
              <i class="fa fa-search"></i>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- List -->
    <v-card class="m-t-10 f-size-16 list__item">
      <v-layout wrap>
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="CtBc_idContaBancaria">
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.CtBc_nomeBanco }}</td>
                <td>{{ props.item.CtBc_numAgencia }}</td>
                <td>{{ props.item.CtBc_numContaBancaria }}</td>
                <td>{{ props.item.CtBc_Saldo }}</td>
                <td>
                  <v-layout>
                    <v-btn alt="Gerenciar saldo" class="m-5" small icon color="primary" @click.prevent.stop="handleAmount(props.item)">
                      <span class="fa fa-money"></span>
                    </v-btn>
                    <v-btn alt="Editar conta" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit(props.item.CtBc_idContaBancaria)">
                      <span class="fa fa-pencil"></span>
                    </v-btn>
                    <v-btn alt="Remover conta" class="m-5" small icon color="error" @click.prevent.stop="handleDelete(props.item.CtBc_idContaBancaria)">
                      <span class="fa fa-times"></span>
                    </v-btn>
                  </v-layout>
                </td>
              </tr>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>

    <ManageAmount v-if="reference" :reference="reference" @close="reference = null" />
    <ManageAgencies v-if="show === 'agencies'" @close="show = null" />
    <ManageBanks v-if="show === 'banks'" @close="show = null" />

  </section>
</template>

<script>
import { getAllBankAccount, getAllAgency, deleteBankAccount } from '@/services'
import { mapState, mapMutations } from 'vuex'
import Notify from '@/utils/notify'
import ManageAmount from '@/views/bank-accounts/modals/ManageAmount'
import ManageAgencies from '@/views/bank-accounts/modals/ManageAgencies'
import ManageBanks from '@/views/bank-accounts/modals/ManageBanks'

export default {
  components: { ManageAmount, ManageAgencies, ManageBanks },
  data () {
    return {
      show: null,
      reference: null,
      filters: {
        Bc_numBanco: null,
        CtBc_idAgencia: null,
        CtBc_numContaBancaria: null,
        createdRange: {
          from: null,
          to: null
        },
        answeredRange: {
          from: null,
          to: null
        }
      },
      options: {
        status: []
      },
      headers: [
        {
          text: 'Banco',
          align: 'left',
          sortable: false,
          value: 'CtBc_nomeBanco'
        },
        {
          text: 'Agência',
          sortable: false,
          value: 'CtBc_numAgencia'
        },
        {
          text: 'Conta Bancária',
          sortable: false,
          value: 'CtBc_numContaBancaria'
        },
        {
          text: 'Saldo',
          sortable: false,
          value: 'CtBc_Saldo'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: []
    }
  },
  created() {
    this.doFilter()
  },
  watch: {
    reference (val) {
      if (!val) {
        this.doFilter()
      }
    }
  },
  computed: {
    ...mapState([ 'banks' ])
  },
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    doFilter () {
      this.loading = false

      getAllBankAccount()
        .then(({ data }) => {
          data = data.map (d => {
            d['CtBc_numAgencia'] = d.agency_bank.AgBc_numAgencia
            d['CtBc_nomeBanco'] = this.banks.find(b => b.id === d.agency_bank.AgBc_idBanco).name
            delete d.agency_bank

            return d
          })
          this.records = [...data]
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'bankAccount', value: null })
      this.$router.push({ name: 'bank-accounts.create' })
    },
    handleAmount (item) {
      this.reference = {
        id: item.CtBc_idContaBancaria,
        account: item.CtBc_numContaBancaria,
        value: item.CtBc_Saldo,
        agency: item.CtBc_numAgencia,
        bank: item.CtBc_nomeBanco
      }
    },
    handleEdit (id) {
      this.setFormReference({field: 'bankAccount', value: id })
      this.$router.push({ name: 'bank-accounts.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteBankAccount(id)
              .then(() => {
                Notify.success('Registro removido')
                this.doFilter()
              })
              .catch(() => { Notify.error('Não foi possível remover o registro') })
          }
        })
    }
  }
}
</script>
