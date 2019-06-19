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

            <v-flex sm12 md6 lg4>
              <v-select v-model="filters.status"
                :items="options.status"
                item-value="id"
                item-text="name"
                label="Status"
              />
            </v-flex>

            <v-flex sm12 md6 lg8>
              <m2-date-range v-model="filters.createdRange"
                label="Criado entre"
              />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-btn color="success" dark @click.prevent="handleCreate">
              <span class="f-bold m-r-10">Novo</span>
              <i class="fa fa-plus"></i>
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
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="Sim_idSimulacao">
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.Sim_status }}</td>
                <td>{{ props.item.bankAccountNumber }}</td>
                <td>{{ props.item.bankAccountAmount }}</td>
                <td>{{ props.item.Sim_valTotal }}</td>
                <td>{{ props.item.Sim_valSimulacao }}</td>
                <td>{{ props.item.created_at | dateFormat }}</td>
                <td>{{ props.item.Sim_dataPagtoSimulacao | dateFormat }}</td>
                <td>
                  <v-layout>
                    <v-btn small icon color="primary" @click.prevent="handlePreview(props.item.Sim_idSimulacao)">
                      <span class="fa fa-eye"></span>
                    </v-btn>
                    <v-btn small icon color="error" class="m-l-10" @click.prevent="handleDelete(props.item.Sim_idSimulacao)">
                      <span class="fa fa-times"></span>
                    </v-btn>
                  </v-layout>
                </td>
              </tr>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>

  </section>
</template>

<script>
import { getAllSimulation, deleteSimulation } from '@/services'
import { mapMutations } from 'vuex'
import Notify from '@/utils/notify'
export default {
  data () {
    return {
      filters: {
        status: null,
        name: null,
        cnpj: null,
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
        status: [
          {
            id: 'pendente',
            name: 'Pendente'
          },
          {
            id: 'aprovada',
            name: 'Aprovada'
          },
          {
            id: 'recusada',
            name: 'Recusada'
          }
        ]
      },
      page: 1,
      headers: [
        {
          text: 'Status',
          sortable: false,
          value: 'Sim_status'
        },
        {
          text: 'C/C',
          align: 'left',
          sortable: false,
          value: 'bankAccountNumber'
        },
        {
          text: 'Saldo Atual',
          sortable: false,
          value: 'bankAccountAmount'
        },
        {
          text: 'Total Geral',
          sortable: false,
          value: 'Sim_valTotal'
        },
        {
          text: 'Total Simulado',
          sortable: false,
          value: 'simAmoSim_valSimulacaount'
        },
        {
          text: 'Criado em',
          sortable: false,
          value: 'created_at'
        },
        {
          text: 'Data simulada',
          sortable: false,
          value: 'Sim_dataPagtoSimulacao'
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
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    doFilter () {
      this.loading = false

      getAllSimulation()
        .then(({ data }) => {
          this.records = data.map(s => {
            s.bankAccountNumber = s.bank_account.CtBc_numContaBancaria
            s.bankAccountAmount = s.bank_account.CtBc_Saldo
            return s
          })
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'simulation', value: null })
      this.$router.push({ name: 'simulation.create' })
    },
    handlePreview (id) {
      this.setFormReference({field: 'simulation', value: id })
      this.$router.push({ name: 'simulation.preview' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteSimulation(id)
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
