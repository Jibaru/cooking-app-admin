<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de categorías de ingredientes</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateIngredientCategoryModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nueva Categoría de Ingrediente
        </base-button>
      </div>
    </template>
    <ingredient-categories-filter @filter="searchIngredientCategories" />
  </base-card>
  <base-card>
    <ingredient-categories-table />
  </base-card>
  <base-modal
    title="Nueva Categoría de Ingrediente"
    :open="isCreateIngredientCategoryModalOpen"
    @close="toggleCreateIngredientCategoryModal"
  >
    <create-ingredient-category-form
      @submit-create="closeModalAndCreateIngredientCategory"
    />
  </base-modal>
</template>
<script>
import IngredientCategoriesFilter from "@/components/app/ingredient-category/list/filter/IngredientCategoriesFilter";
import IngredientCategoriesTable from "@/components/app/ingredient-category/list/table/IngredientCategoriesTable";
import CreateIngredientCategoryForm from "@/components/app/ingredient-category/forms/CreateIngredientCategoryForm";

export default {
  components: {
    IngredientCategoriesFilter,
    IngredientCategoriesTable,
    CreateIngredientCategoryForm,
  },
  data() {
    return {
      isCreateIngredientCategoryModalOpen: false,
    };
  },
  methods: {
    toggleCreateIngredientCategoryModal() {
      this.isCreateIngredientCategoryModalOpen = !this
        .isCreateIngredientCategoryModalOpen;
    },
    searchIngredientCategories(filters) {
      // TODO: Search Ingredient Categories
      console.log(filters);
    },
    closeModalAndCreateIngredientCategory(ingredientCategoryData) {
      this.toggleCreateIngredientCategoryModal();
      // TODO: Create Ingredient Category
      console.log(ingredientCategoryData);
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
