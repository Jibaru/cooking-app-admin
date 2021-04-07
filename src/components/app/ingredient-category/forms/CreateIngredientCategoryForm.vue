<template>
  <form @submit.prevent="submitForm">
    <div class="row">
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

export default {
  emits: ["submit-create", "submit-edit"],
  props: {
    currentId: {
      type: Number,
    },
    currentName: {
      type: String,
      default: "",
    },
    currentDescription: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      name: {
        val: this.currentName,
        isValid: true,
      },
      description: {
        val: this.currentDescription,
        isValid: true,
      },
    };
  },
  computed: {
    isValidForm() {
      return this.name.isValid && this.description.isValid;
    },
    isEditingIngredientCategory() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingIngredientCategory ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingIngredientCategory
        ? "Modificar Categoría de Ingrediente"
        : "Crear Categoría de Ingrediente";
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
      isEmail: Validators.isEmail,
    },
    validateName() {
      this.name.isValid = !this.isEmpty(this.name.val);
    },
    validateDescription() {
      this.description.isValid = !this.isEmpty(this.description.val);
    },
    validateFields() {
      this.validateName();
      this.validateDescription();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingIngredientCategory
        ? "submit-edit"
        : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingIngredientCategory && {
          nutrientId: this.currentId,
        }),
        name: this.name.val,
        description: this.description.val,
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
