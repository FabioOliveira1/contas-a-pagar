<template>
  <v-layout class="minimal" align-center justify-center>
    <v-card elevation-3 class="w-80">
      <v-card-media
        src="@/assets/images/logo1.png"
        alt="M2 Print logo"
        max-height="100px"
        contain
        :class="`${ isError ? 'error-layout' : '' } m-b-20`"
      />
      <slot></slot>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  props: {
    isError: {
      type: Boolean,
      default: false
    }
  }
}
</script>
