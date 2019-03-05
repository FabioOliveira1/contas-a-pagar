<template>
  <v-layout class="m2-date-range">
    <label class="m2-date-range__label">{{label}}</label>
    <v-menu
      ref="menuFrom"
      v-model="menuFrom"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="dateFrom"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateFrom"
          readonly
          v-on="on"
          clearable
        ></v-text-field>
      </template>
      <v-date-picker v-model="dateFrom" no-title scrollable :max="dateTo" locale="pt-br">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="menuFrom = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menuFrom.save(dateFrom)">OK</v-btn>
      </v-date-picker>
    </v-menu>

    <v-menu
      ref="menuTo"
      v-model="menuTo"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="dateTo"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="dateTo"
          prepend-icon="arrow_forward"
          readonly
          v-on="on"
          clearable
        ></v-text-field>
      </template>
      <v-date-picker v-model="dateTo" no-title scrollable :min="dateFrom" locale="pt-br">
        <v-spacer></v-spacer>
        <v-btn flat color="primary" @click="menuTo = false">Cancel</v-btn>
        <v-btn flat color="primary" @click="$refs.menuTo.save(dateTo)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </v-layout>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      dateFrom: null,
      dateTo: null,
      menuFrom: false,
      menuTo: false
    }
  },
  watch: {
    dateFrom (val) {
      this.$emit({
        from: val,
        to: this.dateTo
      })
    },
    dateTo (val) {
      this.$emit({
        from: this.dateFrom,
        to: val
      })
    }
  }
}
</script>
