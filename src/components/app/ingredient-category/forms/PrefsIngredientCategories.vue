<template>
  <form class="multiple-finder" :style="formStyles">
    <label>Prefs. Categorías de Ingrediente</label>
    <multiple-finder-input
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @input="filterOptions"
      :options="ingredientCategories"
      chip-color="success"
      :is-valid="isValid"
    />
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MultipleFinderInput from "@/components/form-element/MultipleFinderInput";

export default {
  emits: ["update:modelValue"],
  components: {
    MultipleFinderInput,
  },
  props: {
    modelValue: {
      required: false,
      default: null,
      validator: (val) => val === null || typeof val === "object",
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    minHeight: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      ingredientCategories: "finder/ingredientCategoryValues",
    }),
    formStyles() {
      return {
        "min-height": this.minHeight,
      };
    },
  },
  methods: {
    ...mapActions({
      findIngredientCategories: "finder/findIngredientCategories",
    }),
    filterOptions(value) {
      this.findIngredientCategories({ value });
    },
    updateModelValue(options) {
      this.$emit("update:modelValue", options);
    },
  },
};
</script>
