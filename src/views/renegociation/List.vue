<template>
  <section>
    <!-- Filter -->
    <v-card>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para buscar renegociações</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>
            <v-flex sm12 md6 lg4>
              <v-text-field v-model="filters.name" label="Nome do fornecedor" clearable/>
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="filters.cnpj"
                label="CNPJ do fornecedor"
                mask="##.###.###/####-##"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select
                v-model="filters.status"
                :items="options.status"
                item-value="id"
                item-text="nome"
                label="Status"
              />
            </v-flex>

            <v-flex sm12 md6>
              <m2-date-range v-model="filters.createdRange" label="Data de emissão"/>
            </v-flex>

            <v-flex sm12 md6>
              <m2-date-range v-model="filters.answeredRange" label="Data de resposta"/>
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
          <v-data-table class="w-100" :headers="headers" :items="desserts" item-key="id">
            <template v-slot:items="props">
              <tr class="pointer" @click="props.expanded = !props.expanded">
                <td>{{ props.item.supplier }}</td>
                <td>{{ props.item.contact }}</td>
                <td>{{ props.item.accountsPayable }}</td>
                <td>{{ props.item.createdAt }}</td>
                <td>{{ props.item.status }}</td>
                <td>
                  <v-btn small icon color="error" @click.prevent="handleDelete('thisId')">
                    <span class="fa fa-times"></span>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat class="expand__content">
                <v-card-title><b>Outras informações </b></v-card-title>
                <v-card-text><b>Valor atual:</b> R$ 1000,00</v-card-text>
                <v-card-text><b>Vencimento atual:</b> 15/03/2019</v-card-text>
                <v-card-text><b>Valor proposto:</b> R$ 1200,00</v-card-text>
                <v-card-text><b>Vencimento proposto:</b> 30/03/2019</v-card-text>
                <v-card-text><b>Assunto:</b> Adiamento de pagamento</v-card-text>
                <v-card-text><b>Mensagem:</b> Bom dia, em função de mudanças recentes, precisamos de mais tempo para conseguir pagar a obrigação xyz.</v-card-text>
              </v-card>
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
        status: []
      },
      page: 1,
      headers: [
        {
          text: 'Fornecedor',
          align: 'left',
          sortable: false,
          value: 'supplier'
        },
        {
          text: 'Contato',
          sortable: false,
          value: 'contact'
        },
        {
          text: 'Conta a pagar',
          sortable: false,
          value: 'accountsPayable'
        },
        {
          text: 'Criado em',
          sortable: false,
          value: 'createdAt'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'status'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      desserts: [
        {
          id: '4ad2fa42fa4af2af2443f4',
          supplier: 'Papeis Silva',
          contact: 'fulano@silvapapeis.com',
          accountsPayable: 'Chapas de impressão personalizadas',
          createdAt: '2019-03-22 15:30:32',
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
      console.log('oi')
    },
    handleCreate () {
      this.setRenegociationForm(null)
      this.$router.push({ name: 'renegociation.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'renegociation.edit' })
    },
    handleDelete (id) {
      Notify.confirm('oi').then(val => console.log(val))
    }
  }
}
</script>
