<template>
  <section>
    <!-- Form -->
    <v-card flex>
      <v-card-title>
        <h1 class="f-size-20 w-100">Novo</h1>
        <p>Formulário para criar uma renegociação</p>
      </v-card-title>
      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>
            <v-flex sm12 md6 lg4>
              <v-combobox
                v-model="supplierCombo"
                :items="options.suppliers"
                item-text="name"
                label="Fornecedores"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-combobox
                v-model="contactCombo"
                :items="options.contacts"
                item-text="name"
                label="Contato"
              />
            </v-flex>

            <v-flex sm12 md6 lg4>
              <v-combobox
                v-model="accountCombo"
                :items="options.accounts"
                item-text="name"
                label="Contas"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="accountCombo.emitedAt"
                disabled
                label="Data de emissão"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="accountCombo.dueDateAt"
                disabled
                label="Data de vencimento"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="accountCombo.value"
                disabled
                label="Valor original"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="accountCombo.fee"
                disabled
                label="Multa"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="accountCombo.interest"
                disabled
                label="Juros"
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <m2-date-picker label="Data de vencimento proposta" v-model="record.newDate" />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                type="number"
                v-model="record.newValue"
                label="Valor proposto"
                clearable
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-text-field
                v-model="record.subject"
                label="Assunto"
                clearable
              />
            </v-flex>
            <v-flex sm12 md6 lg4>
              <v-textarea
                v-model="record.message"
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
