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
              <v-combobox v-model="record.bank"
                :rules="[v => !!v && !!v.id || 'Selecione um banco']"
                :items="options.banks"
                item-text="name"
                label="Banco"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-combobox v-model="record.agency"
                :rules="[v => !!v && !!v.id || 'Selecione uma agência bancária']"
                :items="options.agencies"
                item-text="number"
                label="Agência"
              />
            </v-flex>

            <v-flex xs12 sm6 md3>
              <v-combobox v-model="record.bankAccount"
                :rules="[v => !!v && !!v.id || 'Selecione a conta bancária']"
                :items="options.accounts"
                item-text="number"
                label="Conta bancária"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="record.bankAccount.value"
                label="Saldo atual"
                disabled
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <m2-date-picker v-model="record.simDate"
                label="Data de simulação de pagamento"
                :rules="[v => !!v || 'Proponha uma data de vencimento']"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="record.simAmount"
                label="Total da simulação"
                disabled
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="record.allAmount"
                label="Total geral"
                disabled
              />
            </v-flex>
          </v-layout>

          <v-layout wrap class="simulation-accounts-available">
            <div class="no-date-selected" v-if="!record.simDate">Selecione a data primeiro</div>
            <!-- Seletor de contas -->
            <v-flex xs12 sm8>
              <h3 class="m-b-10">Contas disponíveis</h3>
              <v-layout justify-space-between class="m-b-10">
                <v-btn small flat @click="handleFilter('supplier')" :color="getColor('supplier')" class="m-r-10">
                  <i class="m-r-10 fa fa-truck"></i> <i :class="getOrderIcon('supplier')"></i>
                </v-btn>
                
                <v-btn small flat @click="handleFilter('accountsGroup')" :color="getColor('accountsGroup')" class="m-r-10">
                  <i class="m-r-10 fa fa-object-group"></i> <i :class="getOrderIcon('accountsGroup')"></i>
                </v-btn>
                
                <v-btn small flat @click="handleFilter('simValue')" :color="getColor('simValue')" class="m-r-10">
                  <i class="m-r-10 fa fa-money"></i> <i :class="getOrderIcon('simValue')"></i>
                </v-btn>
                
                <v-btn small flat @click="handleFilter('dueDateAt')" :color="getColor('dueDateAt')" class="m-r-10">
                  <i class="m-r-10 fa fa-calendar"></i> <i :class="getOrderIcon('dueDateAt')"></i>
                </v-btn>
              </v-layout>
              <v-layout wrap class="simulation-selector">
                <v-flex xs12 sm6 md6 v-for="(ap, i) in sortedAccounts" :key="ap.id" @click="addAccount(i)">
                  <v-card color="#ddd" class="p-10 m-t-5 m-b-5 pointer">
                    <p class="m-b-5"><b>{{ ap.description }}</b></p>
                    <p class="m-b-5">{{ ap.supplier.name }}</p>
                    <p class="m-b-5">{{ ap.accountsGroup.name }}</p>
                    <p class="m-b-5">R$ {{ ap.value | currency }} - {{ ap.dueDateAt }}</p>
                    <p class="m-b-5">Total R$ {{ ap.simValue || 0 | currency }}</p>

                    <span title="Risco do fornecedor" class="white risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.supplier.risk - 1]} fa fa-truck`"></i>
                    </span>
                    <span title="Risco do grupo de contas" class="white risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.accountsGroup.risk - 1]} fa fa-object-group`"></i>
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
                  <v-card color="green lighten-2" class="p-10 white--text m-t-5 m-b-5 pointer">
                    <p class="m-b-5"><b>{{ ap.description }}</b></p>
                    <p class="m-b-5">{{ ap.supplier.name }}</p>
                    <p class="m-b-5">{{ ap.accountsGroup.name }}</p>
                    <p class="m-b-5">R$ {{ ap.value | currency }} - {{ ap.dueDateAt }}</p>
                    <p class="m-b-5">Total R$ {{ ap.simValue || 0 | currency }}</p>
                    <span title="Risco do fornecedor" class="white risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.supplier.risk - 1]} fa fa-truck`"></i>
                    </span>
                    <span title="Risco do grupo de contas" class="white risk-indicator p-5 f-size-16">
                      <i :class="`${riskColors[ap.accountsGroup.risk - 1]} fa fa-object-group`"></i>
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
import { get, create, update } from '@/services'
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
        bank: {
          id: 1,
          number: '041',
          name: 'Itaú SA'
        },
        agency: {
          id: 1,
          number: '0048'
        },
        bankAccount: {
          id: 1,
          number: '631787',
          value: 5000
        },
        simDate: null,
        allAmount: null,
        simAmount: null
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
      agencyCombo: {
        id: null,
        name: null
      },
      bankCombo: {
        id: null,
        name: null
      },
      options: {
        banks: [],
        agencies: [],
        accounts: []
      },
      accountsPayable: [
        {
          id: Math.random() * Date.now(),
          description: 'Milheiro papel vergê',
          supplier: { name: 'Papeis Silva', risk: 3 },
          accountsGroup: { name: 'Insumos', risk: 3 },
          value: 2000,
          dueDateAt: '2019-04-10',
          protestTime: 6, // Em dias
          protestValue: 350, // Valor para retirar o protesto
          fee: 0.1, // Porcentagem direta
          increase: 0.01 // Porcentagem ao dia
        },
        {
          id: Math.random() * Date.now(),
          description: 'Chapas de impressão personalizadas',
          supplier: { name: 'Papeis Silva', risk: 3 },
          accountsGroup: { name: 'Insumos', risk: 3 },
          value: 1000,
          dueDateAt: '2019-03-22',
          protestTime: 6, // Em dias
          protestValue: 350, // Valor para retirar o protesto
          fee: 0.1, // Porcentagem direta
          increase: 0.01 // Porcentagem ao dia
        },
        {
          id: Math.random() * Date.now(),
          description: 'Pigmentos variados',
          supplier: { name: 'Tintas Cerdo', risk: 3 },
          accountsGroup: { name: 'Insumos', risk: 3 },
          value: 900,
          dueDateAt: '2019-03-25',
          fee: 0.1, // Porcentagem direta
          increase: 0.03 // Porcentagem ao dia
        },
        {
          id: Math.random() * Date.now(),
          description: 'Conjunto de corte e estampa',
          supplier: { name: 'Estampo e cia', risk: 2 },
          accountsGroup: { name: 'Insumos', risk: 3 },
          value: 670,
          dueDateAt: '2019-03-18',
          fee: 0.1, // Porcentagem direta
          increase: 0.02 // Porcentagem ao dia
        },
        {
          id: Math.random() * Date.now(),
          description: 'Suportes para notebook',
          supplier: { name: 'Lunga Ká', risk: 1 },
          accountsGroup: { name: 'Material de Escritório', risk: 1 },
          value: 350,
          dueDateAt: '2019-03-20',
          protestTime: 5, // Em dias
          protestValue: 230, // Valor para retirar o protesto
          fee: 0.1, // Porcentagem direta
          increase: 0.02 // Porcentagem ao dia
        },
        {
          id: Math.random() * Date.now(),
          description: 'Produtos de limpeza',
          supplier: { name: 'Limpejá', risk: 1 },
          accountsGroup: { name: 'Material de Escritório', risk: 1 },
          value: 55,
          dueDateAt: '2019-03-15'
        }
      ],
      simAccounts: [],
      sortBy: [],
      filterColors: {
        'supplier': 'red darken-2',
        'accountsGroup': 'blue darken-2',
        'simValue': 'green darken-2',
        'dueDateAt': 'purple darken-2'
      },
      riskColors: ['green--text text--darken-3', 'yellow--text text--darken-4', 'red--text text--darken-1']
    }
  },
  created () {
    if (this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
    }
  },
  watch: {
    'record.simDate' (val) {
      this.getRealValues()
    }
  },
  computed: {
    ...mapGetters({
      currentId: 'getRenegociationForm'
    }),
    sortedAccounts () {
      return this.accountsPayable.sort((a, b) => {
        for (let item of this.sortBy) {
          if (item.name === 'accountsGroup' || item.name === 'supplier') {
            if (a[item.name].risk > b[item.name].risk) {
              return item.order
            }
            if (a[item.name].risk < b[item.name].risk) {
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
  methods: {
    getAmounts () {
      let allAmount = 0
      allAmount = this.accountsPayable.reduce((allAmount, b) => allAmount + b.simValue, 0)
      let simAmount = 0
      simAmount = this.simAccounts.reduce((simAmount, b) => simAmount + b.simValue, 0)
      this.record.allAmount = this.$options.filters.currency(allAmount + simAmount)
      this.record.simAmount = this.$options.filters.currency(simAmount)
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
    getRealValues () {
      this.accountsPayable.map(ap => {
        if (!this.record.simDate) {
          ap.simValue = null
          return ap
        }

        const simDate = moment(this.record.simDate)
        const dueDate = moment(ap.dueDateAt)
        const diff = simDate.diff(dueDate, 'days')

        if (diff <= 0) {
          ap.simValue = ap.value
          return ap
        }

        let value = ap.value
        
        if (ap.fee) {
          value += ap.value * ap.fee
        }

        if (ap.increase) {
          value = value*Math.pow((1 + ap.increase), diff)
        }

        if (ap.protestTime && ap.protestTime > diff) {
          value += ap.protestValue
        }

        ap.simValue = value
        return ap
      })
      this.getAmounts()
    },
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
