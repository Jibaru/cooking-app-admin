<template>
  <form @submit.prevent="submitFilter">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-6">
        <label>Nombre</label>
        <base-input v-model.trim="name" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Desde</label>
        <base-input type="date" v-model="fromDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Hasta</label>
        <base-input type="date" v-model="toDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Tipo de medio</label>
        <base-select v-model="mimeType">
          <base-option value="#" selected>
            Todos
          </base-option>
          <base-option
            v-for="mimeType in mimeTypes"
            :key="mimeType.value"
            :value="mimeType.value"
          >
            {{ mimeType.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  emits: ["filter"],
  data() {
    return {
      name: "",
      fromDate: "",
      toDate: "",
      mimeType: "#",
    };
  },
  computed: {
    ...mapGetters({
      mimeTypes: "combo/mimeTypes",
    }),
  },
  methods: {
    submitFilter() {
      const filters = {
        ...(this.name !== "" && {
          name: this.name,
        }),
        ...(this.toDate !== "" && {
          toDate: this.toDate,
        }),
        ...(this.fromDate !== "" && {
          fromDate: this.fromDate,
        }),
        ...(this.mimeType !== "#" && {
          mimeType: this.mimeType,
        }),
      };

      this.$emit("filter", filters);
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
