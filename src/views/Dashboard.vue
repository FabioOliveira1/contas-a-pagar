<template>
  <v-layout wrap>
    <v-flex xs12 sm6 class="dashboard-card p-10">
      <v-card>
        <v-layout>
          <v-flex xs6 class="dashboard-card-label p-10 blue lighten-4">
            Contas a pagar abertas
          </v-flex>
          <v-flex xs6 class="dashboard-card-value p-10">
            {{ record.openBills }}
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 class="dashboard-card p-10">
      <v-card>
        <v-layout>
          <v-flex xs6 class="dashboard-card-label p-10 blue lighten-4">
            Contas a pagar vencidas
          </v-flex>
          <v-flex xs6 class="dashboard-card-value p-10">
            {{ record.overdueBills }}
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 class="dashboard-card p-10">
      <v-card>
        <v-layout>
          <v-flex xs6 class="dashboard-card-label p-10 blue lighten-4">
            Contas a pagar renegociadas
          </v-flex>
          <v-flex xs6 class="dashboard-card-value p-10">
            {{ record.renegociatedBills }}
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 sm6 class="dashboard-card p-10">
      <v-card>
        <v-layout>
          <v-flex xs6 class="dashboard-card-label p-10 blue lighten-4">
            Simulações abertas
          </v-flex>
          <v-flex xs6 class="dashboard-card-value p-10">
            {{ record.openSimulations }}
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 p-10>

    <!-- List -->
    <v-card class="f-size-16 list__item">
      <h3 class="m-l-15">Contas a pagar próximas do vencimento</h3>
      <v-layout wrap>
          <v-data-table class="w-100" :headers="headers" :items="record.closeToDueDate" item-key="id" hide-actions>
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.Cta_descrConta }}</td>
                <td>{{ props.item.supplier.Forn_NomeFantasia }}</td>
                <td>{{ props.item.bills_group.GrCt_NomeGrupo }}</td>
                <td>{{ props.item.Cta_valConta }}</td>
                <td>{{ props.item.Cta_dataVencimento | dateFormat }}</td>
              </tr>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import { getDashboard } from '@/services'
import { mapActions } from 'vuex'
import Notify from '@/utils/notify'
export default {
  data () {
    return {
      record: {
        openBills: 'Carregando..',
        openSimulations: 'Carregando..',
        overdueBills: 'Carregando..',
        renegociatedBills: 'Carregando..',
        closeToDueDate: []
      },
      headers: [
        {
          text: 'Descrição',
          align: 'left',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Fornecedor',
          sortable: false,
          value: 'supplier'
        },
        {
          text: 'Grupo de contas',
          sortable: false,
          value: 'accountsGroup'
        },
        {
          text: 'Valor a pagar',
          sortable: false,
          value: 'value'
        },
        {
          text: 'Vencimento em',
          sortable: false,
          value: 'dueDateAt'
        }
      ]
    }
  },
  created () {
    getDashboard()
      .then(({ data }) => {
        this.record = { ...data }
      })
  }
}
</script>
