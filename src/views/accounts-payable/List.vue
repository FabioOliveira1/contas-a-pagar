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

            <v-flex sm12 md6 lg5>
              <v-text-field v-model="filters.description"
                label="Descrição da conta"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg3>
              <v-select v-model="filters.status"
                :items="options.status"
                item-value="id"
                item-text="nome"
                label="Status"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-combobox v-model="filters.supplier"
                :items="options.supplier"
                item-value="id"
                item-text="nome"
                label="Fornecedor"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-combobox v-model="filters.group"
                :items="options.group"
                item-value="id"
                item-text="nome"
                label="Grupo de contas"
              />
            </v-flex>

            <v-flex sm12 md6>
              <m2-date-range v-model="filters.createdRange"
                label="Data de vencimento"
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
              <tr class="pointer" @click="props.expanded = !props.expanded">
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.supplier }}</td>
                <td>{{ props.item.group }}</td>
                <td>{{ props.item.value }}</td>
                <td>{{ props.item.dueDateAt }}</td>
                <td>{{ props.item.status }}</td>
                <td>
                  <v-layout>
                  <v-btn alt="Adicionar anexos" class="m-5" small icon color="primary" @click.prevent.stop="reference = 'thisId'">
                    <span class="fa fa-file-text"></span>
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
            <template v-slot:expand="props">
              <v-card flat class="expand__content">
                <v-card-title><b>Outras informações </b></v-card-title>
                <v-card-text><b>Emitido em:</b> {{ props.item.emitedAt }} </v-card-text>
                <v-card-text><b>Paga em:</b> {{ props.item.paidAt }} </v-card-text>
                <v-card-text><b>Finalizada em:</b> {{ props.item.endedAt }} </v-card-text>
                <v-card-text><b>Código de barras:</b> {{ props.item.barcode }} </v-card-text>
                <v-card-text><b>Valor pago:</b> {{ props.item.totalValue }} </v-card-text>
                <v-card-text><b>Tempo para protesto:</b> {{ props.item.protestTime }}.</v-card-text>
                <v-card-text><b>Valor de protesto:</b> {{ props.item.protestValue }}.</v-card-text>
                <v-card-text><b>Multa:</b> {{ props.item.fee }} </v-card-text>
                <v-card-text><b>Juros:</b> {{ props.item.increase }} </v-card-text>
              </v-card>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
    <AddFiles v-if="reference" @close="reference = null" />

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Notify from '@/utils/notify'
import AddFiles from '@/views/accounts-payable/modals/AddFiles'

export default {
  components: { AddFiles },
  data () {
    return {
      reference: null,
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
          value: 'group'
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
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: [
        {
          id: Math.random() * Date.now(),
          description: 'Chapas de impressão personalizadas',
          supplier: 'Papeis Silva',
          group: 'Insumos',
          value: 1500,
          dueDateAt: '2019-03-22 15:30:32',
          status: 'Aberta',
          emitedAt: '2019-03-22 15:30:32',
          paidAt: '2019-03-22 15:30:32',
          endedAt: '2019-03-22 15:30:32',
          barcode: '858900000000549003281900510708190234631332961557',
          totalValue: 1650, // Após pagamento
          protestTime: 6, // Em dias
          protestValue: 350, // Valor para retirar o protesto
          fee: 0.1, // Porcentagem direta
          increase: 0.01 // Porcentagem ao dia
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
      this.$router.push({ name: 'accounts-payable.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'accounts-payable.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(val => console.log(val))
    }
  }
}
</script>
