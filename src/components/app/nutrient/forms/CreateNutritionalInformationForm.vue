<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-4">
        <label>Nutriente</label>
        <single-finder-input
          v-model="nutrient.val"
          :options="nutrients"
          @input="findNutrientOptions"
          @update:modelValue="validateNutrient"
          :is-valid="nutrient.isValid"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-4">
        <label>Cantidad</label>
        <base-input
          type="number"
          v-model="amount.val"
          :is-valid="amount.isValid"
          @blur="validateAmount"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-4">
        <label>Unidades</label>
        <base-select v-model="unit.val" :is-valid="unit.isValid">
          <base-option
            v-for="unit in units"
            :key="unit.value"
            :value="unit.value"
          >
            {{ unit.name }}
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
import { mapActions, mapGetters } from "vuex";
import Validators from "@/utils/validators";
import SingleFinderInput from "@/components/form-element/SingleFinderInput";

export default {
  emits: ["submit-create"],
  components: {
    SingleFinderInput,
  },
  data() {
    return {
      amount: {
        val: null,
        isValid: true,
      },
      unit: {
        val: null,
        isValid: true,
      },
      nutrient: {
        val: null,
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      nutrients: "finder/nutrientValues",
      units: "combo/units",
    }),
    isValidForm() {
      return this.amount.isValid && this.unit.isValid;
    },
    submitButtonColor() {
      return "success";
    },
    submitButtonText() {
      return "Crear Información Nutricional";
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    ...mapActions({
      findNutrients: "finder/findNutrients",
    }),
    findNutrientOptions(value) {
      this.findNutrients({ value });
    },
    clearFields() {
      this.amount.val = null;
      this.nutrient.val = null;
      this.unit.val = null;
    },
    validateAmount() {
      this.amount.isValid =
        this.amount.val !== null && typeof this.amount.val === "number";
    },
    validateNutrient() {
      this.nutrient.isValid = this.nutrient.val !== null;
    },
    validateUnit() {
      this.unit.isValid = this.unit.val !== null;
    },
    validateFields() {
      this.validateAmount();
      this.validateNutrient();
      this.validateUnit();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit-create", {
        nutrientId: this.nutrient.val.key,
        nutrientName: this.nutrient.val.value,
        amount: this.amount.val,
        unit: this.unit.val,
      });

      this.clearFields();
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
