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
  },
  data() {
    return {
      name: {
        val: this.currentName,
        isValid: true,
      },
    };
  },
  computed: {
    isValidForm() {
      return this.name.isValid;
    },
    isEditingRecipeTag() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingRecipeTag ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingRecipeTag
        ? "Modificar Tag de Receta"
        : "Crear Tag de Receta";
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
    validateFields() {
      this.validateName();
    },
    submitForm() {
      this.validateFields();
      console.log(this.isEmpty(this.name.val), this.name.val);

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingRecipeTag
        ? "submit-edit"
        : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingRecipeTag && {
          nutrientId: this.currentId,
        }),
        name: this.name.val,
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
