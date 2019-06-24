<template>
  <section>

    <!-- Form -->
    <v-card flex>

      <v-card-title>
        <h1 class="f-size-20 w-100">{{ this.record.id ? 'Editar': 'Novo' }}</h1>
        <p>Formulário de usuários</p>
      </v-card-title>

      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-layout wrap>

            <v-flex sm12 md4>
              <v-select v-model="record.User_nivelAcesso"
                :rules="[v => !!v || 'Campo obrigatório']"
                :items="roles"
                label="Nível de acesso"
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.User_nome"
                :rules="[v => !!v || 'Digite um nome']"
                label="Nome"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.User_email"
              :rules="emailRules"
                label="E-mail"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.User_matricula"
                :rules="[v => !!v || 'Digite a matrícula']"
                label="Número de matrícula"
                type="number"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="record.User_senha"
                :rules="[v => !conf || v === conf  || 'Deve ser igual a confirmação de senha', v => !currentId && !!v || currentId || 'Campo obrigatório']"
                type="password"
                label="Senha"
                clearable
              />
            </v-flex>

            <v-flex sm12 md4>
              <v-text-field v-model="conf"
                :rules="[v => !record.User_senha || v === record.User_senha  || 'Deve ser igual a ao campo de senha', v => !currentId && !!v || currentId || 'Campo obrigatório']"
                
                type="password"
                label="Confirmação de senha"
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
import { getUser, createUser, updateUser } from '@/services'
import { mapGetters, mapState } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'usuário',
      loading: false,
      record: {
        id: null,
        User_email: null,
        User_matricula: null,
        User_nivelAcesso: null,
        User_nome: null,
        User_senha: null
      },
      conf: null,
      emailRules: [
        v => !!v || 'Campo Obrigatório',
        v => /.+@.+\.+./.test(v) || 'Não é uma email válido'
      ]
    }
  },
  created () {
    if (this.$route.name.includes('edit') && this.currentId) {
      this.record.id = this.currentId
      this.fetchRecord()
    }
    if (this.$route.name.includes('edit') && !this.currentId) {
      this.$router.push({ name: this.$route.name.replace('.edit', '')})
    }
  },
  computed: {
    ...mapState([ 'roles' ]),
    ...mapGetters(['getFormReference']),
    currentId () {
      return this.getFormReference('user')
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      this.get(this.record.id)
        .then(({ data }) => {
          this.record = { ...data, id: data.User_idUsuario }
        })
        .then(() => { this.loading = false })
    },
    create: payload => createUser(payload),
    update: payload => updateUser(payload),
    get: id => getUser(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
