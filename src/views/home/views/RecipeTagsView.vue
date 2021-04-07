<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de tags de receta</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateRecipeTagModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Tag de Receta
        </base-button>
      </div>
    </template>
    <recipe-tags-filter @filter="searchRecipeTags" />
  </base-card>
  <base-card>
    <recipe-tags-table />
  </base-card>
  <base-modal
    title="Nueve Tag de Receta"
    :open="isCreateRecipeTagModalOpen"
    @close="toggleCreateRecipeTagModal"
  >
    <create-recipe-tag-form @submit-create="closeModalAndCreateRecipeTag" />
  </base-modal>
</template>
<script>
import RecipeTagsFilter from "@/components/app/recipe-tag/forms/RecipeTagsFilter";
import RecipeTagsTable from "@/components/app/recipe-tag/tables/RecipeTagsTable";
import CreateRecipeTagForm from "@/components/app/recipe-tag/forms/CreateRecipeTagForm";

export default {
  components: {
    RecipeTagsFilter,
    RecipeTagsTable,
    CreateRecipeTagForm,
  },
  data() {
    return {
      isCreateRecipeTagModalOpen: false,
    };
  },
  methods: {
    toggleCreateRecipeTagModal() {
      this.isCreateRecipeTagModalOpen = !this.isCreateRecipeTagModalOpen;
    },
    searchRecipeTags(filters) {
      // TODO: Search Recipe Tags
      console.log(filters);
    },
    closeModalAndCreateRecipeTag(recipeTagData) {
      this.toggleCreateRecipeTagModal();
      // TODO: Create Recipe Tag
      console.log(recipeTagData);
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
