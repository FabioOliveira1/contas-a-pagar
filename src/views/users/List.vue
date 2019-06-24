<template>
  <section>
    <!-- Filter -->
    <v-card v-if="auth.role !== 'Analista'">
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md6>
              <v-text-field v-model="filters.search"
                label="Nome ou email do usuário"
                clearable
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="filters.User_matricula"
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
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="User_idUsuario">
            <template v-slot:items="props">
              <tr :class="auth.email === props.item.User_email ? 'blue lighten-4' : ''">
                <td>{{ props.item.User_matricula }}</td>
                <td>{{ props.item.User_nivelAcesso }}</td>
                <td>{{ props.item.User_nome }}</td>
                <td>{{ props.item.User_email }}</td>
                <td>
                  <v-layout>
                    <v-btn alt="Editar conta" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit(props.item.User_idUsuario)">
                      <span class="fa fa-pencil"></span>
                    </v-btn>
                    <v-btn v-if="auth.email !== props.item.User_email" alt="Remover conta" class="m-5" small icon color="error" @click.prevent.stop="handleDelete(props.item.User_idUsuario)">
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
import { mapMutations, mapState } from 'vuex'
import Notify from '@/utils/notify'
import { getAllUser, deleteUser } from '@/services'

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
          value: 'User_matricula'
        },
        {
          text: 'Nível de acesso',
          sortable: false,
          value: 'User_nivelAcesso'
        },
        {
          text: 'Nome',
          sortable: false,
          value: 'User_nome'
        },
        {
          text: 'E-mail',
          sortable: false,
          value: 'User_email'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: []
    }
  },
  created() {
    this.doFilter()
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    doFilter () {
      this.loading = false

      getAllUser()
        .then(({ data }) => {
          this.records = [...data]
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'user', value: null })
      this.$router.push({ name: 'users.create' })
    },
    handleEdit (id) {
      this.setFormReference({field: 'user', value: id })
      this.$router.push({ name: 'users.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteUser(id)
              .then(() => {
                Notify.success('Registro removido')
                this.doFilter()
              })
              .catch(() => { Notify.error('Não foi possível remover o registro') })
          }
        })
    }
  }
}
</script>
