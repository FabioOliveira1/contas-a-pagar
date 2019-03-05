<template>
  <transition name="slide-fade">
    <v-toolbar class="side-menu" v-if="isMenuOpen">
      <v-toolbar-items>
        <router-link :to="{ name: 'home' }">
          <img class="menu-logo" src="@/assets/images/logo1.png" alt="M2 Print logo" title="M2 Print logo">
        </router-link>
      </v-toolbar-items>
      <v-toolbar-items class="user-avatar"><img src="@/assets/static/profile-pic.jpg" alt="Foto do perfil" title="Foto do perfil"></v-toolbar-items>

      <router-link class="v-toolbar__items" :to="{ name: 'home' }" title="Home">
        <i class="fa fa-home"></i>
        <span class="item-label">Home</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'renegociation' }" title="Renegociação">
        <i class="fa fa-handshake-o"></i>
        <span class="item-label">Renegociação</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'simulation' }" title="Simulação">
        <i class="fa fa-calculator"></i>
        <span class="item-label">Simulação</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'accounts-payable' }" title="Contas a pagar">
        <i class="fa fa-list-alt"></i>
        <span class="item-label">Contas a pagar</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'accounts-group' }" title="Grupo de contas">
        <i class="fa fa-object-group"></i>
        <span class="item-label">Grupo de contas</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'suppliers' }" title="Fornecedores">
        <i class="fa fa-truck"></i>
        <span class="item-label">Fornecedores</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'risk-types' }" title="Tipos de risco">
        <i class="fa fa-exclamation-triangle"></i>
        <span class="item-label">Tipos de risco</span>
      </router-link>

      <router-link class="v-toolbar__items" :to="{ name: 'reports' }" title="Relatórios">
        <i class="fa fa-bar-chart"></i>
        <span class="item-label">Relatórios</span>
      </router-link>

      <!-- <router-link class="v-toolbar__items" :to="{ name: 'masterFranchise.extras' }" title="Extras">
        <i class="fa fa-list-alt"></i>
        <span class="item-label">Extras</span>
      </router-link> -->

    </v-toolbar>
  </transition>
</template>

<script>
export default {
  props: ['isMenuOpen']
}
</script>
