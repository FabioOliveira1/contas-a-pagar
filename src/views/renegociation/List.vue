<template>
  <section>
    <!-- Filter -->
    <v-card>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para buscar renegociações</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>
            <v-flex sm12 md6 lg4>
              <v-text-field v-model="filters.name" label="Nome do fornecedor" clearable/>
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="filters.cnpj"
                label="CNPJ do fornecedor"
                mask="##.###.###/####-##"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select
                v-model="filters.status"
                :items="options.status"
                item-value="id"
                item-text="nome"
                label="Status"
              />
            </v-flex>

            <v-flex sm12 md6>
              <m2-date-range v-model="filters.createdRange" label="Data de emissão"/>
            </v-flex>

            <v-flex sm12 md6>
              <m2-date-range v-model="filters.answeredRange" label="Data de resposta"/>
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
          <v-data-table class="w-100" :headers="headers" :items="records" item-key="Rng_idProposta">
            <template v-slot:items="props">
              <tr class="pointer" @click="props.expanded = !props.expanded">
                <td>{{ props.item.supplierName }}</td>
                <td>{{ props.item.contactName }}</td>
                <td>{{ props.item.accountsPayable }}</td>
                <td>{{ props.item.created_at | dateFormat }}</td>
                <td>{{ props.item.Rng_Status }}</td>
                <td>
                  <v-btn small icon color="error" @click.prevent="handleDelete(props.item.Rng_idProposta)">
                    <span class="fa fa-times"></span>
                  </v-btn>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat class="expand__content">
                <v-card-title><b>Outras informações </b></v-card-title>
                <v-card-text><b>Valor atual:</b>{{ props.item.Rng_valAntigo }}</v-card-text>
                <v-card-text><b>Vencimento atual:</b>{{ props.item.Rng_vencAntigo | dateFormat }}</v-card-text>
                <v-card-text><b>Valor proposto:</b>{{ props.item.Rng_valProposta }}</v-card-text>
                <v-card-text><b>Vencimento proposto:</b>{{ props.item.Rng_vencProposta | dateFormat }}</v-card-text>
                <v-card-text><b>Mensagem:</b>{{ props.item.Rng_descrProposta }}</v-card-text>
              </v-card>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
  </section>
</template>

<script>
import { getAllRenegociation, deleteRenegociation } from '@/services'
import { mapMutations } from 'vuex'
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
          text: 'Fornecedor',
          align: 'left',
          sortable: false,
          value: 'supplierName'
        },
        {
          text: 'Contato',
          sortable: false,
          value: 'contactName'
        },
        {
          text: 'Conta a pagar',
          sortable: false,
          value: 'accountsPayable'
        },
        {
          text: 'Criado em',
          sortable: false,
          value: 'created_at'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'Rng_Status'
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
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    doFilter () {
      this.loading = false

      getAllRenegociation()
        .then(({ data }) => {
          console.log(data)
          this.records = data.map(r => {
            r.contactName = r.contact.Cnt_nomeContato
            r.contactEmail = r.contact.Cnt_emailContato
            r.supplierName = r.contact.supplier.Forn_NomeFantasia
            r.accountsPayable = r.bill.Cta_descrConta
            return r
          })
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'renegociation', value: null })
      this.$router.push({ name: 'renegociation.create' })
    },
    handleEdit (id) {
      this.setFormReference({field: 'renegociation', value: id })
      this.$router.push({ name: 'renegociation.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteRenegociation(id)
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
