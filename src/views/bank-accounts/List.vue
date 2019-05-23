<template>
  <section>
    <!-- Filter -->
    <v-card>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados batata</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.bank"
                :items="options.banks"
                item-value="id"
                item-text="name"
                label="Bancos"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.agency"
                :items="options.agencies"
                item-value="id"
                item-text="name"
                label="Agências"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-text-field v-model="filters.accountNumber"
                label="Número de conta corrente"
                clearable
              />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-btn color="success" class="m-r-10" dark @click.prevent="handleCreate">
              <span class="f-bold m-r-10">Novo</span>
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
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="id">
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.bank }}</td>
                <td>{{ props.item.agency }}</td>
                <td>{{ props.item.account }}</td>
                <td>{{ props.item.value }}</td>
                <td>
                  <v-layout>
                    <v-btn alt="Gerenciar saldo" class="m-5" small icon color="primary" @click.prevent.stop="handleEdit('thisId')">
                      <span class="fa fa-money"></span>
                    </v-btn>
                    <v-btn alt="Editar conta" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit('thisId')">
                      <span class="fa fa-pencil"></span>
                    </v-btn>
                    <v-btn alt="Remover conta" class="m-5" small icon color="error" @click.prevent.stop="handleDelete('thisId')">
                      <span class="fa fa-times"></span>
                    </v-btn>
                  </v-layout>
                </td>
              </tr>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>

    <ManageAgencies v-if="show === 'agencies'" @close="show = null" />
    <ManageBanks v-if="show === 'banks'" @close="show = null" />

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Notify from '@/utils/notify'
import ManageAgencies from '@/views/bank-accounts/modals/ManageAgencies'
import ManageBanks from '@/views/bank-accounts/modals/ManageBanks'

export default {
  components: { ManageAgencies, ManageBanks },
  data () {
    return {
      show: null,
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
        status: []
      },
      headers: [
        {
          text: 'Banco',
          align: 'left',
          sortable: false,
          value: 'bank'
        },
        {
          text: 'Agência',
          sortable: false,
          value: 'agency'
        },
        {
          text: 'Conta Bancária',
          sortable: false,
          value: 'account'
        },
        {
          text: 'Saldo',
          sortable: false,
          value: 'value'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: [
        {
          id: Math.random() * Date.now(),
          bank: 'Itaú SA',
          agency: '0075',
          account: '149565',
          value: 10000
        },
        {
          id: Math.random() * Date.now(),
          bank: 'Santander SA',
          agency: '006008',
          account: '1235475',
          value: 5500
        },
        {
          id: Math.random() * Date.now(),
          bank: 'Banco do Brasil SA',
          agency: '1020',
          account: '65485',
          value: 6320
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
      console.log('oi')
    },
    handleCreate () {
      this.setRenegociationForm(null)
      this.$router.push({ name: 'bank-accounts.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'bank-accounts.edit' })
    },
    handleDelete (id) {
      Notify.confirm('oi')
        .then(val => console.log(val))
    }
  }
}
</script>
