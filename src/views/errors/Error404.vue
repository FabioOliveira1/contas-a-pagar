<template>
  <minimal-layout isError>
    <h1 class="text-center m-b-10">Erro 404</h1>
    <p class="text-center f-size-20 m-b-10">Página não encontrada</p>
    <div class="w-100 text-center">
      <v-btn class="white--text" color="#004973" :to="{ name: 'home'}">
        <v-icon left>arrow_back</v-icon>
        Voltar a página inicial
      </v-btn>
    </div>
  </minimal-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
