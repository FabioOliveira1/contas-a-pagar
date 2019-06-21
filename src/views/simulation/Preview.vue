<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">Simulação para o dia {{ record.Sim_dataPagtoSimulacao | dateFormat }}</h1>
        <p>Só pode ser aprovada ou rejeitada pelos gerentes</p>
      </v-card-title>

      <v-card-text class="p-10">
        <v-layout class="m-b-20 p-r-5 p-l-5">
          <span class="m-r-10"><b>Banco</b> <br/>{{ record.bank_account.agency_bank.bank.Bc_nomeBanco }}</span>
          <span class="m-r-10"><b>Agência</b> <br/>{{ record.bank_account.agency_bank.AgBc_numAgencia }}</span>
          <span class="m-r-10"><b>Conta</b> <br/>{{ record.bank_account.CtBc_numContaBancaria }}</span>
          <span class="m-r-10"><b>Saldo</b> <br/>{{ record.bank_account.CtBc_Saldo }}</span>
        </v-layout>
        <v-layout class="m-b-20 p-r-5 p-l-5 f-size-16">
          <span class="m-r-10"><b>Total geral</b> <br/>{{ record.Sim_valTotal }}</span>
          <span class="m-r-10"><b>Total Simulado</b> <br/>{{ record.Sim_valSimulacao }}</span>
          <span class="m-r-10"><b>Saldo após simulação</b> <br/>{{ (record.bank_account.CtBc_Saldo - record.Sim_valSimulacao) | currency }}</span>
        </v-layout>
        <v-layout wrap class="simulation-accounts-available">
          <!-- Seletor de contas -->
          <v-flex xs12 class="p-10">
            <h3 class="m-b-5">Contas em simulação</h3>

            <p class="p-t-10 p-b-10">Estão sempre ordenadas pela ordem de inserção</p>
            <v-layout wrap class="simulation-selector">
              <v-flex xs12 sm6 md4 v-for="ap in record.bills" :key="ap.id">
                <v-card color="green lighten-4" class="p-10 m-t-5 m-b-5">
                  <p class="m-b-5"><b>{{ ap.Cta_descrConta }}</b></p>
                  <p class="m-b-5">{{ ap.supplier.Forn_NomeFantasia }}</p>
                  <p class="m-b-5">{{ ap.bills_group.GrCt_NomeGrupo }}</p>
                  <p class="m-b-5">R$ {{ ap.Cta_valConta | currency }} - {{ ap.Cta_dataVencimento | dateFormat }}</p>
                  <p class="m-b-5">Total R$ {{ ap.simValue || 0 | currency }}</p>

                  <span title="Risco do fornecedor" class="white risk-indicator p-5 f-size-16">
                    <i :class="`${riskColors[ap.supplier.Forn_idRisco - 1]} fa fa-truck`"></i>
                  </span>
                  <span title="Risco do grupo de contas" class="white risk-indicator p-5 f-size-16">
                    <i :class="`${riskColors[ap.bills_group.GrCt_idRisco - 1]} fa fa-object-group`"></i>
                  </span>
                </v-card>
              </v-flex>
              <v-flex xs12 v-if="!record.bills.length">
                <v-card color="#fff" class="p-10 m-t-5 m-b-5">
                  <p class="m-b-5">Não existem contas a pagar para simular</p>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
          <v-layout class="p-10">
            <v-btn dark color="error" @click.prevent="deny">
              <span class="f-bold m-r-10">Recusar</span>
              <i class="fa fa-times"></i>
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn color="success" dark @click.prevent="accept">
              <span class="f-bold m-r-10">Aprovar</span>
              <i class="fa fa-check"></i>
            </v-btn>
          </v-layout>
      </v-card-text>

    </v-card>

  </section>
</template>

<script>
import { getSimulation, endSimulation } from '@/services'
import { mapGetters } from 'vuex'
import moment from 'moment'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      loadingAccept: false,
      loadingDeny: false,
      record: {
        bills: [],
        bank_account: {
          agency_bank: {
            bank: {}
          }
        }
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
      simAccounts: [],
      riskColors: ['green--text text--darken-3', 'yellow--text text--darken-4', 'red--text text--darken-1']
    }
  },
  created () {
    if (!this.currentId) {
      this.$router.go(-1)
      return false
    }
    this.record.id = this.currentId
    this.fetchRecord()
  },
  computed: {
    ...mapGetters(['getFormReference']),
    currentId () {
      return this.getFormReference('simulation')
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      getSimulation(this.record.id)
        .then(({ data }) => {
          this.record = { ...data, id: data.Sim_idSimulacao }
          this.getRealValues()
        })
        .then(() => { this.loading = false })
    },
    accept () {
      this.loadingAccept = true
      endSimulation({ id: this.record.Sim_idSimulacao, Sim_status: 'Aprovada' })
        .then(() => {
          Notify.success('As contas a pagar foram atualizadas', 'Simulação aceita')
          this.$router.push({ name: 'home' })
        })
        .catch(() => { Notify.error('Algo deu errado, tente mais tarde.') })
        .then(() => { this.loadingAccept = false })
    },
    deny () {
      this.loadingDeny = true
      endSimulation({ id: this.record.Sim_idSimulacao, Sim_status: 'Recusada' })
        .then(() => {
          Notify.info('As contas a pagar continuam em aberto', 'Simulação recusada')
          this.$router.push({ name: 'home' })
        })
        .catch(() => { Notify.error('Algo deu errado, tente mais tarde.') })
        .then(() => { this.loadingDeny = false })
    },
    getRealValues () {
      this.record.bills = this.record.bills.map(ap => {
        if (!this.record.Sim_dataPagtoSimulacao) {
          ap.simValue = null
          return ap
        }

        const simDate = moment(this.record.Sim_dataPagtoSimulacao)
        const dueDate = moment(ap.Cta_dataVencimento)
        const diff = simDate.diff(dueDate, 'days')

        if (diff <= 0) {
          ap.simValue = ap.Cta_valConta
          return ap
        }

        let value = ap.Cta_valConta
        
        if (ap.Cta_Multa) {
          value += ap.Cta_valConta * (ap.Cta_Multa > 1 ? ap.Cta_Multa / 100 : ap.Cta_Multa)
        }

        if (ap.Cta_Juros) {
          value = value*Math.pow((1 + (ap.Cta_Juros > 1 ? ap.Cta_Juros / 100 : ap.Cta_Juros)), diff)
        }

        if (ap.Cta_tempoProtesto && ap.Cta_tempoProtesto > diff) {
          value += ap.Cta_valProtesto
        }

        ap.simValue = value
        return ap
      })
    }
  }
}
</script>
