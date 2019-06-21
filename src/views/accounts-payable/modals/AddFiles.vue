<template>
  <m2-modal @close="$emit('close')" v-if="reference">
    <div slot="header" @click="fetchRecord">
      <h3>Gerenciar anexos</h3>
      <small>Referente a conta a pagar: <b>{{ reference.name }}</b></small>
    </div>
    <m2-multi-file-input slot="body" v-model="record.files" label="Anexos"/>
    <v-layout slot="footer">
      <v-btn @click="$emit('close')" dark>Cancelar</v-btn>
      <v-spacer/>
      <v-btn color="success" @click="uploadFiles">Salvar</v-btn>
    </v-layout>
  </m2-modal>
</template>

<script>
import { getAllAttachment, manageAttachment } from '@/services'
import Notify from '@/utils/notify';

export default {
  props: ['reference'],
  data () {
    return {
      loading: false,
      record: {
        id: null,
        files: []
      },
      existentFiles: []
    }
  },
  watch: {
    reference (val) {
      this.record.files = []
      if (val && val.id) {
        this.fetchRecord()
      }
    }
  },
  methods: {
    fetchRecord () {
      this.loading = true
      getAllAttachment({ Anx_idConta: this.reference.id })
        .then(({ data }) => {
          this.record.files = data.map(a => {
            return {
              id: a.Anx_idAnexo,
              url: a.Anx_endereco,
              name: `${a.Anx_nome}.${a.Anx_formato}`,
            }
          })
          this.existentFiles = [...data]
        })
        .then(() => { this.loading = false })
    },
    uploadFiles () {
      let id = this.reference.id
      let keep = this.record.files.filter(f => !!f.id)
      let files = this.record.files.map(f => {
        if (f.url && f.url.length > 200) {
          delete f.url
        }
        return f
      }).filter(f => !!f.file)

      let form = new FormData()
      form.append('id', id)
      form.append('keepLength', keep.length)
      form.append('filesLength', files.length)
      for (let k in keep) {
        form.append(`keep.${k}`, keep[k].id)
      }
      for (let f in files) {
        form.append(`files.${f}.name`, files[f].name)
        form.append(`files.${f}.file`, files[f].file)
      }

      manageAttachment(id, form)
        .then(response => {
          Notify.success('Anexos atualizados!')
          this.$emit('close')
        })
        .catch(() => { Notify.error('Algo deu errado. Tente mais tarde.') })
        .then(() => { this.loading = false })
    }
  }
}
</script>
