<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <base-file-input
          type="file"
          v-model="imageFile.val"
          :previous-src="currentImageUrl"
          :is-valid="imageFile.isValid"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Nombre</label>
        <base-input
          v-model="name.val"
          :is-valid="name.isValid"
          @blur="validateName"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Descripción</label>
        <base-textarea
          v-model="description.val"
          :is-valid="description.isValid"
          @blur="validateDescription"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <prefs-ingredient-categories
          v-model="selectedCategoryOptions.val"
          :is-valid="selectedCategoryOptions.isValid"
          @update:modelValue="validateSelectedCategoryOptions"
        />
      </div>
      <base-card class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <template #header>
          <h3>Agregar Información Nutricional</h3>
        </template>
        <create-nutritional-information-form
          @submit-create="addNutritionalInformation"
        />
        <br />
        <nutritional-information-table
          v-if="selectedNutritionalInformations.val.length > 0"
          v-model="selectedNutritionalInformations.val"
        />
        <base-empty-message v-else />
      </base-card>
    </div>
    <div class="flex-end">
      <base-button type="submit" :color="submitButtonColor">
        {{ submitButtonText }}
      </base-button>
    </div>
  </form>
</template>
<script>
import Validators from "@/utils/validators";
import PrefsIngredientCategories from "../../ingredient-category/forms/PrefsIngredientCategories";
import CreateNutritionalInformationForm from "../../nutrient/forms/CreateNutritionalInformationForm";
import NutritionalInformationTable from "../../nutrient/tables/NutritionalInformationTable";

export default {
  emits: ["submit-create", "submit-edit"],
  components: {
    CreateNutritionalInformationForm,
    PrefsIngredientCategories,
    NutritionalInformationTable,
  },
  props: {
    currentId: {
      type: Number,
    },
    currentImageUrl: {
      type: String,
    },
    currentName: {
      type: String,
      default: "",
    },
    currentDescription: {
      type: String,
      default: "",
    },
    currentIngredientCategoryOptions: {
      type: Array,
      default: () => [],
    },
    currentNutritionalInformations: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      imageFile: {
        val: null,
        isValid: true,
      },
      name: {
        val: this.currentName,
        isValid: true,
      },
      description: {
        val: this.currentDescription,
        isValid: true,
      },
      selectedCategoryOptions: {
        val: this.currentIngredientCategoryOptions,
        isValid: true,
      },
      selectedNutritionalInformations: {
        val: this.currentNutritionalInformations,
        isValid: true,
      },
    };
  },
  computed: {
    isValidForm() {
      return (
        this.imageFile.isValid &&
        this.name.isValid &&
        this.description.isValid &&
        this.selectedCategoryOptions.isValid &&
        this.selectedNutritionalInformations.isValid
      );
    },
    isEditingIngredient() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingIngredient ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingIngredient
        ? "Modificar Ingrediente"
        : "Crear Ingrediente";
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    addNutritionalInformation(nutritionalInformation) {
      this.selectedNutritionalInformations.val.push(nutritionalInformation);
    },
    validateImageFile() {
      this.imageFile.isValid =
        this.imageFile.val !== null || !this.isEmpty(this.currentImageUrl);
    },
    validateName() {
      this.name.isValid = !this.isEmpty(this.name.val);
    },
    validateDescription() {
      this.description.isValid = !this.isEmpty(this.description.val);
    },
    validateSelectedCategoryOptions() {
      this.selectedCategoryOptions.isValid =
        this.selectedCategoryOptions.val.length > 0;
    },
    validateSelectedNutritionalInformations() {
      this.selectedNutritionalInformations.isValid =
        this.selectedNutritionalInformations.val.length > 0;
    },
    validateFields() {
      this.validateImageFile();
      this.validateName();
      this.validateDescription();
      this.validateSelectedCategoryOptions();
      this.validateSelectedNutritionalInformations();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingIngredient
        ? "submit-edit"
        : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingIngredient && {
          ingredientId: this.currentId,
        }),
        ...(this.imageFile.val !== null && {
          imageFile: this.imageFile.val,
        }),
        name: this.name.val,
        description: this.description.val,
        ingredientCategoryIds: this.selectedCategoryOptions.val.map(
          ({ key }) => key
        ),
        nutritionalInformations: this.selectedNutritionalInformations.val.map(
          (nutritionalInformation) => ({ ...nutritionalInformation })
        ),
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
