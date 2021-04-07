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
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button
          type="button"
          @click="togglePrefsIngredientsModal"
          @mouseenter="isPrefsIngredientsPopoverOpen = true"
          @mouseleave="isPrefsIngredientsPopoverOpen = false"
          class="popover-target"
          data-id="prefs-ingredients-btn"
          block
        >
          Pref. Ingredientes
        </base-button>
        <base-modal
          title="Preferencias de ingredientes"
          type="small"
          :open="isPrefsIngredientsModalOpen"
          @close="togglePrefsIngredientsModal"
        >
          <prefs-ingredients v-model="selectedIngredientsOptions" />
        </base-modal>
        <base-popover
          target-data-id="prefs-ingredients-btn"
          :open="isPrefsIngredientsPopoverOpen"
        >
          <base-simple-list
            v-if="selectedIngredientsOptions.length > 0"
            :elements="selectedIngredientValues"
          />
          <span v-else>Sin ingredientes</span>
        </base-popover>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import PrefsIngredients from "../../../ingredient/forms/PrefsIngredients";

export default {
  emits: ["filter"],
  components: {
    PrefsIngredients,
  },
  data() {
    return {
      name: "",
      fromDate: "",
      toDate: "",
      selectedIngredientsOptions: [],
      isPrefsIngredientsModalOpen: false,
      isPrefsIngredientsPopoverOpen: false,
    };
  },
  computed: {
    selectedIngredientValues() {
      return this.selectedIngredientsOptions.map((option) => option.value);
    },
    selectedIngredientKeys() {
      return this.selectedIngredientsOptions.map((option) => option.key);
    },
  },
  methods: {
    togglePrefsIngredientsModal() {
      this.isPrefsIngredientsModalOpen = !this.isPrefsIngredientsModalOpen;
    },
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
        ...(this.selectedIngredientsOptions.length > 0 && {
          prefsIngredients: this.selectedRecipeKeys,
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
