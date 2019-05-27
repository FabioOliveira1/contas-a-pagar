<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar saldo da conta bancária</h3>

    <section slot="body">
      <v-layout wrap class="f-size-15">
        <v-flex xs12 sm4 >
          <p><b>Banco: </b>{{ account.bank }}</p>
        </v-flex>
        <v-flex xs12 sm4>
          <p><b>Agência: </b>{{ account.agency }}</p>
        </v-flex>
        <v-flex xs12 sm4>
          <p><b>Conta bancária: </b>{{ account.account }}</p>
        </v-flex>

        <v-flex xs12 sm6 class="m-t-20 text-center f-size-16">
          <v-layout align-center >
            <span><b>Saldo atual: </b><br/><br/>{{ account.value }}</span>
            <i class="fa fa-arrow-right m-r-20 m-l-20"></i>
            <span><b>Saldo após alteração: </b><br/><br/>{{ record.value }}</span>
          </v-layout>
        </v-flex>

        <v-flex xs12 sm6 class="text-center m-t-10">
          <v-form ref="form">
            <v-layout>
              <v-btn class="m-t-20 min-w-40" flat small color="success" @click="addAmount"><i class="fa fa-plus"></i></v-btn>

              <v-text-field v-model="tradingValue"
                type="number"
                :rules="[v => !!v || 'Campo obrigatório']"
                label="Valor"
                clearable
              />

              <v-btn class="m-t-20 min-w-40" flat small color="error" @click="subtractAmount"><i class="fa fa-minus"></i></v-btn>
            </v-layout>
            </v-form>
        </v-flex>

      </v-layout>
    </section>

    <v-layout slot="footer">
      <v-layout>
        <v-btn dark @click="$emit('close')">Cancelar<i class="fa fa-times m-l-10"></i></v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click.prevent="save">Salvar<i class="fa fa-check m-l-10"></i></v-btn>
      </v-layout>
    </v-layout>
  </m2-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import Notify from '@/utils/notify'

export default {
  props: ['account'],
  data () {
    return {
      loading: false,
      editingId: null,
      record: {
        value: null
      },
      tradingValue: null,
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
    this.record.value = this.account.value
  },
  computed: {
    ...mapGetters({
      currentId: 'getRenegociationForm'
    })
  },
  methods: {
    addAmount () {
      if (this.$refs.form.validate()) {
        this.record.value = parseInt(this.record.value) + parseInt(this.tradingValue)
        this.clear()
      }
    },
    subtractAmount () {
      if (this.$refs.form.validate()) {
        this.record.value = parseInt(this.record.value) - parseInt(this.tradingValue)
        this.clear()
      }
    },
    save () {
      Notify.success('Saldo atualizado!')
        .then(() => this.$emit('close'))
    },
    clear () {
      this.tradingValue = null
      this.$refs.form.resetValidation()
    }
  }
}
</script>
