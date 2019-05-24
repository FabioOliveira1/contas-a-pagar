<template>
  <section>
    <!-- Filter -->
    <v-card>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="generateReport" ref="form">
          <v-layout wrap>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.type"
                :items="types"
                item-value="id"
                item-text="name"
                label="Tipo de relatório"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm6 md4>
              <v-select v-model="filters.orderBy"
                :items="fields"
                item-value="id"
                item-text="name"
                label="Ordenar por"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm4 md4>
              <v-select v-model="filters.orderDirection"
                :items="directions"
                item-value="id"
                item-text="name"
                label="Sentido"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm8 md6>
              <m2-date-range v-model="filters.dateRange" label="Período" :rules="[v => !!v || 'Campo obrigatório']" />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-spacer></v-spacer>
            <v-btn color="#004973" dark type="submit" :loading="loading">
              <span class="f-bold m-r-10">Gerar</span>
              <i class="fa fa-print"></i>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>

  </section>
</template>

<script>
import { generateReport } from '@/services'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      filters: {
        type: null,
        orderBy: 'value',
        orderDirection: 'asc',
        dateRange: {
          from: null,
          to: null
        }
      },
      types: [
        {
          id: 'supplier',
          name: 'Fornecedor'
        },
        {
          id: 'accounts-group',
          name: 'Grupo de contas'
        }
      ],
      fields: [
        {
          id: 'value',
          name: 'Valor'
        },
        {
          id: 'name',
          name: 'Nome'
        }
      ],
      directions: [
        {
          id: 'asc',
          name: 'Crescente'
        },
        {
          id: 'desc',
          name: 'Decrescente'
        }
      ]
    }
  },
  methods: {
    generateReport () {
      if (this.$refs.form.validate()) {
        console.log(this.filters)
        this.loading = true
        generateReport()
          .then(({ data }) => {
            let pdfViewer = window.open('')
            pdfViewer.document.write(`<html><head><title>Relatório por ${this.types.find(t => t.id === this.filters.type).name}</title></head><body style="padding: 0; margin: 0;">`)
            pdfViewer.document.write("<iframe style=\"min-width: 100vw; min-heigth: 100vh;\" width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(data.report) + "'></iframe>")
            pdfViewer.document.write('</body></html>')
          })
          .catch(() => { Notify.error('Não foi possível gerar o relatório') })
          .then(() => { this.loading = false })
      }
    }
  }
}
</script>
