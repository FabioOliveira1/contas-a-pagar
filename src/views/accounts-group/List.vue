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
                :items="risks"
                item-value="id"
                item-text="name"
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
          <v-data-table class="w-100" :loading="loading" :headers="headers" :items="records" item-key="id">
            <template v-slot:items="props">
              <tr>
                <td>{{ props.item.GrCt_NomeGrupo }}</td>
                <td>{{ props.item.GrCt_DescrGrupo }}</td>
                <td>{{ risks.find( r => r.id === props.item.GrCt_idRisco).name }}</td>
                <td>
                  <v-chip color="primary" class="white--text" v-for="(r, i) in props.item.requireds" :key="i">
                    {{ requireds.find( req => req.id === r).name }}
                  </v-chip>
                </td>
                <td>
                  <v-layout>
                    <v-btn alt="Editar grupo" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit(props.item.GrCt_idGrupo)">
                      <span class="fa fa-pencil"></span>
                    </v-btn>
                    <v-btn alt="Remover grupo" class="m-5" small icon color="error" @click.prevent.stop="handleDelete(props.item.GrCt_idGrupo)">
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
import { getAllAccountsGroup, deleteAccountsGroup } from '@/services'
import { mapMutations, mapState } from 'vuex'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
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
      headers: [
        {
          text: 'Nome',
          align: 'left',
          value: 'GrCt_NomeGrupo'
        },
        {
          text: 'Descrição',
          sortable: false,
          value: 'GrCt_DescrGrupo'
        },
        {
          text: 'Risco',
          sortable: false,
          value: 'GrCt_idRisco'
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
      records: []
    }
  },
  created() {
    this.doFilter()
  },
  computed: {
    ...mapState([ 'risks', 'requireds' ])
  },
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    doFilter () {
      this.loading = false

      getAllAccountsGroup()
        .then(({ data }) => {
          this.records = data.map(r => {
            r.requireds = r.requireds.map(i => i.Rq_idRequeridos)
            return r
          })
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'accountsGroup', value: null })
      this.$router.push({ name: 'accounts-group.create' })
    },
    handleEdit (id) {
      this.setFormReference({field: 'accountsGroup', value: id })
      this.$router.push({ name: 'accounts-group.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteAccountsGroup(id)
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
