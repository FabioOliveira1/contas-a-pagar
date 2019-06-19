<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de simulação</p>
      </v-card-title>

      <v-card-text class="p-10">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex xs12 sm6 md2>
              <v-select v-model="bank"
                :rules="[v => !!v || 'Selecione um banco']"
                :items="banks"
                item-value="id"
                item-text="name"
                label="Banco"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-select v-model="agency"
                :rules="[v => !!v || 'Selecione uma agência bancária']"
                :items="agencies"
                item-value="id"
                item-text="number"
                label="Agência"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-select v-model="record.Sim_idContaBancaria"
                :rules="[v => !!v || 'Selecione a conta bancária']"
                :items="bankAccounts"
                item-value="id"
                item-text="number"
                label="Conta bancária"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="selectedBankAccount.amount"
                label="Saldo atual"
                disabled
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <m2-date-picker v-model="record.Sim_dataPagtoSimulacao"
                label="Data de simulação de pagamento"
                :rules="[v => !!v || 'Proponha uma data de vencimento']"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="record.Sim_valSimulacao"
                label="Total da simulação"
                disabled
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="record.Sim_valTotal"
                label="Total geral"
                disabled
              />
            </v-flex>
          </v-layout>

          <v-layout wrap class="simulation-accounts-available">
            <div class="no-date-selected" v-if="!record.Sim_dataPagtoSimulacao">Selecione a data primeiro</div>

            <v-flex xs12>
              <label class="error--text" v-if="record.Sim_dataPagtoSimulacao && !simAccounts.length">
                Nenhuma conta a pagar em simulação
              </label>
            </v-flex>

            <!-- Seletor de contas -->
            <v-flex xs12 sm8>
              <h3 class="m-b-10">Contas disponíveis</h3>
              <v-layout justify-space-between class="m-b-10">
                <v-btn small flat @click="handleFilter('supplier')" :color="getColor('supplier')" class="m-r-10">
                  <i class="m-r-10 fa fa-truck"></i> <i :class="getOrderIcon('supplier')"></i>
                </v-btn>
                
                <v-btn small flat @click="handleFilter('bills_group')" :color="getColor('bills_group')" class="m-r-10">
                  <i class="m-r-10 fa fa-object-group"></i> <i :class="getOrderIcon('bills_group')"></i>
                </v-btn>
                
                <v-btn small flat @click="handleFilter('simValue')" :color="getColor('simValue')" class="m-r-10">
                  <i class="m-r-10 fa fa-money"></i> <i :class="getOrderIcon('simValue')"></i>
                </v-btn>
                
                <v-btn small flat @click="handleFilter('Cta_dataVencimento')" :color="getColor('Cta_dataVencimento')" class="m-r-10">
                  <i class="m-r-10 fa fa-calendar"></i> <i :class="getOrderIcon('Cta_dataVencimento')"></i>
                </v-btn>
              </v-layout>
              <v-layout wrap class="simulation-selector">
                <v-flex xs12 sm6 md6 v-for="(ap, i) in sortedAccounts" :key="ap.id" @click="addAccount(i)">
                  <v-card color="#ddd" class="p-10 m-t-5 m-b-5 pointer">
                    <p class="m-b-5"><b>{{ ap.Cta_descrConta }}</b></p>
                    <p class="m-b-5">{{ ap.supplier.Forn_nomeFantasia }}</p>
                    <p class="m-b-5">{{ ap.bills_group.GrCt_nomeGrupo }}</p>
                    <p class="m-b-5">R$ {{ ap.Cta_valConta | currency }} - {{ ap.Cta_dataVencimento }}</p>
                    <p class="m-b-5">Total R$ {{ ap.simValue || 0 | currency }}</p>

                    <span title="Risco do fornecedor" class="Forn_idRiscoite risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.supplier.Forn_idRisco - 1]} fa fa-truck`"></i>
                    </span>
                    <span title="Risco do grupo de contas" class="GrCt_idRiscoe risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.bills_group.GrCt_idRisco - 1]} fa fa-object-group`"></i>
                    </span>
                  </v-card>
                </v-flex>
                <v-flex xs12 v-if="!sortedAccounts.length">
                  <v-card color="#fff" class="p-10 m-t-5 m-b-5">
                    <p class="m-b-5">Não existem contas a pagar para simular</p>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <!-- Contas em simulação -->
            <v-flex xs12 sm4>
              <h3 class="m-b-5">Contas em simulação</h3>

              <p class="p-10">Estão sempre ordenadas pela ordem de inserção</p>

              <v-layout wrap class="simulation-selector">
                <v-flex xs12 v-for="(ap, i) in simAccounts" :key="ap.id" @click="removeAccount(i)">
                  <v-card color="green lighten-4" class="p-10 m-t-5 m-b-5 pointer">
                    <p class="m-b-5"><b>{{ ap.Cta_descrConta }}</b></p>
                    <p class="m-b-5">{{ ap.supplier.Forn_nomeFantasia }}</p>
                    <p class="m-b-5">{{ ap.bills_group.GrCt_nomeGrupo }}</p>
                    <p class="m-b-5">R$ {{ ap.Cta_valConta | currency }} - {{ ap.Cta_dataVencimento }}</p>
                    <p class="m-b-5">Total R$ {{ ap.simValue || 0 | currency }}</p>
                    <span title="Risco do fornecedor" class="white risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.supplier.Forn_idRisco - 1]} fa fa-truck`"></i>
                    </span>
                    <span title="Risco do grupo de contas" class="white risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.bills_group.GrCt_idRisco - 1]} fa fa-object-group`"></i>
                    </span>
                  </v-card>
                </v-flex>
                <v-flex xs12 v-if="!simAccounts.length">
                  <v-card color="#fff" class="p-10 m-t-5 m-b-5">
                    <p class="m-b-5">Nenhuma conta adicionada</p>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>

          <v-layout class="p-10">
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
import { getAllBank, getAllAgency, getAllBankAccount, getAllAccountsPayable, createSimulation, update } from '@/services'
import { mapGetters } from 'vuex'
import FormActions from '@/utils/mixins/formActions'
import moment from 'moment'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'renegociação',
      loading: false,
      record: {
        Sim_idContaBancaria: null,
        Sim_dataPagtoSimulacao: null,
        Sim_valTotal: null,
        Sim_valSimulacao: null
      },
      bank: null,
      agency: null,
      banks: [],
      agencies: [],
      bankAccounts: [],
      accountsPayable: [],
      simAccounts: [],
      sortBy: [],
      filterColors: {
        'supplier': 'red darken-2',
        'bills_group': 'blue darken-2',
        'simValue': 'green darken-2',
        'Cta_dataVencimento': 'purple darken-2'
      },
      riskColors: ['green--text text--darken-3', 'yellow--text text--darken-4', 'red--text text--darken-1']
    }
  },
  created () {
    this.getOptions()
  },
  computed: {
    selectedBankAccount () {
      if (!this.record.Sim_idContaBancaria || !this.bankAccounts.length) {
        return {}
      }

      return this.bankAccounts.find(bc => bc.id === this.record.Sim_idContaBancaria)
    },
    sortedAccounts () {
      return this.accountsPayable.sort((a, b) => {
        for (let item of this.sortBy) {
          if (item.name === 'bills_group') {
            if (a[item.name].GrCt_idRisco > b[item.name].GrCt_idRisco) {
              return item.order
            }
            if (a[item.name].GrCt_idRisco < b[item.name].GrCt_idRisco) {
              return item.order*(-1)
            }
          }

          if (item.name === 'supplier') {
            if (a[item.name].Forn_idRisco > b[item.name].Forn_idRisco) {
              return item.order
            }
            if (a[item.name].Forn_idRisco < b[item.name].Forn_idRisco) {
              return item.order*(-1)
            }
          }

          if (a[item.name] > b[item.name]) {
            return item.order
          }
          if (a[item.name] < b[item.name]) {
            return item.order*(-1)
          }
        }

        return 1
      })
    }
  },
  watch: {
    'record.Sim_dataPagtoSimulacao' (val) {
      this.getRealValues()
    },
    bank (val) {
      this.agency = null
      if (val) {
        getAllAgency({ AgBc_idBanco: val })
          .then(({ data }) => {
            this.agencies = data.map(b => ({
              id: b.AgBc_idAgencia,
              name: b.AgBc_nomeAgencia,
              number: b.AgBc_numAgencia
            }))
          })
      }
    },
    agency (val) {
      this.record.Sim_idContaBancaria = null
      if (val) {
        getAllBankAccount({ CtBc_idAgencia: val })
          .then(({ data }) => {
            this.bankAccounts = data.map(b => ({
              id: b.CtBc_idContaBancaria,
              amount: b.CtBc_Saldo,
              number: b.CtBc_numContaBancaria
            }))
          })
      }
    }
  },
  methods: {
    getOptions () {
      getAllBank()
        .then(({ data }) => {
          this.banks = data.map(b => ({
            id: b.Bc_idBanco,
            name: b.Bc_nomeBanco,
            number: b.Bc_numBanco
          }))
        })
      getAllAccountsPayable({ Cta_Status_s: ['A', 'R'] })
        .then(({ data }) => {
          this.accountsPayable = data
        })
    },
    getRealValues () {
      this.accountsPayable = this.accountsPayable.map(ap => {
        if (!this.record.Sim_dataPagtoSimulacao) {
          ap.simValue = null
          return ap
        }

        const Sim_dataPagtoSimulacao = moment(this.record.Sim_dataPagtoSimulacao)
        const dueDate = moment(ap.dueDateAt)
        const diff = Sim_dataPagtoSimulacao.diff(dueDate, 'days')

        if (diff <= 0) {
          ap.simValue = ap.Cta_valConta
          return ap
        }

        let value = ap.Cta_valConta
        
        if (ap.Cta_Multa) {
          value += ap.Cta_valConta * ap.Cta_Multa
        }

        if (ap.Cta_Juros) {
          value = value*Math.pow((1 + ap.Cta_Juros), diff)
        }

        if (ap.Cta_tempoProtesto && ap.Cta_tempoProtesto > diff) {
          value += ap.Cta_valProtesto
        }

        ap.simValue = value
        return ap
      })
      this.getAmounts()
    },
    getAmounts () {
      let Sim_valTotal = 0
      Sim_valTotal = this.accountsPayable.reduce((Sim_valTotal, b) => Sim_valTotal + b.simValue, 0)
      let Sim_valSimulacao = 0
      Sim_valSimulacao = this.simAccounts.reduce((Sim_valSimulacao, b) => Sim_valSimulacao + b.simValue, 0)
      this.record.Sim_valTotal = this.$options.filters.currency(Sim_valTotal + Sim_valSimulacao)
      this.record.Sim_valSimulacao = this.$options.filters.currency(Sim_valSimulacao)
    },
    addAccount (i) {
      this.simAccounts.push(this.accountsPayable[i])
      this.accountsPayable.splice(i, 1)
      this.getAmounts()
    },
    removeAccount (i) {
      this.accountsPayable.push(this.simAccounts[i])
      this.simAccounts.splice(i, 1)
      this.getAmounts()
    },
    handleFilter (type) {
      const existent = this.sortBy.findIndex(f => f.name === type)

      if (existent === -1) {
        this.sortBy.push({ name: type, order: 1 })
        return true
      }

      if(this.sortBy[existent].order === 1) {
        this.sortBy[existent].order = -1
        return true
      }

      this.sortBy.splice(existent, 1)
      return false
    },
    getOrderIcon (type) {
      const existent = this.sortBy.find(f => f.name === type)

      if (!existent) {
        return ''
      }

      return `fa fa-arrow-${existent.order === 1 ? 'up' : 'down'}` 
    },
    getColor (type) {
      const existent = this.sortBy.findIndex(f => f.name === type)
      if (existent === -1) {
        return 'grey'
      }

      return this.filterColors[type]
    },
    create: payload => createSimulation(payload),
    doFilter () {
      if (this.$refs.form.validate() && this.simAccounts.length) {
        this.record['bills'] = this.simAccounts.map(({ Cta_idConta }) => Cta_idConta)
        this.save()
      }
    }
  }
}
</script>
