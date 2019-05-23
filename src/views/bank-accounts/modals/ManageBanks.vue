<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar bancos</h3>

    <section slot="body">
      <v-form @submit.prevent="addContact" ref="form">
        <v-layout wrap>
          <v-flex xs12 sm6>
            <v-text-field v-model="record.number"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Número"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field v-model="record.name"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome"
              clearable
            />
          </v-flex>
          <v-flex xs12 class="text-center m-t-10">
            <v-layout>
              <v-btn dark v-if="editingId" @click="clear">Cancelar<i class="fa fa-times m-l-10"></i></v-btn>
              <v-spacer></v-spacer>
              <v-btn color="success" type="submit">{{ editingId ? 'Salvar' : 'Adicionar' }}<i class="fa fa-check m-l-10"></i></v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-form>

      <v-flex xs12 class="m-t-20">
        <h3 class="m-b-5">Bancos: </h3>
        <v-card color="grey lighten-2" class="p-10 m-t-10" style="position: relative;" v-for="(b, i) in banks" :key="b.id">
          <transition name="fade">
            <div class="loading-inline" v-if="editingId === b.id">
              <span class="message">Editando</span>
            </div>
          </transition>
          <v-layout>
            <div class="f-size-15 p-t-5">
                <b>{{ b.number }}</b> - {{ b.name }}
            </div>
            <v-spacer/>
            <v-btn small color="warning" class="m-r-10" @click="handleEdit(b, i)"><i class="fa fa-edit"></i></v-btn>
            <v-btn small color="error" @click="askToRemove(b.id, i)"><i class="fa fa-times"></i></v-btn>
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
import { get, create, update } from '@/services/renegociation'
import { mapGetters } from 'vuex'
import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      editingId: null,
      record: {
        name: null,
        number: null
      },
      banks: [
        {
          id: 1,
          number: '042',
          name: 'Itaú SA'
        },
        {
          id: 2,
          number: '341',
          name: 'Bradesco SA'
        }
      ]
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
    handleEdit (bank, index) {
      this.editingId = bank.id
      this.record.number = bank.number
      this.record.name = bank.name
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
          Notify.success('Banco removido')
        })
        .catch(() => {
          Notify.error('Não foi possível remover o banco')
        })
      
    },
    save () {

    },
    addContact () {
      console.log(this.$refs.form.validate())
      if (this.$refs.form.validate()) {
        this.banks.push({
          id: Date.now().toString(16),
          name: this.record.name,
          number: this.record.number
        })
        this.clear()
      }
    },
    clear () {
      this.editingId = null
      this.record.name = null
      this.record.number = null
      this.$refs.form.resetValidation()
    },
    create: payload => create(payload),
    update: payload => update(payload),
    get: id => get(id)
  }
}
</script>
