<template>
  <section>
    <!-- Filter -->
    <v-card flex>
      <v-card-title>
        <h1 class="f-size-20 w-100">Filtros</h1>
        <p>Use os filtros para carregar os dados escolares</p>
      </v-card-title>
      <v-card-text class="p-t-0">
        <v-form @submit.prevent="doFilter" ref="form">
          <v-select
            v-model="filters.franchise"
            :items="options.franchises"
            item-value="_id"
            item-text="nome"
            label="Franquia"
            :loading="isFranchiseLoading"
            :rules="[v => !!v || !!this.filters.cnpj || 'A franquia não pode estar vazia se o CNPJ estiver']"
            disabled
            required
          ></v-select>
          <v-combobox
            v-model="filters.school"
            :items="options.schools"
            item-text="nome"
            label="Escola"
            :disabled="!filters.franchise || !!filters.cnpj"
            :loading="isSchoolLoading"
            clearable
            :rules="[v => !!v || !!this.filters.cnpj || 'A escola não pode estar vazia se o CNPJ estiver']"
            required
          ></v-combobox>
          <v-text-field
            v-model="filters.cnpj"
            :counter="14"
            label="CNPJ"
            :disabled="!!filters.school && !!filters.school._id"
            :rules="[v => !!v || !!this.filters.school || 'O CNPJ não pode estar vazio se a escola estiver', v => !v && !!this.filters.school || !!v && v.length === 14 || 'CNPJ inválido']"
            mask="##.###.###/####-##"
            required
            clearable
          ></v-text-field>
          <div class="m-t-10 text-right w-100">
            <v-btn color="red darken-2" dark type="submit"><span class="f-bold m-r-10">Filtrar</span> <i
              class="fa fa-search"></i></v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
}
</script>
