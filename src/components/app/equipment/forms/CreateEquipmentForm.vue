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
    };
  },
  computed: {
    isValidForm() {
      return (
        this.imageFile.isValid && this.name.isValid && this.description.isValid
      );
    },
    isEditingEquipment() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingEquipment ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingEquipment ? "Modificar Material" : "Crear Material";
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
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingEquipment
        ? "submit-edit"
        : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingEquipment && {
          equipmentId: this.currentId,
        }),
        ...(this.imageFile.val !== null && {
          imageFile: this.imageFile.val,
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
