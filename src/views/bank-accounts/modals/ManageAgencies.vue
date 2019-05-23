<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar agências</h3>

    <section slot="body">
      <v-form @submit.prevent="addAgency" ref="form">
        <v-layout wrap>
          <v-flex xs12 sm4>
            <v-select v-model="record.bank"
              item-text="name"
              item-value="id"
              :items="banks"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Banco"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field v-model="record.number"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Número"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field v-model="record.name"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.managerName"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome do gerente"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.managerEmail"
              type="email"
              :rules="emailRules"
              label="E-mail do gerente"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field v-model="record.managerPhone"
              type="number"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Telefone do gerente"
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
        <h3 class="m-b-5">Agências: </h3>
        <v-card color="grey lighten-2" class="p-10 m-t-10" style="position: relative;" v-for="(a, i) in agencies" :key="a.id">
          <transition name="fade">
            <div class="loading-inline" v-if="editingId === a.id">
              <span class="message">Editando</span>
            </div>
          </transition>
          <v-layout>
            <div class="f-size-15 p-t-5">
                <p><b>{{ banks.find(b => b.id === a.bank).name }}</b> - {{ a.number }} - {{ a.name }}</p>
                <p><b>{{ a.managerName }}</b> - {{ a.managerPhone }}</p>
                <p>{{ a.managerEmail }}</p>
            </div>
            <v-spacer/>
            <v-btn small color="warning" class="m-r-10" @click="handleEdit(a, i)"><i class="fa fa-edit"></i></v-btn>
            <v-btn small color="error" @click="askToRemove(a.id, i)"><i class="fa fa-times"></i></v-btn>
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
        bank: null,
        number: null,
        name: null,
        managerName: null,
        managerPhone: null,
        managerEmail: null
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
      ],
      agencies: [
        {
          id: 1,
          bank: 1,
          number: '0076',
          name: 'Agencia Av. Af. Vergueiro',
          managerName: 'Carlos da Silva Sauro',
          managerPhone: '5532325532',
          managerEmail: 'carlos.sauro@itau.com'
        },
        {
          id: 2,
          bank: 2,
          number: '14835',
          name: 'Agencia Av. Itavuvu',
          managerName: 'Jeremias M. Saladino',
          managerPhone: '5555323232',
          managerEmail: 'jeremias.saladino@bradesco.com'
        }
      ],
      emailRules: [
        v => !!v || 'Campo Obrigatório',
        v => /.+@.+\.+./.test(v) || 'Não é uma email válido'
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
    handleEdit (agency, index) {
      this.editingId = agency.id
      this.record.bank = agency.bank
      this.record.number = agency.number
      this.record.name = agency.name
      this.record.managerName = agency.managerName
      this.record.managerPhone = agency.managerPhone
      this.record.managerEmail = agency.managerEmail
    },
    askToRemove (id, i) {
      Notify.confirm('Tem certeza que deseja apagar a agência?')
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
          Notify.success('Agência removida')
        })
        .catch(() => {
          Notify.error('Não foi possível remover a agência')
        })
      
    },
    save () {

    },
    addAgency () {
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
      this.record.bank = null
      this.record.number = null
      this.record.name = null
      this.record.managerName = null
      this.record.managerPhone = null
      this.record.managerEmail = null
      this.$refs.form.resetValidation()
    },
    create: payload => create(payload),
    update: payload => update(payload),
    get: id => get(id)
  }
}
</script>
