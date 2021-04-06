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
        <label>Región</label>
        <base-select v-model="region.val">
          <base-option
            v-for="region in regions"
            :key="region.value"
            :value="region.value"
          >
            {{ region.name }}
          </base-option>
        </base-select>
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
import { mapGetters } from "vuex";
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
      region: {
        val: "",
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      regions: "combo/regions",
    }),
    isValidForm() {
      return this.name.isValid && this.region.isValid;
    },
    isEditingRecipeCuisine() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingRecipeCuisine ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingRecipeCuisine
        ? "Modificar Receta de Cocina"
        : "Crear Receta de Cocina";
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
      isEmail: Validators.isEmail,
    },
    initializeDefaultSelectValues() {
      if (this.regions.length > 0) {
        this.region.val = this.regions[0].value;
      }
    },
    validateName() {
      this.name.isValid = !this.isEmpty(this.name.val);
    },
    validateRegion() {
      this.region.isValid =
        !this.isEmpty(this.region.val) &&
        !!this.regions &&
        this.regions.map((region) => region.value).indexOf(this.region.val) !==
          -1;
    },
    validateFields() {
      this.validateName();
      this.validateRegion();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingRecipeCuisine
        ? "submit-edit"
        : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingRecipeCuisine && {
          recipeCuisineId: this.currentId,
        }),
        name: this.name.val,
      });
    },
  },
  mounted() {
    this.initializeDefaultSelectValues();
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
