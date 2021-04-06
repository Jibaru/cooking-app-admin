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
          @click="togglePrefsRecipesModal"
          @mouseenter="isPrefsRecipesPopoverOpen = true"
          @mouseleave="isPrefsRecipesPopoverOpen = false"
          class="popover-target"
          data-id="prefs-recipes-btn"
          block
        >
          Pref. Recetas
        </base-button>
        <base-modal
          title="Preferencias de recetas"
          type="small"
          :open="isPrefsRecipesModalOpen"
          @close="togglePrefsRecipesModal"
        >
          <prefs-recipes v-model="selectedRecipesOptions" />
        </base-modal>
        <base-popover
          target-data-id="prefs-recipes-btn"
          :open="isPrefsRecipesPopoverOpen"
        >
          <base-simple-list
            v-if="selectedRecipesOptions.length > 0"
            :elements="selectedRecipeValues"
          />
          <span v-else>Sin recetas</span>
        </base-popover>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import PrefsRecipes from "./PrefsRecipes";

export default {
  emits: ["filter"],
  components: {
    PrefsRecipes,
  },
  data() {
    return {
      name: "",
      fromDate: "",
      toDate: "",
      selectedRecipesOptions: [],
      isPrefsRecipesModalOpen: false,
      isPrefsRecipesPopoverOpen: false,
    };
  },
  computed: {
    selectedRecipeValues() {
      return this.selectedRecipesOptions.map((option) => option.value);
    },
    selectedRecipeKeys() {
      return this.selectedRecipesOptions.map((option) => option.key);
    },
  },
  methods: {
    togglePrefsRecipesModal() {
      this.isPrefsRecipesModalOpen = !this.isPrefsRecipesModalOpen;
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
        ...(this.selectedRecipesOptions.length > 0 && {
          prefsRecipes: this.selectedRecipeKeys,
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
