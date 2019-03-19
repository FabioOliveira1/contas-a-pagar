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

            <v-flex sm12 md4>
              <v-text-field v-model="record.workNumber"
                :rules="[v => !!v || 'Digite a matrícula']"
                label="Número de matrícula"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.name"
                :rules="[v => !!v || 'Digite um nome']"
                label="Nome"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.email"
                :rules="[v => !!v || 'Digite um email']"
                label="E-mail"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.password"
                :rules="[v => !!v || 'Digite uma senha']"
                type="password"
                label="Senha"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.passwordConfirmation"
                :rules="[v => !!v || 'Confirme a senha']"
                type="password"
                label="Confirmação de senha"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-select v-model="record.role"
                :rules="[v => !!v || 'É preciso selecionar um nível de acesso']"
                :items="options.roles"
                item-text="name"
                item-value="id"
                label="Nível de acesso"
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
