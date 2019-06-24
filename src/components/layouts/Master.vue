<template>
  <v-layout class="master">
    <m2-sidemenu :isMenuOpen="isMenuOpen" />
    <m2-navbar :isMenuOpen="isMenuOpen" @logout="logout" @toggleMenu="isMenuOpen = !isMenuOpen" />

    <div v-if="init" :class="`main-container ${isMenuOpen ? 'reduce-width' : ''}`">
      <slot></slot>
    </div>
  </v-layout>
</template>

<script>
// import { mapActions } from 'vuex'
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {
      isLoading: false,
      isMenuOpen: true
    }
  },
  computed: {
    ...mapState([ 'init'])
  },
  methods: {
    ...mapMutations({ setAuth: 'SET_AUTH' }),
    logout () {
      this.setAuth({
        name: null,
        email: null,
        role: null,
        token: null
      })
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
