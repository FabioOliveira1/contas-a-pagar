<template>
  <transition name="fade">
    <v-layout class="loading" v-if="isLoading" flex align-center justify-center>
      loading
      <div class="curtain"></div>
    </v-layout>
  </transition>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
