<template>
  <form class="multiple-finder">
    <label>Prefs. Categorías de Ingrediente</label>
    <multiple-finder-input
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @input="filterOptions"
      :options="ingredientCategories"
      chip-color="success"
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
  },
  computed: {
    ...mapGetters({
      ingredientCategories: "finder/ingredientCategoryValues",
    }),
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
<style lang="scss" scoped>
.multiple-finder {
  min-height: 300px;
}
</style>
