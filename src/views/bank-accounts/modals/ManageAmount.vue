<template>
  <m2-modal @close="$emit('close')">
    <h3 slot="header">Gerenciar saldo da conta bancária</h3>

    <section slot="body">
      <v-layout wrap class="f-size-15">
        <v-flex xs12 sm4 >
          <p><b>Banco: </b>{{ reference.bank }}</p>
        </v-flex>
        <v-flex xs12 sm4>
          <p><b>Agência: </b>{{ reference.agency }}</p>
        </v-flex>
        <v-flex xs12 sm4>
          <p><b>Conta bancária: </b>{{ reference.account }}</p>
        </v-flex>

        <v-flex xs12 sm6 class="m-t-20 text-center f-size-16">
          <v-layout align-center >
            <span><b>Saldo atual: </b><br/><br/>{{ reference.value }}</span>
            <i class="fa fa-arrow-right m-r-20 m-l-20"></i>
            <span><b>Saldo após alteração: </b><br/><br/>{{ record.value }}</span>
          </v-layout>
        </v-flex>

        <v-flex xs12 sm6 class="text-center m-t-10">
          <v-form ref="form">
            <v-layout>
              <v-btn class="m-t-20 min-w-40" flat small color="error" @click="subtractAmount"><i class="fa fa-minus"></i></v-btn>

              <v-text-field v-model="tradingValue"
                type="number"
                :rules="[v => !!v || 'Campo obrigatório']"
                label="Valor"
                clearable
              />

              <v-btn class="m-t-20 min-w-40" flat small color="success" @click="addAmount"><i class="fa fa-plus"></i></v-btn>
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
import { changeBankAccountAmount } from '@/services'
import Notify from '@/utils/notify'

export default {
  props: ['reference'],
  data () {
    return {
      loading: false,
      editingId: null,
      record: {
        value: null
      },
      tradingValue: 100
    }
  },
  created () {
    this.record.value = this.reference.value
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
      if (this.record.value !== this.reference.value) {
        changeBankAccountAmount({ id: this.reference.id, CtBc_Saldo: this.record.value })
          .then(({ data }) => {
            Notify.success('Saldo atualizado!')
            this.$emit('close')
          })
          .catch(() => { Notify.error('Algo deu errado') })
      } else {
        Notify.info('Nenhuma alteração feita')
        this.$emit('close')
      }
    },
    clear () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
