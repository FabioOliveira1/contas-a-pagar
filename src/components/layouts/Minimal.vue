<template>
  <v-layout :class="`minimal ${expanded ? 'expanded' : ''}` " align-center justify-center>
    <v-card elevation-3 class="minimal__container">
      <v-img
        src="@/assets/images/logo1.png"
        alt="M2 Print logo"
        max-height="100px"
        contain
        :class="`${isError ? 'isError' : ''} m-b-20`"
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
    },
    expanded: {
      type: Boolean,
      default: false
    }
  }
}
</script>
