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
        v-for="(ingredientCategory, index) in ingredientCategories"
        :key="ingredientCategory.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ ingredientCategory.id }}
        </base-cell>
        <base-cell tag="td">
          {{ ingredientCategory.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ ingredientCategory.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${ingredientCategory.id}-ingredient-category-actions`"
            :data-id="`${ingredientCategory.id}-ingredient-category-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="
              isPopoverOpen &&
                selectedIngredientCategory.id === ingredientCategory.id
            "
            :target-data-id="
              `${ingredientCategory.id}-ingredient-category-actions`
            "
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
    @select-page="fetchIngredientCategories"
  />
  <base-modal
    title="Ver Categoría de Ingrediente"
    type="tiny"
    :open="isIngredientCategoryPresentationModalOpen"
    @close="isIngredientCategoryPresentationModalOpen = false"
  >
    <ingredient-category-presentation
      :ingredient-category-id="selectedIngredientCategory.id"
      :ingredient-category-name="selectedIngredientCategory.name"
      :ingredient-category-description="selectedIngredientCategory.description"
      :ingredient-category-created-at="selectedIngredientCategory.createdAt"
    />
  </base-modal>
  <base-modal
    title="Editar Categoría de Ingrediente"
    type="small"
    :open="isEditIngredientCategoryModalOpen"
    @close="isEditIngredientCategoryModalOpen = false"
  >
    <create-ingredient-category-form
      :current-id="selectedIngredientCategory.id"
      :current-name="selectedIngredientCategory.name"
      :current-description="selectedIngredientCategory.description"
      @submit-edit="editIngredientCategory"
    />
  </base-modal>
  <base-modal
    title="Eliminar Categoría de Ingrediente"
    type="tiny"
    :open="isDeleteIngredientCategoryModalOpen"
    @close="isDeleteIngredientCategoryModalOpen = false"
  >
    <delete-ingredient-category-form
      :ingredient-category-id="selectedIngredientCategory.id"
      :ingredient-category-name="selectedIngredientCategory.name"
      @submit="deleteIngredientCategory"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import IngredientCategoryPresentation from "../../presentations/IngredientCategoryPresentation";
import CreateIngredientCategoryForm from "../../forms/CreateIngredientCategoryForm";
import DeleteIngredientCategoryForm from "../../forms/DeleteIngredientCategoryForm";

export default {
  components: {
    IngredientCategoryPresentation,
    CreateIngredientCategoryForm,
    DeleteIngredientCategoryForm,
  },
  data() {
    return {
      selectedIngredientCategory: {
        id: null,
        name: null,
        description: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isIngredientCategoryPresentationModalOpen: false,
      isEditIngredientCategoryModalOpen: false,
      isDeleteIngredientCategoryModalOpen: false,
      tableActions: [
        {
          key: "VIEW_INGREDIENT_CATEGORY",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleIngredientCategoryPresentationModal,
        },
        {
          key: "EDIT_INGREDIENT_CATEGORY",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
          action: this.toggleEditIngredientCategoryModal,
        },
        {
          key: "DELETE_INGREDIENT_CATEGORY",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteIngredientCategoryModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      ingredientCategories: "ingredientCategory/ingredientCategories",
      currentPage: "ingredientCategory/currentPage",
      totalPages: "ingredientCategory/totalPages",
    }),
  },
  methods: {
    fetchIngredientCategories(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch ingredientCategories
    },
    editIngredientCategory(ingredientCategory) {
      // TODO: Edit ingredientCategory
      console.log(ingredientCategory);
      this.toggleEditIngredientCategoryModal();
    },
    deleteIngredientCategory({ id }) {
      console.log(id);
      //TODO: Delete ingredient category
      this.toggleDeleteIngredientCategoryModal();
    },
    setSelectedIngredientCategory(ingredientCategory) {
      if (ingredientCategory) {
        for (const key in this.selectedIngredientCategory) {
          this.selectedIngredientCategory[key] = ingredientCategory[key];
        }
      }
    },
    clearSelectedIngredientCategory() {
      for (const key in this.selectedIngredientCategory) {
        this.selectedIngredientCategory[key] = null;
      }
    },
    openPopover(index) {
      const ingredientCategory = this.ingredientCategories[index];
      this.setSelectedIngredientCategory(ingredientCategory);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedIngredientCategory();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions.find((action) => action.key === actionKey)?.action();
      this.isPopoverOpen = false;
    },
    toggleIngredientCategoryPresentationModal() {
      this.isIngredientCategoryPresentationModalOpen = !this
        .isIngredientCategoryPresentationModalOpen;
    },
    toggleEditIngredientCategoryModal() {
      this.isEditIngredientCategoryModalOpen = !this
        .isEditIngredientCategoryModalOpen;
    },
    toggleDeleteIngredientCategoryModal() {
      this.isDeleteIngredientCategoryModalOpen = !this
        .isDeleteIngredientCategoryModalOpen;
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
