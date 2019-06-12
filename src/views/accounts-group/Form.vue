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
              <v-text-field v-model="record.GrCt_NomeGrupo"
                :rules="[v => !!v || 'Digite um nome']"
                label="Nome"
                clearable
              />
            </v-flex>

            <v-flex sm12 md6>
              <v-select v-model="record.GrCt_idRisco"
                :rules="[v => !!v || 'O tipo de risco é obrigatório']"
                :items="risks"
                item-text="name"
                item-value="id"
                label="Tipo de risco"
              />
            </v-flex>

            <v-flex sm12>
              <v-select
                v-model="record.requireds"
                :items="requireds"
                :rules="[v => v && !!v.length || 'Campo obrigatório']"
                item-text="name"
                item-value="id"
                attach
                chips
                label="Requeridos"
                multiple
              />
            </v-flex>

            <v-flex sm12>
              <v-textarea v-model="record.GrCt_DescrGrupo"
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
import { getAccountsGroup, createAccountsGroup, updateAccountsGroup } from '@/services'
import { mapState, mapGetters } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'grupo de contas',
      loading: false,
      record: {
        id: null,
        GrCt_idGrupo: null,
        GrCt_NomeGrupo: null,
        GrCt_DescrGrupo: null,
        GrCt_idRisco: null,
        requireds: []
      }
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
    ...mapState([ 'risks', 'requireds' ]),
    ...mapGetters(['getFormReference']),
    currentId () {
      return this.getFormReference('accountsGroup')
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      this.get(this.record.id)
        .then(({ data }) => {
          data.requireds = data.requireds.map(r => r.Rq_idRequeridos)
          this.record = { ...data, id: data.GrCt_idGrupo }
        })
        .then(() => { this.loading = false })
    },
    create: payload => createAccountsGroup(payload),
    update: payload => updateAccountsGroup(payload),
    get: id => getAccountsGroup(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
