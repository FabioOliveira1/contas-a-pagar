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

            <v-flex xs12 sm8>
              <v-text-field v-model="filters.name"
                label="Nome do grupo"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm4>
              <v-select v-model="filters.risk"
                :items="options.risks"
                item-value="id"
                item-text="nome"
                label="Riscos"
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
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.risk }}</td>
                <td>
                  <v-chip color="primary" class="white--text" v-for="(r, i) in props.item.requireds" :key="i">{{ r }}</v-chip>
                </td>
                <td>
                  <v-layout >
                    <v-btn alt="Editar grupo" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit('thisId')">
                      <span class="fa fa-pencil"></span>
                    </v-btn>
                    <v-btn alt="Remover grupo" class="m-5" small icon color="error" @click.prevent.stop="handleDelete('thisId')">
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
          text: 'Nome',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Descrição',
          sortable: false,
          value: 'description'
        },
        {
          text: 'Risco',
          sortable: false,
          value: 'risk'
        },
        {
          text: 'Requeridos',
          sortable: false,
          value: 'requireds'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: [
        {
          id: Math.random() * Date.now(),
          name: 'Boleto',
          description: 'Toda a sorte de boletos que se encaixem no modelo xpto',
          risk: 'Médio',
          requireds: ['Juros', 'Multa', 'Tempo protesto', 'Valor protesto']
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
      this.$router.push({ name: 'accounts-group.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'accounts-group.edit' })
    },
    handleDelete (id) {
      Notify.confirm('oi')
        .then(val => console.log(val))
    }
  }
}
</script>
