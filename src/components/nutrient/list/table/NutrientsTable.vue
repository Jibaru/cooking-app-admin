<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(nutrient, index) in nutrients"
        :key="nutrient.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ nutrient.id }}
        </base-cell>
        <base-cell tag="td">
          {{ nutrient.name }}
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${nutrient.id}-nutrient-actions`"
            :data-id="`${nutrient.id}-nutrient-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedNutrient.id === nutrient.id"
            :target-data-id="`${nutrient.id}-nutrient-actions`"
            @click-outside="closePopover"
            location="left"
            no-padding
          >
            <base-table-actions
              :actions="tableActions"
              @select-action="openActionModal"
            />
          </base-popover>
        </base-cell>
      </tr>
    </template>
  </base-table>
  <base-pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="fetchNutrients"
  />
  <base-modal
    title="Ver Nutriente"
    type="tiny"
    :open="isNutrientPresentationModalOpen"
    @close="isNutrientPresentationModalOpen = false"
  >
    <nutrient-presentation
      :nutrient-id="selectedNutrient.id"
      :nutrient-name="selectedNutrient.name"
    />
  </base-modal>
  <base-modal
    title="Editar Nutriente"
    type="small"
    :open="isEditNutrientModalOpen"
    @close="isEditNutrientModalOpen = false"
  >
    <create-nutrient-form
      :current-id="selectedNutrient.id"
      :current-name="selectedNutrient.name"
      @submit-edit="editNutrient"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import NutrientPresentation from "../../presentations/NutrientPresentation";
import CreateNutrientForm from "../../forms/CreateNutrientForm";

export default {
  components: {
    NutrientPresentation,
    CreateNutrientForm,
  },
  data() {
    return {
      selectedNutrient: {
        id: null,
        name: null,
      },
      isPopoverOpen: false,
      isNutrientPresentationModalOpen: false,
      isEditNutrientModalOpen: false,
      tableActions: [
        {
          key: "VIEW_NUTRIENT",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleNutrientPresentationModal,
        },
        {
          key: "EDIT_NUTRIENT",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
          action: this.toggleEditNutrientModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      nutrients: "nutrient/nutrients",
      currentPage: "nutrient/currentPage",
      totalPages: "nutrient/totalPages",
    }),
  },
  methods: {
    fetchNutrients(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch Nutrients
    },
    editNutrient(nutrient) {
      // TODO: Edit Nutrient
      console.log(nutrient);
      this.toggleEditNutrientModal();
    },
    setSelectedNutrient(nutrient) {
      if (nutrient) {
        for (const key in this.selectedNutrient) {
          this.selectedNutrient[key] = nutrient[key];
        }
      }
    },
    clearSelectedNutrient() {
      for (const key in this.selectedNutrient) {
        this.selectedNutrient[key] = null;
      }
    },
    openPopover(index) {
      const nutrient = this.nutrients[index];
      this.setSelectedNutrient(nutrient);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedNutrient();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions.find((action) => action.key === actionKey)?.action();
      this.isPopoverOpen = false;
    },
    toggleNutrientPresentationModal() {
      this.isNutrientPresentationModalOpen = !this
        .isNutrientPresentationModalOpen;
    },
    toggleEditNutrientModal() {
      this.isEditNutrientModalOpen = !this.isEditNutrientModalOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
.striped-row {
  background-color: $app-striped-row-color;
  color: $app-striped-row-font-color;
}
</style>
