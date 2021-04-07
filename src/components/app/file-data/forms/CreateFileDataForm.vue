<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <base-file-input
          type="file"
          v-model="file.val"
          :previous-src="currentFileUrl"
          :is-valid="file.isValid"
          @update:modelValue="validateFile"
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
export default {
  emits: ["submit-create", "submit-edit"],
  props: {
    currentId: {
      type: Number,
    },
    currentFileUrl: {
      type: String,
    },
  },
  data() {
    return {
      file: {
        val: null,
        isValid: true,
      },
    };
  },
  computed: {
    isValidForm() {
      return this.file.isValid;
    },
    isEditingFile() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingFile ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingFile ? "Modificar Archivo" : "Crear Archivo";
    },
  },
  methods: {
    validateFile() {
      this.file.isValid = this.file.val !== null;
    },
    validateFields() {
      this.validateFile();
    },
    submitForm() {
      this.validateFile();

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingFile ? "submit-edit" : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingFile && {
          userId: this.currentId,
        }),
        file: this.file.val,
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
