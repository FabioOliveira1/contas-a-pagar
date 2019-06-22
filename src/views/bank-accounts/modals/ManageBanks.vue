<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar bancos</h3>

    <section slot="body">
      <v-form @submit.prevent="save" ref="form">
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field v-model="record.Bc_numBanco"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Número"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field v-model="record.Bc_nomeBanco"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome"
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
        <h3 class="m-b-5">Bancos: </h3>
        <v-card color="grey lighten-2" class="p-10 m-t-10" style="position: relative;" v-for="(b, i) in banks" :key="b.Bc_idBanco">
          <transition name="fade">
            <div class="loading-inline" v-if="record.id === b.Bc_idBanco">
              <span class="message">Editando</span>
            </div>
          </transition>
          <v-layout>
            <div class="f-size-15 p-t-5">
                <b>{{ b.Bc_numBanco }}</b> - {{ b.Bc_nomeBanco }}
            </div>
            <v-spacer/>
            <v-btn small color="warning" class="m-r-10" @click="handleEdit(b, i)"><i class="fa fa-edit"></i></v-btn>
            <v-btn small color="error" @click="askToRemove(b.Bc_idBanco, i)"><i class="fa fa-times"></i></v-btn>
          </v-layout>
        </v-card>
        <p v-if="!banks.length">Nenhum banco adicionado</p>
      </v-flex>
    </section>

    <v-layout slot="footer">
      <v-btn @click="$emit('close')" dark>Fechar</v-btn>
    </v-layout>
  </m2-modal>
</template>

<script>
import { getAllBank, createBank, updateBank, deleteBank } from '@/services'
import { mapMutations } from 'vuex'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      record: {
        Bc_nomeBanco: null,
        Bc_numBanco: null
      },
      banks: []
    }
  },
  created () {
    this.fetchRecord()
  },
  methods: {
    ...mapMutations({
      setBanks: 'SET_BANKS'
    }),
    fetchRecord () {
      this.loading = false

      getAllBank()
        .then(({ data }) => {
          this.banks = [...data]
          const banks = data.map(b => ({id: b.Bc_idBanco, num: b.Bc_numBanco, name: b.Bc_nomeBanco}))
          this.setBanks(banks)
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleEdit (bank, index) {
      this.record.id = bank.Bc_idBanco
      this.record.Bc_numBanco = bank.Bc_numBanco
      this.record.Bc_nomeBanco = bank.Bc_nomeBanco
    },
    save () {
      if(this.record.id) {
        updateBank(this.record)
          .then(() => {
            Notify.success('Banco atualizado')
            this.clear()
          })
          .catch(() => {
            Notify.error('Não foi possível atualizar o banco')
          })

      } else {
        createBank(this.record)
          .then(() => {
            Notify.success('Banco salvo')
            this.clear()
          })
          .catch(() => {
            Notify.error('Não foi possível salvar o banco')
          })
      }
    },
    askToRemove (id, i) {
      Notify.confirm('Tem certeza que deseja apagar o banco?')
        .then(r => {
          if (r.value) {
            this.removeBank(id, i)
          }
        })
    },
    removeBank (id, i) {
      deleteBank(id)
        .then(() => {
          this.banks.splice(i, 1)
          const banks = this.banks.map(b => ({id: b.Bc_idBanco, num: b.Bc_numBanco, name: b.Bc_nomeBanco}))
          this.setBanks(banks)
          Notify.success('Banco removido')
        })
        .catch(() => {
          Notify.error('Não foi possível remover o banco')
        })
    },
    clear () {
      this.record.id = null
      this.record.Bc_nomeBanco = null
      this.record.Bc_numBanco = null
      this.$refs.form.resetValidation()
      this.fetchRecord()
    },
  }
}
</script>
