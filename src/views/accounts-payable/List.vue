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

            <v-flex sm12 md6 lg5>
              <v-text-field v-model="filters.Cta_descrConta"
                label="Descrição da conta"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg3>
              <v-select v-model="filters.Cta_Status"
                :items="billStatus"
                label="Status"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="filters.Cta_idFornecedor"
                :items="suppliers"
                item-value="id"
                item-text="name"
                label="Fornecedor"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="filters.Cta_idGrupo"
                :items="groups"
                item-value="id"
                item-text="name"
                label="Grupo de contas"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6>
              <m2-date-range v-model="filters.Cta_dataVencimento"
                label="Data de vencimento"
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
          <v-data-table class="w-100" :loading="loading" :headers="headers" :items="records" item-key="Cta_idConta">
            <template v-slot:items="props">
              <tr class="pointer" @click="props.expanded = !props.expanded">
                <td>{{ props.item.Cta_descrConta }}</td>
                <td>{{ props.item.supplierName }}</td>
                <td>{{ props.item.accountsGroupName }}</td>
                <td>{{ props.item.Cta_valConta | currency }}</td>
                <td>{{ props.item.Cta_dataVencimento | dateFormat}}</td>
                <td>{{ props.item.Cta_Status }}</td>
                <td>
                  <v-layout>
                  <v-btn alt="Adicionar anexos" class="m-5" small icon color="primary" @click.prevent.stop="handleAttachments(props.item)">
                    <span class="fa fa-file-text"></span>
                  </v-btn>
                  <v-btn alt="Editar conta" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit(props.item.Cta_idConta)">
                    <span class="fa fa-pencil"></span>
                  </v-btn>
                  <v-btn alt="Remover conta" class="m-5" small icon color="error" @click.prevent.stop="handleDelete(props.item.Cta_idConta)">
                    <span class="fa fa-times"></span>
                  </v-btn>
                  </v-layout>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat class="expand__content">
                <v-card-title><b>Outras informações </b></v-card-title>
                <v-card-text><b>Nosso número:</b> {{ props.item.Cta_numConta }} </v-card-text>
                <v-card-text><b>Emitido em:</b> {{ props.item.Cta_dataEmissao | dateFormat }} </v-card-text>
                <v-card-text><b>Paga em:</b> {{ props.item.Cta_dataPagto | dateFormat }} </v-card-text>
                <v-card-text><b>Finalizada em:</b> {{ props.item.Cta_dataBaixa | dateFormat }} </v-card-text>
                <v-card-text><b>Código de barras:</b> {{ props.item.Cta_codBarra }} </v-card-text>
                <v-card-text><b>Valor pago:</b> {{ props.item.Cta_totalConta | currency }} </v-card-text>
                <v-card-text><b>Tempo para protesto:</b> {{ props.item.Cta_tempoProtesto }}</v-card-text>
                <v-card-text><b>Valor de protesto:</b> {{ props.item.Cta_valProtesto | currency }}</v-card-text>
                <v-card-text><b>Multa:</b> {{ props.item.Cta_Multa | percentage }} </v-card-text>
                <v-card-text><b>Juros:</b> {{ props.item.Cta_Juros | percentage }} </v-card-text>
              </v-card>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
    <AddFiles :reference="reference" @close="reference = null" />

  </section>
</template>

<script>
import { getAllAccountsPayable, getAllSupplier, getAllAccountsGroup, deleteAccountsPayable } from '@/services'
import { mapMutations, mapState } from 'vuex'
import Notify from '@/utils/notify'
import AddFiles from '@/views/accounts-payable/modals/AddFiles'

export default {
  components: { AddFiles },
  data () {
    return {
      loading: false,
      reference: null,
      filters: {
        Cta_descrConta: null,
        Cta_Status: null,
        Cta_idFornecedor: null,
        Cta_idGrupo: null,
        Cta_dataVencimento: {
          from: null,
          to: null
        }
      },
      headers: [
        {
          text: 'Descrição',
          align: 'left',
          sortable: false,
          value: 'Cta_descrConta'
        },
        {
          text: 'Fornecedor',
          sortable: false,
          value: 'supplierName'
        },
        {
          text: 'Grupo de contas',
          sortable: false,
          value: 'accountsGroupName'
        },
        {
          text: 'Valor a pagar',
          sortable: false,
          value: 'Cta_valConta'
        },
        {
          text: 'Vencimento em',
          sortable: false,
          value: 'Cta_dataVencimento'
        },
        {
          text: 'Status',
          sortable: false,
          value: 'Cta_Status'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      suppliers: [],
      groups: [],
      records: []
    }
  },
  created() {
    this.doFilter()
    this.getOptions()
  },
  computed: {
    ...mapState(['billStatus'])
  },
  methods: {
    ...mapMutations({ setFormReference: 'SET_FORM_REFERENCE' }),
    getOptions () {
      getAllSupplier()
        .then(({ data }) => {
          this.suppliers = data.map(d => ({ id: d.Forn_idFornecedor, name: d.Forn_NomeFantasia }))
        })
      getAllAccountsGroup()
        .then(({ data }) => {
          this.groups = data.map(d => ({ id: d.GrCt_idGrupo, name: d.GrCt_NomeGrupo }))
        })
    },
    doFilter () {
      this.loading = false

      getAllAccountsPayable(this.filters)
        .then(({ data }) => {
          this.records = data.map(r => {
            r.supplierName = r.supplier.Forn_NomeFantasia
            r.accountsGroupName = r.bills_group.GrCt_NomeGrupo
            return r
          })
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleCreate () {
      this.setFormReference({field: 'accountsPayable', value: null })
      this.$router.push({ name: 'accounts-payable.create' })
    },
    handleAttachments (item) {
      this.reference = { id: item.Cta_idConta, name: item.Cta_descrConta}
    },
    handleEdit (id) {
      this.setFormReference({field: 'accountsPayable', value: id })
      this.$router.push({ name: 'accounts-payable.edit' })
    },
    handleDelete (id) {
      Notify.confirm('Essa é uma ação irreversível')
        .then(response => {
          if (response.value) {
            deleteAccountsPayable(id)
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
