<template>
  <header class="header">
    <v-layout row justify-space-between>
    <h1>{{ title }}</h1>
    <v-btn v-if="breadcrumbs.length > 1" @click="$router.go(-1)" small> <i class="fa fa-caret-left" aria-hidden="true"></i> Voltar</v-btn>
    </v-layout>
    <div class="breadcrumb-list">
      <span :class="`breadcrumb-item ${i !== breadcrumbs.length - 1 ? 'pointer' : null}`" v-for="(item, i) in breadcrumbs" :key="item" @click="goBack(i + 1)">{{item}}</span>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goBack (i) {
      if (i !== this.breadcrumbs.length) {
        this.$router.go(i - this.breadcrumbs.length)
      }
    }
  }
}
</script>
