<template>
  <v-toolbar app :class="`navbar ${isMenuOpen ? 'reduce-width' : ''}`">
    <v-toolbar-title class="headline text-uppercase" @click="$emit('toggleMenu')">
      <div class="menu-list-activator" @click="$event.target.classList.toggle('open')">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="headline text-uppercase profile-user">
      <v-layout align-start justify-center column class="m-l-10">
        <v-menu offset-y>
          <v-btn slot="activator" flat color="#fff" class="p-r-0 p-l-0 w-100">
            <!-- <span class="f-size-12">Fábio Oliveira</span>
            <v-spacer></v-spacer> -->
              <img class="user-avatar" src="@/assets/static/profile-pic.jpg" alt="user avatar" title="user avatar">
            <v-icon right class="f-size-18">arrow_drop_down</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="$emit('manage-bank')">
              <v-list-tile-title>
                <v-icon left class="f-size-20 m-r-10">credit_card</v-icon>
                <span class="f-size-14">Configurações bancárias</span>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile :to="{ name: 'users' }">
              <v-list-tile-title>
                <v-icon left class="f-size-20 m-r-10">person</v-icon>
                <span class="f-size-14">Configurações de acesso</span>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('logout')">
              <v-list-tile-title>
                <v-icon left class="f-size-20 m-r-10">exit_to_app</v-icon>
                <span class="f-size-14">Logout</span>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  props: ['isMenuOpen']
}
</script>
