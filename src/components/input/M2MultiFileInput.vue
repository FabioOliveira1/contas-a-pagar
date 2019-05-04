<template>
  <div class="w-100 m2-multi-file-input">
    <label class="m2-multi-file-input__label">{{label}}</label>
    <v-btn class="m2-multi-file-input__button" flat @click="$refs.files.click()">
      <span class="m-10">Adicionar arquivos<i class="fa fa-plus m-l-10"></i></span>
    </v-btn>
    <v-layout wrap class="m-t-10">
      <v-card class="m2-multi-file-input__card cursor-default" v-for="(file, i) in files" :key="i" :title="file.name">
        <v-card-title class="m2-multi-file-input__card__tile">
          <span class="m2-multi-file-input__card__tile__remover" @click="removeFile(i)">
            <i class="fa fa-times"></i>
          </span>
          {{ file.name.split('.')[1]}}
        </v-card-title>
        <v-card-text class="ellipsis">{{ file.name }}</v-card-text>
      </v-card>
    </v-layout>

    <input
      type="file"
      style="display: none"
      ref="files"
      @change="onFilePicked"
      multiple
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      files: []
    }
  },
  methods: {
    onFilePicked (e) {
      const files = e.target.files
      if (!files || !files.length) {
        console.log('No files')
        return false
      }

      for (let file of files) {
        if (file !== undefined) {
          if (file.name.lastIndexOf('.') <= 0) {
            return true
          }

          const fr = new FileReader()

          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            this.files.push({
              name: file.name,
              url: fr.result,
              file
            })

            this.$emit('input', files)
          })
        }
      }

      return true
    },
    removeFile (i) {
      this.files.splice(i, 1)
      this.$refs.files.value = null
    }
  }
}
</script>
