import Notify from '@/utils/notify'

export default {
  data () {
    return {
      loading: false,
      mixinmixinContext: '',
      record: {}
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      this.get(this.record.id)
        .then(response => {
          console.log('fetch response', response)
        })
        .then(() => { this.loading = false })
    },
    request () {
      return this.record.id ? this.update(this.record) : this.create(this.record)
    },
    save () {
      this.loading = true
      this.request()
        .then(response => {
          console.log('response', response)
          Notify.success(`O registro de ${this.mixinContext} foi salvo!`)
        })
        .then(() => { this.loading = false })
    }
  }
}
