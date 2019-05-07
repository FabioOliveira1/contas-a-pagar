<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de conta a pagar</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md6>
              <v-text-field v-model="record.description"
                label="Descrição"
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-combobox v-model="groupCombo"
                :rules="[v => !!v && v.id || 'Selecione um grupo ']"
                :items="options.groups"
                item-text="name"
                label="Grupo de contas"
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-combobox v-model="supplierCombo"
                :rules="[v => !!v && v.id || 'Selecione um fornecedor']"
                :items="options.suppliers"
                item-text="name"
                label="Fornecedores"
              />
            </v-flex>

            <v-flex sm6 md3>
              <v-text-field v-model="record.fee"
                label="Multa"
              />
            </v-flex>

            <v-flex sm6 md3>
              <v-text-field v-model="record.increase"
                label="Juros"
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-text-field v-model="record.value"
                label="Valor original"
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.protestTime"
                label="Tempo de protesto"
              />
            </v-flex>

            <v-flex sm12 md3>
              <v-text-field v-model="record.protestValue"
                label="Valor do protesto"
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <m2-date-picker v-model="record.emitedAt"
                label="Data de emissão"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex sm12 md6 lg6>
              <m2-date-picker v-model="record.dueDateAt"
                label="Data de vencimento"
                :rules="[v => !!v || 'Campo obrigatório']"
              />
            </v-flex>

            <v-flex xs12 sm8>
              <v-text-field v-model="record.barcode"
                type="number"
                :rules="[v => !!v || 'Campo obrigatório']"
                label="Código de barras"
                clearable
              />
            </v-flex>

            <v-flex xs12 sm4>
              <v-text-field v-model="record.ourNumber"
                type="number"
                :rules="[v => !!v || 'Campo obrigatório']"
                label="Nosso número"
                clearable
              />
            </v-flex>

            <v-flex sm12 class="m-t-5">
              <m2-multi-file-input v-model="record.files" label="Anexos" />
            </v-flex>

          </v-layout>

          <v-layout class="m-t-10">
            <v-btn dark @click.prevent="$router.go(-1)">
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
