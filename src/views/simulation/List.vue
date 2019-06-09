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
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="id">
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.status }}</td>
                <td>{{ props.item.bankAccount }}</td>
                <td>{{ props.item.accountAmount }}</td>
                <td>{{ props.item.allAmount }}</td>
                <td>{{ props.item.simAmount }}</td>
                <td>{{ props.item.createdAt }}</td>
                <td>{{ props.item.simDate }}</td>
                <td>
                  <v-layout>
                    <v-btn small icon color="primary" @click.prevent="handleDelete('thisId')">
                      <span class="fa fa-eye"></span>
                    </v-btn>
                    <v-btn small icon color="error" class="m-l-10" @click.prevent="handleDelete('thisId')">
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
import { mapActions } from 'vuex'
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
          value: 'status'
        },
        {
          text: 'C/C',
          align: 'left',
          sortable: false,
          value: 'bankAccount'
        },
        {
          text: 'Saldo Atual',
          sortable: false,
          value: 'accountAmount'
        },
        {
          text: 'Total Geral',
          sortable: false,
          value: 'allAmount'
        },
        {
          text: 'Total Simulado',
          sortable: false,
          value: 'simAmount'
        },
        {
          text: 'Criado em',
          sortable: false,
          value: 'createdAt'
        },
        {
          text: 'Data simulada',
          sortable: false,
          value: 'simDate'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: [
        {
          id: '4ad2fa42fa4af2af2443f4',
          status: 'Pendente',
          bankAccount: '631787',
          accountAmount: 5000,
          allAmount: 5383.31,
          simAmount: 3630.55,
          createdAt: '2019-03-14 15:30:32',
          simDate: '22/03/2019'
        },
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
      this.$router.push({ name: 'simulation.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'simulation.view' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(val => console.log(val))
    }
  }
}
</script>
