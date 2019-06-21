import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      errors: [],
      mixinmixinContext: '',
      record: {
        id: null
      }
    }
  },
  methods: {
    request () {
      return this.record.id ? this.update(this.record) : this.create(this.record)
    },
    save () {
      this.loading = true
      this.request()
        .then(response => {
          Notify.success(`O registro de ${this.mixinContext} foi salvo!`)
          this.$router.go(-1)
        })
        .catch(e => { this.errors = e.response })
        .then(() => { this.loading = false })
    }
  }
}
