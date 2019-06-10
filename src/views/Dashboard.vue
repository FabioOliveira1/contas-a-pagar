<template>
  <v-layout wrap>
    <v-flex xs12 sm6 class="dashboard-card p-10">
      <v-card>
        <v-layout>
          <v-flex xs6 class="dashboard-card-label p-10 blue lighten-4">
            Contas a pagar abertas
          </v-flex>
          <v-flex xs6 class="dashboard-card-value p-10">
            10
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
            10
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
            10
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
            3
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 p-10>

    <!-- List -->
    <v-card class="f-size-16 list__item">
      <h3 class="m-l-15">Contas próximas do vencimento</h3>
      <v-layout wrap>
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="id" hide-actions>
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.supplier }}</td>
                <td>{{ props.item.accountsGroup }}</td>
                <td>{{ props.item.value }}</td>
                <td>{{ props.item.dueDateAt | dateFormat }}</td>
                <td>{{ props.item.status }}</td>
              </tr>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import Notify from '@/utils/notify'
export default {
  data () {
    return {
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
        },
        {
          text: 'Status',
          sortable: false,
          value: 'status'
        },
      ],
      records: [
        {
          id: Math.random() * Date.now(),
          description: 'Milheiro papel vergê',
          supplier: 'Papeis Silva',
          accountsGroup: 'Insumos',
          value: 2000,
          dueDateAt: '2019-03-19',
          status: 'Pendente'
        },
        {
          id: Math.random() * Date.now(),
          description: 'Chapas de impressão personalizadas',
          supplier: 'Papeis Silva',
          accountsGroup: 'Insumos',
          value: 1000,
          dueDateAt: '2019-03-22',
          status: 'Pendente'
        },
        {
          id: Math.random() * Date.now(),
          description: 'Pigmentos variados',
          supplier: 'Tintas Cerdo',
          accountsGroup: 'Insumos',
          value: 900,
          dueDateAt: '2019-03-25',
          status: 'Pendente'
        },
        {
          id: Math.random() * Date.now(),
          description: 'Conjunto de corte e estampa',
          supplier: 'Estampo e cia',
          accountsGroup: 'Insumos',
          value: 670,
          dueDateAt: '2019-03-18',
          status: 'Pendente'
        },
        {
          id: Math.random() * Date.now(),
          description: 'Suportes para notebook',
          supplier: 'Lunga Ká',
          accountsGroup: 'Material de Escritório',
          value: 350,
          dueDateAt: '2019-03-20',
          status: 'Pendente'
        }
      ]
    }
  },
  watch: {
    page (val) {
      console.log(val)
    }
  },
  methods: {
    ...mapActions(['setRenegociationForm']),
    doFilter () {
      console.log('Essa é uma ação irreversível')
    },
    handleCreate () {
      this.setRenegociationForm(null)
      this.$router.push({ name: 'users.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'users.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(val => console.log(val))
    }
  }
}
</script>
