<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de ingredientes</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateIngredientModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Ingrediente
        </base-button>
      </div>
    </template>
    <ingredients-filter @filter="searchIngredients" />
  </base-card>
  <base-card>
    <ingredients-table />
  </base-card>
  <base-modal
    title="Nuevo Ingrediente"
    :open="isCreateIngredientModalOpen"
    @close="toggleCreateIngredientModal"
  >
    <create-ingredient-form @submit-create="closeModalAndCreateIngredient" />
  </base-modal>
</template>
<script>
import IngredientsFilter from "@/components/app/ingredient/forms/IngredientsFilter";
import IngredientsTable from "@/components/app/ingredient/tables/IngredientsTable";
import CreateIngredientForm from "@/components/app/ingredient/forms/CreateIngredientForm";

export default {
  components: {
    IngredientsFilter,
    IngredientsTable,
    CreateIngredientForm,
  },
  data() {
    return {
      isCreateIngredientModalOpen: false,
    };
  },
  methods: {
    toggleCreateIngredientModal() {
      this.isCreateIngredientModalOpen = !this.isCreateIngredientModalOpen;
    },
    searchIngredients(filters) {
      // TODO: Search Ingredients
      console.log(filters);
    },
    closeModalAndCreateIngredient(ingredientData) {
      this.toggleCreateIngredientModal();
      // TODO: Create Ingredient
      console.log(ingredientData);
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;

h1 {
  font-size: 1.5rem;
  font-weight: 300;
}
</style>
