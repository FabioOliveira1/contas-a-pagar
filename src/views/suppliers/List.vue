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
              <v-text-field v-model="filters.name"
                label="Nome do fornecedor"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-text-field v-model="filters.cnpj"
                label="CNPJ do fornecedor"
                mask="##.###.###/####-##"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-select v-model="filters.risk"
                :items="options.risk"
                item-value="id"
                item-text="nome"
                label="Risco"
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
              <tr class="pointer" @click="props.expanded = !props.expanded">
                <td>{{ props.item.fantasyName }}</td>
                <td>{{ props.item.cnpj }}</td>
                <td>{{ props.item.companyName }}</td>
                <td>{{ props.item.risk }}</td>
                <td>
                  <v-layout >
                  <v-btn alt="Adicionar contatos" class="m-5" small icon color="primary" @click.prevent.stop="reference = 'thisId'">
                    <span class="fa fa-phone"></span>
                  </v-btn>
                  <v-btn alt="Editar fornecedor" class="m-5" small icon color="warning" @click.prevent.stop="handleEdit('thisId')">
                    <span class="fa fa-pencil"></span>
                  </v-btn>
                  <v-btn alt="Remover fornecedor" class="m-5" small icon color="error" @click.prevent.stop="handleDelete('thisId')">
                    <span class="fa fa-times"></span>
                  </v-btn>
                  </v-layout>
                </td>
              </tr>
            </template>
            <template v-slot:expand="props">
              <v-card flat class="expand__content">
                <v-card-title><b>Outras informações </b></v-card-title>
                <v-card-text><b>Inscrição Estadual:</b> {{ props.item.stateNumber }} </v-card-text>
                <v-card-text><b>CEP:</b> {{ props.item.cep }} </v-card-text>
                <v-card-text><b>Logradouro:</b> {{ props.item.address }} </v-card-text>
                <v-card-text><b>Bairro:</b> {{ props.item.neighborhood }} </v-card-text>
                <v-card-text><b>Cidade:</b> {{ props.item.city }} </v-card-text>
                <v-card-text><b>Estado:</b> {{ props.item.state }}</v-card-text>
                <v-card-text><b>Banco:</b> {{ props.item.bank }}</v-card-text>
                <v-card-text><b>Agência:</b> {{ props.item.agency }} </v-card-text>
                <v-card-text><b>Conta corrente:</b> {{ props.item.bankAccount }} </v-card-text>
              </v-card>
            </template>
          </v-data-table>
      </v-layout>
    </v-card>
    <AddContacts v-if="reference" @close="reference = null" />

  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Notify from '@/utils/notify'
import AddContacts from '@/views/suppliers/modals/AddContacts'

export default {
  components: { AddContacts },
  data () {
    return {
      reference: null,
      filters: {
        risk: null,
        name: null,
        cnpj: null
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
          value: 'fantasyName'
        },
        {
          text: 'CNPJ',
          sortable: false,
          value: 'cnpj'
        },
        {
          text: 'Razão Social',
          sortable: false,
          value: 'companyName'
        },
        {
          text: 'Risco',
          sortable: false,
          value: 'risk'
        },
        {
          text: 'Ações',
          sortable: false
        }
      ],
      records: [
        {
          id: Math.random() * Date.now(),
          fantasyName: 'Papéis Silva',
          companyName: 'José Magno da Silva ME',
          cnpj: '23199252000115',
          risk: 'Alto',
          stateNumber: '123123123123',
          cep: '18078470',
          address: 'R. Genésio Machado, 24',
          neighborhood: 'Vila Alberta',
          city: 'Sorocaba',
          state: 'SP',
          bank: 'Itau SA',
          agency: '1650',
          bankAccount: '123456'
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
      this.$router.push({ name: 'suppliers.create' })
    },
    handleEdit (id) {
      this.setRenegociationForm(id)
      this.$router.push({ name: 'suppliers.edit' })
    },
    handleDelete (id) {
      Notify.confirm('oi')
        .then(val => console.log(val))
    }
  }
}
</script>
