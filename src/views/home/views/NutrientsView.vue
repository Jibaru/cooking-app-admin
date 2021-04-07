<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de nutrientes</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateNutrientModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Nutriente
        </base-button>
      </div>
    </template>
    <nutrients-filter @filter="searchNutrients" />
  </base-card>
  <base-card>
    <nutrients-table />
  </base-card>
  <base-modal
    title="Nuevo Nutriente"
    :open="isCreateNutrientModalOpen"
    @close="toggleCreateNutrientModal"
  >
    <create-nutrient-form @submit-create="closeModalAndCreateNutrient" />
  </base-modal>
</template>
<script>
import NutrientsFilter from "@/components/app/nutrient/forms/NutrientsFilter";
import NutrientsTable from "@/components/app/nutrient/tables/NutrientsTable";
import CreateNutrientForm from "@/components/app/nutrient/forms/CreateNutrientForm";

export default {
  components: {
    NutrientsFilter,
    NutrientsTable,
    CreateNutrientForm,
  },
  data() {
    return {
      isCreateNutrientModalOpen: false,
    };
  },
  methods: {
    toggleCreateNutrientModal() {
      this.isCreateNutrientModalOpen = !this.isCreateNutrientModalOpen;
    },
    searchNutrients(filters) {
      // TODO: Search Nutrients
      console.log(filters);
    },
    closeModalAndCreateNutrient(userData) {
      this.toggleCreateNutrientModal();
      // TODO: Create Nutrient
      console.log(userData);
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
