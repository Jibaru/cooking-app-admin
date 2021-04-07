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
        v-for="(recipeTag, index) in recipeTags"
        :key="recipeTag.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ recipeTag.id }}
        </base-cell>
        <base-cell tag="td">
          {{ recipeTag.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ recipeTag.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${recipeTag.id}-recipe-tag-actions`"
            :data-id="`${recipeTag.id}-recipe-tag-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedRecipeTag.id === recipeTag.id"
            :target-data-id="`${recipeTag.id}-recipe-tag-actions`"
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
    @select-page="fetchRecipeTags"
  />
  <base-modal
    title="Ver Tag de Receta"
    type="tiny"
    :open="isRecipeTagPresentationModalOpen"
    @close="isRecipeTagPresentationModalOpen = false"
  >
    <recipe-tag-presentation
      :recipe-tag-id="selectedRecipeTag.id"
      :recipe-tag-name="selectedRecipeTag.name"
      :recipe-tag-created-at="selectedRecipeTag.createdAt"
    />
  </base-modal>
  <base-modal
    title="Eliminar Tag de Receta"
    type="tiny"
    :open="isDeleteRecipeTagModalOpen"
    @close="isDeleteRecipeTagModalOpen = false"
  >
    <delete-recipe-tag-form
      :recipe-tag-id="selectedRecipeTag.id"
      :recipe-tag-name="selectedRecipeTag.name"
      @submit="deleteRecipeTag"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import RecipeTagPresentation from "../presentations/RecipeTagPresentation";
import DeleteRecipeTagForm from "../forms/DeleteRecipeTagForm";

export default {
  components: {
    RecipeTagPresentation,
    DeleteRecipeTagForm,
  },
  data() {
    return {
      selectedRecipeTag: {
        id: null,
        name: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isDeleteRecipeTagModalOpen: false,
      isRecipeTagPresentationModalOpen: false,
      tableActions: [
        {
          key: "VIEW_RECIPE_TAG",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleRecipeTagPresentationModal,
        },
        {
          key: "DELETE_RECIPE_TAG",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteRecipeTagModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      recipeTags: "recipeTag/recipeTags",
      currentPage: "recipeTag/currentPage",
      totalPages: "recipeTag/totalPages",
    }),
  },
  methods: {
    fetchRecipeTags(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch recipeTags
    },
    deleteRecipeTag({ id }) {
      console.log(id);
      //TODO: Delete recipe tag
      this.toggleDeleteRecipeTagModal();
    },
    setSelectedRecipeTag(recipeTag) {
      if (recipeTag) {
        for (const key in this.selectedRecipeTag) {
          this.selectedRecipeTag[key] = recipeTag[key];
        }
      }
    },
    clearSelectedRecipeTag() {
      for (const key in this.selectedRecipeTag) {
        this.selectedRecipeTag[key] = null;
      }
    },
    openPopover(index) {
      const recipeTag = this.recipeTags[index];
      this.setSelectedRecipeTag(recipeTag);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedRecipeTag();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleDeleteRecipeTagModal() {
      this.isDeleteRecipeTagModalOpen = !this.isDeleteRecipeTagModalOpen;
    },
    toggleRecipeTagPresentationModal() {
      this.isRecipeTagPresentationModalOpen = !this
        .isRecipeTagPresentationModalOpen;
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
