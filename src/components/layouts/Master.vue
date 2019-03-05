<template>
  <v-layout class="master">
    <m2-sidemenu :isMenuOpen="isMenuOpen" />
    <m2-navbar :isMenuOpen="isMenuOpen" @logout="logout" @toggleMenu="isMenuOpen = !isMenuOpen" />

    <div :class="`main-container ${isMenuOpen ? 'reduce-width' : ''}`">
      <slot></slot>
    </div>
  </v-layout>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  data () {
    return {
      isLoading: false,
      isMenuOpen: true
    }
  },
  methods: {
    // ...mapActions([ 'logout' ]),
    logout () {
      console.log('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
