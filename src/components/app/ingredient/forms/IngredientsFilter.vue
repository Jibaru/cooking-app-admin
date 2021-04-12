<template>
  <form @submit.prevent="submitFilter">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-6">
        <label>Nombre</label>
        <base-input v-model.trim="name" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Desde</label>
        <base-input type="date" v-model="fromDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Hasta</label>
        <base-input type="date" v-model="toDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Estado</label>
        <base-select v-model="ingredientState">
          <base-option value="#" selected>
            Todos
          </base-option>
          <base-option
            v-for="ingredientState in ingredientStates"
            :key="ingredientState.value"
            :value="ingredientState.value"
          >
            {{ ingredientState.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button
          type="button"
          @click="togglePrefsCategoriesModal"
          @mouseenter="isPrefsCategoriesPopoverOpen = true"
          @mouseleave="isPrefsCategoriesPopoverOpen = false"
          class="popover-target"
          data-id="prefs-categories-btn"
          block
        >
          Pref. Categorías
        </base-button>
        <base-modal
          title="Preferencias de categorías"
          type="small"
          :open="isPrefsCategoriesModalOpen"
          @close="togglePrefsCategoriesModal"
        >
          <prefs-ingredient-categories
            v-model="selectedCategoryOptions"
            min-height="300px"
          />
        </base-modal>
        <base-popover
          target-data-id="prefs-categories-btn"
          :open="isPrefsCategoriesPopoverOpen"
        >
          <base-simple-list
            v-if="selectedCategoryOptions.length > 0"
            :elements="selectedCategoryValues"
          />
          <span v-else>Sin categorías</span>
        </base-popover>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button
          type="button"
          @click="togglePrefsNutrientsModal"
          @mouseenter="isPrefsNutrientsPopoverOpen = true"
          @mouseleave="isPrefsNutrientsPopoverOpen = false"
          class="popover-target"
          data-id="prefs-nutrients-btn"
          block
        >
          Pref. Nutrientes
        </base-button>
        <base-modal
          title="Preferencias de nutrientes"
          type="small"
          :open="isPrefsNutrientsModalOpen"
          @close="togglePrefsNutrientsModal"
        >
          <prefs-nutrients v-model="selectedNutrientOptions" />
        </base-modal>
        <base-popover
          target-data-id="prefs-nutrients-btn"
          :open="isPrefsNutrientsPopoverOpen"
        >
          <base-simple-list
            v-if="selectedNutrientOptions.length > 0"
            :elements="selectedNutrientValues"
          />
          <span v-else>Sin nutrientes</span>
        </base-popover>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button
          type="button"
          @click="togglePrefsRecipesModal"
          @mouseenter="isPrefsRecipesPopoverOpen = true"
          @mouseleave="isPrefsRecipesPopoverOpen = false"
          class="popover-target"
          data-id="prefs-recipes-btn"
          block
        >
          Pref. Recetas
        </base-button>
        <base-modal
          title="Preferencias de recetas"
          type="small"
          :open="isPrefsRecipesModalOpen"
          @close="togglePrefsRecipesModal"
        >
          <prefs-recipes v-model="selectedRecipeOptions" />
        </base-modal>
        <base-popover
          target-data-id="prefs-recipes-btn"
          :open="isPrefsRecipesPopoverOpen"
        >
          <base-simple-list
            v-if="selectedRecipeOptions.length > 0"
            :elements="selectedRecipeValues"
          />
          <span v-else>Sin recetas</span>
        </base-popover>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import PrefsIngredientCategories from "../../ingredient-category/forms/PrefsIngredientCategories";
import PrefsNutrients from "../../nutrient/forms/PrefsNutrients";
import PrefsRecipes from "../../recipe/forms/PrefsRecipes";

export default {
  emits: ["filter"],
  components: {
    PrefsIngredientCategories,
    PrefsNutrients,
    PrefsRecipes,
  },
  data() {
    return {
      name: "",
      fromDate: "",
      toDate: "",
      ingredientState: "#",
      selectedNutrientOptions: [],
      selectedCategoryOptions: [],
      selectedRecipeOptions: [],
      isPrefsNutrientsModalOpen: false,
      isPrefsNutrientsPopoverOpen: false,
      isPrefsCategoriesModalOpen: false,
      isPrefsCategoriesPopoverOpen: false,
      isPrefsRecipesModalOpen: false,
      isPrefsRecipesPopoverOpen: false,
    };
  },
  computed: {
    ...mapGetters({
      ingredientStates: "combo/ingredientStates",
    }),
    selectedNutrientValues() {
      return this.selectedNutrientOptions.map((option) => option.value);
    },
    selectedNutrientKeys() {
      return this.selectedNutrientOptions.map((option) => option.key);
    },
    selectedCategoryValues() {
      return this.selectedCategoryOptions.map((option) => option.value);
    },
    selectedCategoryKeys() {
      return this.selectedCategoryOptions.map((option) => option.key);
    },
    selectedRecipeValues() {
      return this.selectedRecipeOptions.map((option) => option.value);
    },
    selectedRecipeKeys() {
      return this.selectedRecipeOptions.map((option) => option.key);
    },
  },
  methods: {
    togglePrefsNutrientsModal() {
      this.isPrefsNutrientsModalOpen = !this.isPrefsNutrientsModalOpen;
    },
    togglePrefsCategoriesModal() {
      this.isPrefsCategoriesModalOpen = !this.isPrefsCategoriesModalOpen;
    },
    togglePrefsRecipesModal() {
      this.isPrefsRecipesModalOpen = !this.isPrefsRecipesModalOpen;
    },
    submitFilter() {
      const filters = {
        ...(this.name !== "" && {
          name: this.name,
        }),
        ...(this.toDate !== "" && {
          toDate: this.toDate,
        }),
        ...(this.fromDate !== "" && {
          fromDate: this.fromDate,
        }),
        ...(this.ingredientState !== "#" && {
          ingredientState: this.ingredientState,
        }),
        ...(this.selectedNutrientOptions.length > 0 && {
          prefsNutrients: this.selectedNutrientKeys,
        }),
        ...(this.selectedCategoryOptions.length > 0 && {
          prefsCategories: this.selectedCategoryKeys,
        }),
        ...(this.selectedRecipeOptions.length > 0 && {
          prefsRecipes: this.selectedRecipeKeys,
        }),
      };

      this.$emit("filter", filters);
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
