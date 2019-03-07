<template>
  <section>
    <!-- Form -->
    <v-card flex>
      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de renegociação</p>
      </v-card-title>
      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>
            <v-flex sm12 md6 lg4>
              <v-combobox v-model="supplierCombo"
                :rules="[v => !!v && v.id || 'Selecione um fornecedor']"
                :items="options.suppliers"
                item-text="name"
                label="Fornecedores"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-combobox v-model="contactCombo"
                :rules="[v => !!v && v.id || 'Selecione um contato']"
                :items="options.contacts"
                item-text="name"
                label="Contato"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-combobox v-model="accountCombo"
                :rules="[v => !!v && v.id || 'Selecione a conta para renegociar']"
                :items="options.accounts"
                item-text="name"
                label="Contas"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field v-model="accountCombo.value"
                label="Valor original"
                disabled
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field v-model="accountCombo.fee"
                label="Multa"
                disabled
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field v-model="accountCombo.interest"
                label="Juros"
                disabled
              />
            </v-flex>
            <v-flex sm12 md6 lg6>
              <v-text-field v-model="accountCombo.emitedAt"
                label="Data de emissão"
                disabled
              />
            </v-flex>
            <v-flex sm12 md6 lg6>
              <v-text-field v-model="accountCombo.dueDateAt"
                label="Data de vencimento"
                disabled
              />
            </v-flex>
            <v-flex sm12 md6 lg6>
              <m2-date-picker v-model="record.newDate"
                label="Data de vencimento proposta"
                :rules="[v => !!v || 'Proponha uma data de vencimento']"
              />
            </v-flex>
            <v-flex sm12 md6 lg6>
              <v-text-field v-model="record.newValue"
                type="number"
                :rules="[v => !!v || 'Proponha um novo valor a ser pago']"
                label="Valor proposto"
                clearable
              />
            </v-flex>
            <v-flex sm12>
              <v-text-field v-model="record.subject"
                :rules="[v => !!v || 'O assunto é obrigatório']"
                label="Assunto"
                clearable
              />
            </v-flex>
            <v-flex sm12>
              <v-textarea v-model="record.message"
                :rules="[v => !!v || 'A renegociação precisa ter mensagem']"
                label="Mensagem"
              />
            </v-flex>
          </v-layout>

          <v-layout class="m-t-10">
            <v-btn dark type="submit">
              <span class="f-bold m-r-10">Cancelar</span>
              <i class="fa fa-times"></i>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" dark type="submit">
              <span class="f-bold m-r-10">Salvar</span>
              <i class="fa fa-check"></i>
            </v-btn>
          </v-layout>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import { get, create, update } from '@/services/renegociation'
import { mapGetters } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'renegociação',
      loading: false,
      record: {
        id: null,
        supplierId: null,
        contactId: null,
        accountId: null,
        newValue: null,
        newDate: null,
        subject: null,
        message: null,
        status: null
      },
      accountCombo: {
        id: null,
        name: null,
        value: null,
        fee: null,
        interest: null,
        emitedAt: null,
        dueDateAt: null
      },
      supplierCombo: {
        id: null,
        name: null
      },
      contactCombo: {
        id: null,
        name: null
      },
      options: {
        suppliers: [],
        contacts: [],
        accounts: []
      }
    }
  },
  created () {
    if (this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
    }
  },
  computed: {
    ...mapGetters({
      currentId: 'getRenegociationForm'
    })
  },
  methods: {
    create: payload => create(payload),
    update: payload => update(payload),
    get: id => get(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
