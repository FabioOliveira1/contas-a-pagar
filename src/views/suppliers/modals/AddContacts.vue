<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar contados de {{reference.name}}</h3>

    <section slot="body">
      <v-form @submit.prevent="save" ref="form">
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.Cnt_nomeContato"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.Cnt_emailContato"
              type="email"
              :rules="emailRules"
              label="E-mail"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.Cnt_phoneContato"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Telefone"
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
        <h3 class="m-b-5">Contatos: </h3>
        <v-card color="grey lighten-2" class="p-10 m-t-10" style="position: relative;" v-for="(c, i) in contacts" :key="c.Cnt_idContato">
          <transition name="fade">
            <div class="loading-inline" v-if="record.id === c.Cnt_idContato">
              <span class="message">Editando</span>
            </div>
          </transition>
          <v-layout>
            <div class="f-size-15 p-t-5">
                <p><b>{{ c.Cnt_nomeContato }}</b> - {{ c.Cnt_phoneContato }}</p>
                <p>{{ c.Cnt_emailContato }}</p>
            </div>
            <v-spacer/>
            <v-btn small color="warning" class="m-r-10" @click="handleEdit(c, i)"><i class="fa fa-edit"></i></v-btn>
            <v-btn small color="error" @click="askToRemove(c.Cnt_idContato, i)"><i class="fa fa-times"></i></v-btn>
          </v-layout>
        </v-card>
        <p v-if="!contacts.length">Nenhum contato adicionado</p>
      </v-flex>
    </section>

    <v-layout slot="footer">
      <v-btn @click="$emit('close')" dark>Fechar</v-btn>
    </v-layout>
  </m2-modal>
</template>

<script>
import { getAllContact, createContact, updateContact, deleteContact } from '@/services'
import Notify from '@/utils/notify'

export default {
  props: ['reference'],
  data () {
    return {
      loading: false,
      record: {
        id: null,
        Cnt_idFornecedor: null,
        Cnt_nomeContato: null,
        Cnt_phoneContato: null,
        Cnt_emailContato: null
      },
      contacts: [],
      emailRules: [
        v => !!v || 'Campo Obrigatório',
        v => /.+@.+\.+./.test(v) || 'Não é uma email válido'
      ]
    }
  },
  created () {
    if (!this.reference.id) {
      this.$emit('close')
      return false
    }

    this.record.id = this.currentId
    this.fetchRecord()
  },
  methods: {
    fetchRecord () {
      this.loading = false

      getAllContact({ Cnt_idFornecedor: this.reference.id })
        .then(({ data }) => {
          this.contacts = [...data]
        })
        .catch(e => console.log(e))
        .then(() => { this.loading = false })
    },
    handleEdit (contact, index) {
      this.record.id = contact.Cnt_idContato
      this.record.Cnt_idFornecedor = contact.Cnt_idFornecedor
      this.record.Cnt_nomeContato = contact.Cnt_nomeContato
      this.record.Cnt_phoneContato = contact.Cnt_phoneContato
      this.record.Cnt_emailContato = contact.Cnt_emailContato
    },
    save () {
      this.record.Cnt_idFornecedor = this.reference.id
      if(this.record.id) {
        updateContact(this.record)
          .then(() => {
            Notify.success('Contato atualizado')
            this.clear()
          })
          .catch(() => {
            Notify.error('Não foi possível atualizar o contato')
          })

      } else {
        createContact(this.record)
          .then(() => {
            Notify.success('Contato salvo')
            this.clear()
          })
          .catch(() => {
            Notify.error('Não foi possível salvar o contato')
          })
      }
    },
    askToRemove (id, i) {
      Notify.confirm('Tem certeza que deseja apagar o contato?')
        .then(r => {
          if (r.value) {
            this.removeContact(id, i)
          }
        })
    },
    removeContact (id, i) {
      deleteContact(id)
        .then(() => {
          this.contacts.splice(i, 1)
          Notify.success('Contato removido')
        })
        .catch(() => {
          Notify.error('Não foi possível remover o contato')
        })
    },
    clear () {
      this.record.id = null
      this.record.Cnt_nomeContato = null
      this.record.Cnt_nomeContato = null
      this.record.Cnt_phoneContato = null
      this.record.Cnt_emailContato = null
      this.$refs.form.resetValidation()
      this.fetchRecord()
    }
  }
}
</script>
