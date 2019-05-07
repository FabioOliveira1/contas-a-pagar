<template>
  <transition name="modal">
    <div class="modal-mask" @click="$emit('close')">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop="">

          <div class="modal-header">
            <slot name="header">
              <h3>default header</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <v-btn color="primary" @click="$emit('close')">Ok</v-btn>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { get, create, update } from '@/services/renegociation'
import { mapGetters } from 'vuex'
import FormActions from '@/utils/mixins/formActions'

export default {
  mixins: [FormActions],
  data () {
    return {
      mixinContext: 'renegociação',
      loading: false,
      record: {
        id: null,
        supplierId: null,
        contactId: null,
        accountId: null,
        newValue: null,
        newDate: null,
        subject: null,
        message: null,
        status: null
      },
      accountCombo: {
        id: null,
        name: null,
        value: null,
        fee: null,
        interest: null,
        emitedAt: null,
        dueDateAt: null
      },
      supplierCombo: {
        id: null,
        name: null
      },
      contactCombo: {
        id: null,
        name: null
      },
      options: {
        suppliers: [],
        contacts: [],
        accounts: []
      }
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
    create: payload => create(payload),
    update: payload => update(payload),
    get: id => get(id),
    doFilter () {
      if (this.$refs.form.validate()) {
        this.save()
      }
    }
  }
}
</script>
