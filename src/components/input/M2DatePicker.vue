<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="date"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-icon="event"
        readonly
        v-on="on"
        :rules="rules"
        clearable
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" no-title scrollable>
      <v-spacer></v-spacer>
      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      default: () => []
    },
    value: {
      default: null
    }
  },
  data () {
    return {
      date: null,
      menu: false
    }
  },
  created () {
    this.date = this.value
  },
  watch: {
    date (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.date = val
    }
  }
}
</script>
