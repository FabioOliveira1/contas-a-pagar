<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de grupo de contas</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md6>
              <v-text-field v-model="record.name"
                :rules="[v => !!v || 'Digite um nome']"
                label="Nome"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-select v-model="record.riskType"
                :rules="[v => !!v || 'O tipo de risco é obrigatório']"
                :items="options.risks"
                item-text="name"
                item-value="id"
                label="Tipo de risco"
              />
            </v-flex>

            <v-flex sm12>
              <v-select
                v-model="record.requireds"
                :items="[{ id: 1, name: 'Juros' },{ id: 2, name: 'Multa' }]"
                :rules="[v => v && v.length || 'Campo obrigatório']"
                item-text="name"
                item-value="id"
                attach
                chips
                label="Requeridos"
                multiple
              />
            </v-flex>

            <v-flex sm12>
              <v-textarea v-model="record.description"
                :rules="[v => !!v || 'A descrição é obrigatória']"
                label="Descrição"
                clearable
              />
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
        requireds: [],
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
