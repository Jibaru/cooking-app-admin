<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Región</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(recipeCuisine, index) in recipeCuisines"
        :key="recipeCuisine.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ recipeCuisine.id }}
        </base-cell>
        <base-cell tag="td">
          {{ recipeCuisine.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ recipeCuisine.region }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ recipeCuisine.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${recipeCuisine.id}-recipe-cuisine-actions`"
            :data-id="`${recipeCuisine.id}-recipe-cuisine-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen && selectedRecipeCuisine.id === recipeCuisine.id
            "
            :target-data-id="`${recipeCuisine.id}-recipe-cuisine-actions`"
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
    @select-page="fetchRecipeCuisines"
  />
  <base-modal
    title="Ver Cocina de Receta"
    type="tiny"
    :open="isRecipeCuisinePresentationModalOpen"
    @close="isRecipeCuisinePresentationModalOpen = false"
  >
    <recipe-cuisine-presentation
      :recipe-cuisine-id="selectedRecipeCuisine.id"
      :recipe-cuisine-name="selectedRecipeCuisine.name"
      :recipe-cuisine-region="selectedRecipeCuisine.region"
      :recipe-cuisine-created-at="selectedRecipeCuisine.createdAt"
    />
  </base-modal>
  <base-modal
    title="Eliminar Cocina de Receta"
    type="tiny"
    :open="isDeleteRecipeCuisineModalOpen"
    @close="isDeleteRecipeCuisineModalOpen = false"
  >
    <delete-recipe-cuisine-form
      :recipe-cuisine-id="selectedRecipeCuisine.id"
      :recipe-cuisine-name="selectedRecipeCuisine.name"
      @submit="deleteRecipeCuisine"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import RecipeCuisinePresentation from "../../presentations/RecipeCuisinePresentation";
import DeleteRecipeCuisineForm from "../../forms/DeleteRecipeCuisineForm";

export default {
  components: {
    RecipeCuisinePresentation,
    DeleteRecipeCuisineForm,
  },
  data() {
    return {
      selectedRecipeCuisine: {
        id: null,
        name: null,
        region: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isDeleteRecipeCuisineModalOpen: false,
      isRecipeCuisinePresentationModalOpen: false,
      tableActions: [
        {
          key: "VIEW_RECIPE_CUISINE",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleRecipeCuisinePresentationModal,
        },
        {
          key: "DELETE_RECIPE_CUISINE",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteRecipeCuisineModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      recipeCuisines: "recipeCuisine/recipeCuisines",
      currentPage: "recipeCuisine/currentPage",
      totalPages: "recipeCuisine/totalPages",
    }),
  },
  methods: {
    fetchRecipeCuisines(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch recipeCuisines
    },
    deleteRecipeCuisine({ id }) {
      console.log(id);
      //TODO: Delete recipe tag
      this.toggleDeleteRecipeCuisineModal();
    },
    setSelectedRecipeCuisine(recipeCuisine) {
      if (recipeCuisine) {
        for (const key in this.selectedRecipeCuisine) {
          this.selectedRecipeCuisine[key] = recipeCuisine[key];
        }
      }
    },
    clearSelectedRecipeCuisine() {
      for (const key in this.selectedRecipeCuisine) {
        this.selectedRecipeCuisine[key] = null;
      }
    },
    openPopover(index) {
      const recipeCuisine = this.recipeCuisines[index];
      this.setSelectedRecipeCuisine(recipeCuisine);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedRecipeCuisine();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleDeleteRecipeCuisineModal() {
      this.isDeleteRecipeCuisineModalOpen = !this
        .isDeleteRecipeCuisineModalOpen;
    },
    toggleRecipeCuisinePresentationModal() {
      this.isRecipeCuisinePresentationModalOpen = !this
        .isRecipeCuisinePresentationModalOpen;
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
