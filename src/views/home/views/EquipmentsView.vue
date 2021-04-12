<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de materiales</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateEquipmentModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Material
        </base-button>
      </div>
    </template>
    <equipments-filter @filter="searchEquipments" />
  </base-card>
  <base-card>
    <equipments-table />
  </base-card>
  <base-modal
    title="Nuevo Material"
    :open="isCreateIngredientModalOpen"
    @close="toggleCreateEquipmentModal"
  >
    <create-equipment-form @submit-create="closeModalAndCreateEquipment" />
  </base-modal>
</template>
<script>
import EquipmentsFilter from "@/components/app/equipment/forms/EquipmentsFilter";
import EquipmentsTable from "@/components/app/equipment/tables/EquipmentsTable";
import CreateEquipmentForm from "@/components/app/equipment/forms/CreateEquipmentForm";

export default {
  components: {
    EquipmentsFilter,
    EquipmentsTable,
    CreateEquipmentForm,
  },
  data() {
    return {
      isCreateIngredientModalOpen: false,
    };
  },
  methods: {
    toggleCreateEquipmentModal() {
      this.isCreateIngredientModalOpen = !this.isCreateIngredientModalOpen;
    },
    searchEquipments(filters) {
      // TODO: Search Equipments
      console.log(filters);
    },
    closeModalAndCreateEquipment(equipmentData) {
      this.toggleCreateEquipmentModal();
      // TODO: Create Equipment
      console.log(equipmentData);
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
