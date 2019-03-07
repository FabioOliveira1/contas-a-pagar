<template>
  <section>
    <!-- Filter -->
    <v-card flex>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados escolares</p>
      </v-card-title>
      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="filters.name"
                label="Nome do fornecedor"
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="filters.cnpj"
                label="CNPJ do fornecedor"
                mask="##.###.###/####-##"
                clearable
              ></v-text-field>
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-select
                v-model="filters.status"
                :items="options.status"
                item-value="id"
                item-text="nome"
                label="Status"
              ></v-select>
            </v-flex>
            <v-flex sm12 md6>
              <m2-date-range label="Data de emissão" v-model="filters.createdRange"></m2-date-range>
            </v-flex>
            <v-flex sm12 md6>
              <m2-date-range label="Data de resposta" v-model="filters.answeredRange"></m2-date-range>
            </v-flex>
          </v-layout>

          <div class="m-t-10 text-right w-100">
            <v-btn color="success" class="m-r-20 white--text" dark :to="{ name: 'renegociation.create' }">
              <span class="f-bold m-r-10">Novo</span>
              <i class="fa fa-plus"></i>
            </v-btn>
            <v-btn color="#004973" dark type="submit">
              <span class="f-bold m-r-10">Filtrar</span>
              <i class="fa fa-search"></i>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
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
      }
    }
  },
  methods: {
    doFilter () {
      console.log('oi')
    }
  }
}
</script>
