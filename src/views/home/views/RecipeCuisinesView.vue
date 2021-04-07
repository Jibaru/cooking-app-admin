<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de cocinas de receta</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateRecipeCuisineModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nueva Cocina de Receta
        </base-button>
      </div>
    </template>
    <recipe-cuisines-filter @filter="searchRecipeCuisines" />
  </base-card>
  <base-card>
    <recipe-cuisines-table />
  </base-card>
  <base-modal
    title="Nueva Cocina de Receta"
    :open="isCreateRecipeCuisineModalOpen"
    @close="toggleCreateRecipeCuisineModal"
  >
    <create-recipe-cuisine-form
      @submit-create="closeModalAndCreateRecipeCuisine"
    />
  </base-modal>
</template>
<script>
import RecipeCuisinesFilter from "@/components/app/recipe-cuisine/forms/RecipeCuisinesFilter";
import RecipeCuisinesTable from "@/components/app/recipe-cuisine/tables/RecipeCuisinesTable";
import CreateRecipeCuisineForm from "@/components/app/recipe-cuisine/forms/CreateRecipeCuisineForm";

export default {
  components: {
    RecipeCuisinesFilter,
    RecipeCuisinesTable,
    CreateRecipeCuisineForm,
  },
  data() {
    return {
      isCreateRecipeCuisineModalOpen: false,
    };
  },
  methods: {
    toggleCreateRecipeCuisineModal() {
      this.isCreateRecipeCuisineModalOpen = !this
        .isCreateRecipeCuisineModalOpen;
    },
    searchRecipeCuisines(filters) {
      // TODO: Search Recipe Cuisines
      console.log(filters);
    },
    closeModalAndCreateRecipeCuisine(recipeCuisineData) {
      this.toggleCreateRecipeCuisineModal();
      // TODO: Create Recipe Tag
      console.log(recipeCuisineData);
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
