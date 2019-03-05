<template>
  <master-layout>
    <v-layout fill-height column class="p-r-15 p-l-15">
      <m2-header :title="$route.meta.header.title" :breadcrumbs="$route.meta.header.breadcrumbs"/>
      <section class="m-b-15">
      </section>
    </v-layout>
  </master-layout>
</template>

<script>
export default {
}
</script>
