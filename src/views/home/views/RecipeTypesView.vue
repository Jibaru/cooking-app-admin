<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de tipos de receta</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateRecipeTypeModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Tipo de Receta
        </base-button>
      </div>
    </template>
    <recipe-types-filter @filter="searchRecipeTypes" />
  </base-card>
  <base-card>
    <recipe-types-table />
  </base-card>
  <base-modal
    title="Nueve Tipo de Receta"
    :open="isCreateRecipeTypeModalOpen"
    @close="toggleCreateRecipeTypeModal"
  >
    <create-recipe-type-form @submit-create="closeModalAndCreateRecipeType" />
  </base-modal>
</template>
<script>
import RecipeTypesFilter from "@/components/app/recipe-type/forms/RecipeTypesFilter";
import RecipeTypesTable from "@/components/app/recipe-type/tables/RecipeTypesTable";
import CreateRecipeTypeForm from "@/components/app/recipe-type/forms/CreateRecipeTypeForm";

export default {
  components: {
    RecipeTypesFilter,
    RecipeTypesTable,
    CreateRecipeTypeForm,
  },
  data() {
    return {
      isCreateRecipeTypeModalOpen: false,
    };
  },
  methods: {
    toggleCreateRecipeTypeModal() {
      this.isCreateRecipeTypeModalOpen = !this.isCreateRecipeTypeModalOpen;
    },
    searchRecipeTypes(filters) {
      // TODO: Search Recipe Types
      console.log(filters);
    },
    closeModalAndCreateRecipeType(recipeTypeData) {
      this.toggleCreateRecipeTypeModal();
      // TODO: Create Recipe Type
      console.log(recipeTypeData);
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
