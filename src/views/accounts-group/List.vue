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

    <!-- Pagination -->
    <v-pagination class="m-t-20" :length="10" v-model="page" />

    <!-- List -->
    <v-card class="m-t-10 f-size-16 list__item">
      <div class="list__item__actions">
        <v-btn small icon color="warning" @click.prevent="handleEdit('thisId')">
          <span class="fa fa-pencil"></span>
        </v-btn>
        <v-btn small icon color="error" @click.prevent="handleDelete('thisId')">
          <span class="fa fa-times"></span>
        </v-btn>
      </div>
      <v-layout wrap justify-start>
        <v-flex xs12 sm6>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-truck"></i> Nome</b><p>
            <p class="m-l-10 m-t-10"> Boleto</p>
          </v-card-text>
        </v-flex>

        <v-flex xs12 sm2>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-user"></i> Risco</b><p>
            <p class="m-l-10 m-t-10"> Alto</p>
          </v-card-text>
        </v-flex>

        <v-flex xs12 sm4>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-calendar"></i> Criado em</b><p>
            <p class="m-l-10 m-t-10">10/03/2018</p>
          </v-card-text>
        </v-flex>

        <v-flex xs12>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-square-o"></i> Campos requeridos</b><p>
            <p class="m-l-10 m-t-10"> Valor, Campo 1, Campo 2, etc</p>
          </v-card-text>
        </v-flex>

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
      page: 1
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
