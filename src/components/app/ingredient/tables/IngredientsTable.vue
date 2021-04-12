<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Estado</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(ingredient, index) in ingredients"
        :key="ingredient.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ ingredient.id }}
        </base-cell>
        <base-cell tag="td">
          {{ ingredient.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ ingredient.status }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ ingredient.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${ingredient.id}-ingredient-actions`"
            :data-id="`${ingredient.id}-ingredient-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedIngredient.id === ingredient.id"
            :target-data-id="`${ingredient.id}-ingredient-actions`"
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
    @select-page="fetchIngredients"
  />
  <base-modal
    title="Ver Ingrediente"
    type="small"
    :open="isIngredientPresentationModalOpen"
    @close="isIngredientPresentationModalOpen = false"
  >
    <ingredient-presentation
      :ingredient-id="selectedIngredient.id"
      :ingredient-image-url="selectedIngredient.image.base64Url"
      :ingredient-name="selectedIngredient.name"
      :ingredient-description="selectedIngredient.description"
      :ingredient-status="selectedIngredient.status"
      :ingredient-created-at="selectedIngredient.createdAt"
      :ingredient-categories="selectedIngredient.ingredientCategories"
      :nutritional-informations="
        selectedIngredient.nutrients?.map((nutrient) => ({
          nutrientId: nutrient.id,
          nutrientName: nutrient.name,
          unit: nutrient.amount.units,
          amount: nutrient.amount.value,
        }))
      "
    />
  </base-modal>
  <base-modal
    title="Editar Ingrediente"
    type="medium"
    :open="isEditIngredientModalOpen"
    @close="isEditIngredientModalOpen = false"
  >
    <create-ingredient-form
      :current-id="selectedIngredient.id"
      :current-name="selectedIngredient.name"
      :current-image-url="selectedIngredient.image.base64Url"
      :current-description="selectedIngredient.description"
      :current-ingredient-category-options="
        selectedIngredient.ingredientCategories?.map((ic) => ({
          key: ic.id,
          value: ic.name,
        }))
      "
      :current-nutritional-informations="
        selectedIngredient.nutrients?.map((nutrient) => ({
          nutrientId: nutrient.id,
          nutrientName: nutrient.name,
          unit: nutrient.amount.units,
          amount: nutrient.amount.value,
        }))
      "
      @submit-edit="editIngredient"
    />
  </base-modal>
  <base-modal
    title="Cambiar Estado de Ingrediente"
    type="tiny"
    :open="isChangeStatusModalOpen"
    @close="isChangeStatusModalOpen = false"
  >
    <change-ingredient-state-form
      :current-status="selectedIngredient.status"
      :ingredient-id="selectedIngredient.id"
      :ingredient-name="selectedIngredient.name"
      @submit="changeIngredientState"
    />
  </base-modal>
  <base-modal
    title="Eliminar Ingrediente"
    type="tiny"
    :open="isDeleteIngredientModalOpen"
    @close="isDeleteIngredientModalOpen = false"
  >
    <delete-ingredient-form
      :ingredient-id="selectedIngredient.id"
      :ingredient-name="selectedIngredient.name"
      @submit="deleteIngredient"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import IngredientPresentation from "../presentations/IngredientPresentation";
import CreateIngredientForm from "../forms/CreateIngredientForm";
import ChangeIngredientStateForm from "../forms/ChangeIngredientStateForm";
import DeleteIngredientForm from "../forms/DeleteIngredientForm";

export default {
  components: {
    IngredientPresentation,
    CreateIngredientForm,
    ChangeIngredientStateForm,
    DeleteIngredientForm,
  },
  data() {
    return {
      selectedIngredient: {
        id: null,
        name: null,
        description: null,
        image: null,
        ingredientCategories: null,
        nutrients: null,
        status: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isIngredientPresentationModalOpen: false,
      isEditIngredientModalOpen: false,
      isChangeStatusModalOpen: false,
      isDeleteIngredientModalOpen: false,
      tableActions: [
        {
          key: "VIEW_INGREDIENT",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleIngredientPresentationModal,
        },
        {
          key: "EDIT_INGREDIENT",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
          action: this.toggleEditIngredientModal,
        },
        {
          key: "CHANGE_INGREDIENT_STATUS",
          name: "Cambiar estado",
          icon: { name: "exchange-alt", type: "fas" },
          action: this.toggleChangeStatusModal,
        },
        {
          key: "DELETE_INGREDIENT",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteIngredientModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      ingredients: "ingredient/ingredients",
      currentPage: "ingredient/currentPage",
      totalPages: "ingredient/totalPages",
    }),
  },
  methods: {
    fetchIngredients(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch ingredientCategories
    },
    editIngredient(ingredient) {
      // TODO: Edit ingredient
      console.log(ingredient);
      this.toggleEditIngredientModal();
    },
    changeIngredientState({ id, status }) {
      console.log(id, status);
      this.toggleChangeStatusModal();
    },
    deleteIngredient({ id }) {
      console.log(id);
      //TODO: Delete ingredient category
      this.toggleDeleteIngredientModal();
    },
    setSelectedIngredient(ingredient) {
      if (ingredient) {
        for (const key in this.selectedIngredient) {
          this.selectedIngredient[key] = ingredient[key];
        }
      }
    },
    clearSelectedIngredient() {
      for (const key in this.selectedIngredient) {
        this.selectedIngredient[key] = null;
      }
    },
    openPopover(index) {
      const ingredient = this.ingredients[index];
      this.setSelectedIngredient(ingredient);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedIngredient();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleIngredientPresentationModal() {
      this.isIngredientPresentationModalOpen = !this
        .isIngredientPresentationModalOpen;
    },
    toggleEditIngredientModal() {
      this.isEditIngredientModalOpen = !this.isEditIngredientModalOpen;
    },
    toggleChangeStatusModal() {
      this.isChangeStatusModalOpen = !this.isChangeStatusModalOpen;
    },
    toggleDeleteIngredientModal() {
      this.isDeleteIngredientModalOpen = !this.isDeleteIngredientModalOpen;
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
