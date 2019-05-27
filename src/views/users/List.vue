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

            <v-flex sm12 md6>
              <v-text-field v-model="filters.name"
                label="Nome ou email do usuário"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="filters.workNumber"
                label="Número de Matrícula"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-select v-model="filters.role"
                :items="options.roles"
                item-value="id"
                item-text="name"
                label="Nível de acesso"
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
                <td>{{ props.item.workNumber }}</td>
                <td>{{ props.item.accessLevel }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.email }}</td>
                <td>
                  <v-layout>
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
      headers: [
        {
          text: 'Matrícula',
          align: 'left',
          sortable: false,
          value: 'workNumber'
        },
        {
          text: 'Nível de acesso',
          sortable: false,
          value: 'accessLevel'
        },
        {
          text: 'Nome',
          sortable: false,
          value: 'name'
        },
        {
          text: 'E-mail',
          sortable: false,
          value: 'email'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: [
        {
          id: Math.random() * Date.now(),
          workNumber: '021324',
          accessLevel: 'Admin',
          name: 'Marco da Silva Sauro',
          email: 'marco.sauro@m2print.com'
        },
        {
          id: Math.random() * Date.now(),
          workNumber: '6646542',
          accessLevel: 'Gerente',
          name: 'Adilson Ferreira dos Santos',
          email: 'adilson.santos@m2print.com'
        },
        {
          id: Math.random() * Date.now(),
          workNumber: '895413',
          accessLevel: 'Analista',
          name: 'Bruno Araújo Hoyama',
          email: 'bruno.hoyama@m2print.com'
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
      this.$router.push({ name: 'users.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'users.edit' })
    },
    handleDelete (id) {
      Notify.confirm('oi')
        .then(val => console.log(val))
    }
  }
}
</script>
