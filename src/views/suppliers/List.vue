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

            <v-flex sm12 md6 lg4>
              <v-text-field v-model="filters.Forn_NomeFantasia"
                label="Nome do fornecedor"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-text-field v-model="filters.Forn_CNPJ"
                label="CNPJ do fornecedor"
                mask="##.###.###/####-##"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="filters.Forn_idRisco"
                :items="risks"
                item-value="id"
                item-text="name"
                label="Risco"
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

    <!-- List -->
    <v-card class="m-t-10 f-size-16 list__item">
      <v-layout wrap>
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="Forn_idFornecedor">
            <template v-slot:items="props">
              <tr class="pointer" @click="props.expanded = !props.expanded">
                <td>{{ props.item.Forn_NomeFantasia }}</td>
                <td>{{ props.item.Forn_CNPJ }}</td>
                <td>{{ props.item.Forn_RazaoSocial }}</td>
                <td>{{ props.item.Forn_idRisco }}</td>
                <td>
                  <v-layout>
                  <v-btn alt="Adicionar contatos" class="m-5" small icon color="primary" @click.prevent.stop="handleContacts(props.item)">
                    <span class="fa fa-phone"></span>
                  </v-btn>
                  <v-btn alt="Editar fornecedor" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit(props.item.Forn_idFornecedor)">
                    <span class="fa fa-pencil"></span>
                  </v-btn>
                  <v-btn alt="Remover fornecedor" class="m-5" small icon color="error" @click.prevent.stop="handleDelete(props.item.Forn_idFornecedor)">
                    <span class="fa fa-times"></span>
                  </v-btn>
                  </v-layout>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat class="expand__content">
                <v-card-title><b>Outras informações </b></v-card-title>
                <v-card-text><b>Inscrição Estadual:</b> {{ props.item.Forn_InscrEstadual }} </v-card-text>
                <v-card-text><b>CEP:</b> {{ props.item.Forn_CEP }} </v-card-text>
                <v-card-text><b>Logradouro:</b> {{ props.item.Forn_Endereco }} </v-card-text>
                <v-card-text><b>Bairro:</b> {{ props.item.Forn_Bairro }} </v-card-text>
                <v-card-text><b>Cidade:</b> {{ props.item.Forn_Cidade }} </v-card-text>
                <v-card-text><b>Estado:</b> {{ props.item.Forn_UF }}</v-card-text>
                <v-card-text><b>Banco:</b> {{ props.item.Forn_Banco }}</v-card-text>
                <v-card-text><b>Agência:</b> {{ props.item.Forn_Agencia }} </v-card-text>
                <v-card-text><b>Conta corrente:</b> {{ props.item.Forn_ContaBancaria }} </v-card-text>
              </v-card>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
    <AddContacts v-if="reference" :reference="reference" @close="reference = null" />

  </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import Notify from '@/utils/notify'
import { getAllSupplier, deleteSupplier } from '@/services'
import AddContacts from '@/views/suppliers/modals/AddContacts'

export default {
  components: { AddContacts },
  data () {
    return {
      reference: null,
      filters: {
        Forn_idRisco: null,
        Forn_NomeFantasia: null,
        Forn_CNPJ: null
      },
      page: 1,
      headers: [
        {
          text: 'Fornecedor',
          align: 'left',
          sortable: false,
          value: 'Forn_NomeFantasia'
        },
        {
          text: 'CNPJ',
          sortable: false,
          value: 'Forn_CNPJ'
        },
        {
          text: 'Razão Social',
          sortable: false,
          value: 'Forn_RazaoSocial'
        },
        {
          text: 'Risco',
          sortable: false,
          value: 'Forn_idRisco'
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
    ...mapState(['risks'])
  },
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    doFilter () {
      this.loading = false

      getAllSupplier(this.filters)
        .then(({ data }) => {
          this.records = [...data]
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'supplier', value: null })
      this.$router.push({ name: 'suppliers.create' })
    },
    handleContacts (item) {
      this.reference = { id: item.Forn_idFornecedor, name: item.Forn_NomeFantasia}
    },
    handleEdit (id) {
      this.setFormReference({field: 'supplier', value: id })
      this.$router.push({ name: 'suppliers.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteSupplier(id)
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