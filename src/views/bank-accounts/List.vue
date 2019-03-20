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

            <v-flex sm12 md3>
              <v-select v-model="filters.bank"
                :items="options.banks"
                item-value="id"
                item-text="name"
                label="Bancos"
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-select v-model="filters.agency"
                :items="options.agencies"
                item-value="id"
                item-text="name"
                label="Agências"
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="filters.accountNumber"
                label="Número de conta corrente"
                clearable
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
      <v-layout wrap>

        <v-flex xs12 sm4 md2>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-barcode"></i> Banco</b><p>
            <p class="m-l-10 m-t-10"> Itaú SA</p>
          </v-card-text>
        </v-flex>

        <v-flex xs12 sm8 md5>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-house"></i> Agencia</b><p>
            <p class="m-l-10 m-t-10"> 2356</p>
          </v-card-text>
        </v-flex>

        <v-flex xs12 sm8 md5>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-credit-card"></i> Conta Bancária</b><p>
            <p class="m-l-10 m-t-10"> 12398-8</p>
          </v-card-text>
        </v-flex>

        <v-flex xs12 sm4 md2>
          <v-card-text class="text-center">
            <p><b><i class="fa fa-money"></i> Saldo</b><p>
            <p class="m-l-10 m-t-10"> R$ 5000,00</p>
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
