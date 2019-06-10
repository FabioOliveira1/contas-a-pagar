<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">Simulação para o dia {{ record.simDate | dateFormat }}</h1>
        <p>Só pode ser aprovada ou rejeitada pelos gerentes</p>
      </v-card-title>

      <v-card-text class="p-10">
        <v-layout class="m-b-20 p-r-5 p-l-5">
          <span class="m-r-10"><b>Banco</b> <br/>{{ record.bank.name }}</span>
          <span class="m-r-10"><b>Agência</b> <br/>{{ record.agency.number }}</span>
          <span class="m-r-10"><b>Conta</b> <br/>{{ record.bankAccount.number }}</span>
          <span class="m-r-10"><b>Saldo</b> <br/>{{ record.bankAccount.value }}</span>
        </v-layout>
        <v-layout class="m-b-20 p-r-5 p-l-5 f-size-16">
          <span class="m-r-10"><b>Total geral</b> <br/>{{ record.allAmount }}</span>
          <span class="m-r-10"><b>Total Simulado</b> <br/>{{ record.simAmount }}</span>
          <span class="m-r-10"><b>Saldo após simulação</b> <br/>{{ (record.bankAccount.value - record.simAmount) | currency }}</span>
        </v-layout>
        <v-layout wrap class="simulation-accounts-available">
          <!-- Seletor de contas -->
          <v-flex xs12 class="p-10">
            <h3 class="m-b-5">Contas em simulação</h3>

            <p class="p-t-10 p-b-10">Estão sempre ordenadas pela ordem de inserção</p>
            <v-layout wrap class="simulation-selector">
              <v-flex xs12 sm6 md4 v-for="ap in simAccounts" :key="ap.id">
                <v-card color="green lighten-2" class="p-10 m-t-5 m-b-5">
                  <p class="m-b-5"><b>{{ ap.description }}</b></p>
                  <p class="m-b-5">{{ ap.supplier.name }}</p>
                  <p class="m-b-5">{{ ap.accountsGroup.name }}</p>
                  <p class="m-b-5">R$ {{ ap.value | currency }} - {{ ap.dueDateAt | dateFormat }}</p>
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
                  <p class="m-b-5">Não existem contas a pagar para simular</p>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
          <v-layout class="p-10">
            <v-btn dark color="error" @click.prevent="$router.go(-1)">
              <span class="f-bold m-r-10">Recusar</span>
              <i class="fa fa-times"></i>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="success" dark type="submit">
              <span class="f-bold m-r-10">Aprovar</span>
              <i class="fa fa-check"></i>
            </v-btn>
          </v-layout>
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
        simDate: '2019-03-22',
        allAmount: 5383.31,
        simAmount: 3630.55
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
      simAccounts: [
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
          description: 'Suportes para notebook',
          supplier: { name: 'Lunga Ká', risk: 1 },
          accountsGroup: { name: 'Material de Escritório', risk: 1 },
          value: 350,
          dueDateAt: '2019-03-20',
          protestTime: 5, // Em dias
          protestValue: 230, // Valor para retirar o protesto
          fee: 0.1, // Porcentagem direta
          increase: 0.02 // Porcentagem ao dia
        }
      ],
      riskColors: ['green--text text--darken-3', 'yellow--text text--darken-4', 'red--text text--darken-1']
    }
  },
  created () {
    if (this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
      this.getRealValues()
    }
  },
  computed: {
    ...mapGetters({
      currentId: 'getRenegociationForm'
    })
  },
  methods: {
    getRealValues () {
      this.simAccounts.map(ap => {
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
