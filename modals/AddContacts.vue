<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar contatos</h3>

    <section slot="body">
      <v-form @submit.prevent="addContact" ref="contactForm">
        <v-layout wrap>
          <v-flex xs12 sm5>
            <v-text-field v-model="record.name"
              :rules="[v => !!v || 'Campo obrigatório']"
              label="Nome"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field v-model="record.email"
              :rules="emailRules"
              label="Email"
              clearable
            />
          </v-flex>
          <v-flex xs12 sm2 class="text-center">
            <v-btn color="success" flat style="margin-top: 16px;" type="submit"><i class="fa fa-plus"></i></v-btn>
          </v-flex>
        </v-layout>
      </v-form>

      <v-flex xs12 class="m-t-10">
        <h3 class="m-b-5">Contatos: </h3>
        <v-chip color="primary" class="white--text p-5" close @input="removeContact(i)" v-for="(c, i) in contacts" :key="i">
          {{ c.name }} <br/> {{ c.email }}
        </v-chip>
        <p v-if="!contacts.length">Nenhum contato adicionado</p>
      </v-flex>
    </section>

    <v-layout slot="footer">
      <v-btn @click="$emit('close')" dark>Cancelar</v-btn>
      <v-spacer/>
      <v-btn color="success" :disabled="!!record.name || !!record.email" @click="$emit('close')">Salvar</v-btn>
    </v-layout>
  </m2-modal>
</template>

<script>
import { get, create, update } from '@/services'
import { mapGetters } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'anexos',
      loading: false,
      record: {
        name: null,
        email: null
      },
      contacts: [],
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
    removeContact (i) {
      this.contacts.splice(i, 1)
    },
    addContact () {
      if (this.$refs.contactForm.validate()) {
        this.contacts.push({
          name: this.record.name,
          email: this.record.email
        })
        this.clear()
      }
    },
    clear () {
      this.record.name = null
      this.record.email = null
      this.$refs.contactForm.resetValidation()
    },
    create: payload => create(payload),
    update: payload => update(payload),
    get: id => get(id)
  }
}
</script>
