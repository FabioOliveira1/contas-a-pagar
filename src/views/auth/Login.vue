<template>
  <minimal-layout>
    <v-form @submit.prevent="doLogin" ref="login">
      <v-text-field
        type="text"
        placeholder="E-mail"
        :rules="[v => !!v || 'Campo de e-mail é obrigatório']"
        v-model="record.email"
        required
      />
      <v-text-field
        type="password"
        placeholder="Senha"
        :rules="[v => !!v || 'Campo de senha é obrigatório']"
        v-model="record.password"
        required
      />

      <v-btn type="submit" color="primary">Login</v-btn>
    </v-form>
  </minimal-layout>
</template>

<script>
export default {
  data () {
    return {
      record: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    doLogin () {
      if (this.$refs.login.validate()) {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>
