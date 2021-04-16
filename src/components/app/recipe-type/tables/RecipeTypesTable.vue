<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(recipeType, index) in recipeTypes"
        :key="recipeType.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ recipeType.id }}
        </base-cell>
        <base-cell tag="td">
          {{ recipeType.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ recipeType.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${recipeType.id}-recipe-type-actions`"
            :data-id="`${recipeType.id}-recipe-type-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedRecipeType.id === recipeType.id"
            :target-data-id="`${recipeType.id}-recipe-type-actions`"
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
    @select-page="fetchRecipeTypes"
  />
  <base-modal
    title="Ver Tipo de Receta"
    type="tiny"
    :open="isRecipeTypePresentationModalOpen"
    @close="isRecipeTypePresentationModalOpen = false"
  >
    <recipe-type-presentation
      :recipe-type-id="selectedRecipeType.id"
      :recipe-type-name="selectedRecipeType.name"
      :recipe-type-description="selectedRecipeType.description"
      :recipe-type-created-at="selectedRecipeType.createdAt"
    />
  </base-modal>
  <base-modal
    title="Eliminar Tipo de Receta"
    type="tiny"
    :open="isDeleteRecipeTypeModalOpen"
    @close="isDeleteRecipeTypeModalOpen = false"
  >
    <delete-recipe-type-form
      :recipe-type-id="selectedRecipeType.id"
      :recipe-type-name="selectedRecipeType.name"
      @submit="deleteRecipeType"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import RecipeTypePresentation from "../presentations/RecipeTypePresentation";
import DeleteRecipeTypeForm from "../forms/DeleteRecipeTypeForm";

export default {
  components: {
    RecipeTypePresentation,
    DeleteRecipeTypeForm,
  },
  data() {
    return {
      selectedRecipeType: {
        id: null,
        name: null,
        description: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isDeleteRecipeTypeModalOpen: false,
      isRecipeTypePresentationModalOpen: false,
      tableActions: [
        {
          key: "VIEW_RECIPE_TAG",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleRecipeTypePresentationModal,
        },
        {
          key: "DELETE_RECIPE_TAG",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteRecipeTypeModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      recipeTypes: "recipeType/recipeTypes",
      currentPage: "recipeType/currentPage",
      totalPages: "recipeType/totalPages",
    }),
  },
  methods: {
    fetchRecipeTypes(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch recipeTypes
    },
    deleteRecipeType({ id }) {
      console.log(id);
      //TODO: Delete recipe type
      this.toggleDeleteRecipeTypeModal();
    },
    setSelectedRecipeType(recipeType) {
      if (recipeType) {
        for (const key in this.selectedRecipeType) {
          this.selectedRecipeType[key] = recipeType[key];
        }
      }
    },
    clearSelectedRecipeType() {
      for (const key in this.selectedRecipeType) {
        this.selectedRecipeType[key] = null;
      }
    },
    openPopover(index) {
      const recipeType = this.recipeTypes[index];
      this.setSelectedRecipeType(recipeType);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedRecipeType();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleDeleteRecipeTypeModal() {
      this.isDeleteRecipeTypeModalOpen = !this.isDeleteRecipeTypeModalOpen;
    },
    toggleRecipeTypePresentationModal() {
      this.isRecipeTypePresentationModalOpen = !this
        .isRecipeTypePresentationModalOpen;
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
