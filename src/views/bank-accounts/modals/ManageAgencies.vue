<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar agências</h3>

    <section slot="body">
      <v-form @submit.prevent="save" ref="form">
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-select v-model="record.AgBc_idBanco"
              item-text="name"
              item-value="id"
              :items="banks"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Banco"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field v-model="record.AgBc_numAgencia"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Número"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field v-model="record.AgBc_nomeAgencia"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.AgBc_nomeGerente"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome do gerente"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.AgBc_emailGerente"
              type="email"
              :rules="emailRules"
              label="E-mail do gerente"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.AgBc_phoneGerente"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Telefone do gerente"
              clearable
            />
          </v-flex>
          <v-flex xs12 class="text-center m-t-10">
            <v-layout>
              <v-btn dark v-if="record.id" @click="clear">Cancelar<i class="fa fa-times m-l-10"></i></v-btn>
              <v-spacer></v-spacer>
              <v-btn color="success" type="submit">{{ record.id ? 'Salvar' : 'Adicionar' }}<i class="fa fa-check m-l-10"></i></v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>

      <v-flex xs12 class="m-t-20">
        <h3 class="m-b-5">Agências: </h3>
        <v-card color="grey lighten-2" class="p-10 m-t-10" style="position: relative;" v-for="(a, i) in agencies" :key="a.AgBc_idAgencia">
          <transition name="fade">
            <div class="loading-inline" v-if="record.id === a.AgBc_idAgencia">
              <span class="message">Editando</span>
            </div>
          </transition>
          <v-layout>
            <div class="f-size-15 p-t-5">
                <p><b>{{ banks.find(b => b.id === a.AgBc_idBanco).name }}</b> - {{ a.AgBc_numAgencia }} - {{ a.AgBc_nomeAgencia }}</p>
                <p><b>{{ a.AgBc_nomeGerente }}</b> - {{ a.AgBc_phoneGerente }}</p>
                <p>{{ a.AgBc_emailGerente }}</p>
            </div>
            <v-spacer/>
            <v-btn small color="warning" class="m-r-10" @click="handleEdit(a, i)"><i class="fa fa-edit"></i></v-btn>
            <v-btn small color="error" @click="askToRemove(a.AgBc_idAgencia, i)"><i class="fa fa-times"></i></v-btn>
          </v-layout>
        </v-card>
        <p v-if="!agencies.length">Nenhuma agência adicionado</p>
      </v-flex>
    </section>

    <v-layout slot="footer">
      <v-btn @click="$emit('close')" dark>Fechar</v-btn>
    </v-layout>
  </m2-modal>
</template>

<script>
import { getAllAgency, createAgency, updateAgency, deleteAgency } from '@/services'
import { mapState } from 'vuex'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      record: {
        id: null,
        AgBc_idBanco: null,
        AgBc_numAgencia: null,
        AgBc_nomeAgencia: null,
        AgBc_nomeGerente: null,
        AgBc_phoneGerente: null,
        AgBc_emailGerente: null
      },
      agencies: [],
      emailRules: [
        v => !!v || 'Campo Obrigatório',
        v => /.+@.+\.+./.test(v) || 'Não é uma email válido'
      ]
    }
  },
  created () {
    this.fetchRecord()
  },
  computed: {
    ...mapState([ 'banks' ])
  },
  methods: {
    fetchRecord () {
      this.loading = false

      getAllAgency()
        .then(({ data }) => {
          this.agencies = [...data]
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleEdit (agency, index) {
      this.record.id = agency.AgBc_idAgencia
      this.record.AgBc_idBanco = agency.AgBc_idBanco
      this.record.AgBc_numAgencia = agency.AgBc_numAgencia
      this.record.AgBc_nomeAgencia = agency.AgBc_nomeAgencia
      this.record.AgBc_nomeGerente = agency.AgBc_nomeGerente
      this.record.AgBc_phoneGerente = agency.AgBc_phoneGerente
      this.record.AgBc_emailGerente = agency.AgBc_emailGerente
    },
    save () {
      if(this.record.id) {
        updateAgency(this.record)
          .then(() => {
            Notify.success('Agência atualizado')
            this.clear()
          })
          .catch(() => {
            Notify.error('Não foi possível atualizar a agência')
          })

      } else {
        createAgency(this.record)
          .then(() => {
            Notify.success('Banco salvo')
            this.clear()
          })
          .catch(() => {
            Notify.error('Não foi possível salvar a agência')
          })
      }
    },
    askToRemove (id, i) {
      Notify.confirm('Tem certeza que deseja apagar a agência?')
        .then(r => {
          if (r.value) {
            this.removeAgency(id, i)
          }
        })
    },
    removeAgency (id, i) {
      deleteAgency(id)
        .then(() => {
          this.agencies.splice(i, 1)
          Notify.success('Agência removida')
        })
        .catch(() => {
          Notify.error('Não foi possível remover a agência')
        })
    },
    clear () {
      this.record.id = null
      this.record.AgBc_idBanco = null
      this.record.AgBc_numAgencia = null
      this.record.AgBc_nomeAgencia = null
      this.record.AgBc_nomeGerente = null
      this.record.AgBc_phoneGerente = null
      this.record.AgBc_emailGerente = null
      this.$refs.form.resetValidation()
      this.fetchRecord()
    }
  }
}
</script>
