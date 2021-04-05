<template>
  <form class="multiple-finder">
    <label>Prefs. Ingredients</label>
    <multiple-finder-input
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @input="filterOptions"
      :options="ingredients"
      chip-color="success"
    />
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import MultipleFinderInput from "../../../form-element/MultipleFinderInput";

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
      ingredients: "finder/ingredientValues",
    }),
  },
  methods: {
    ...mapActions({
      findIngredients: "finder/findIngredients",
    }),
    filterOptions(value) {
      this.findIngredients({ value });
    },
    updateModelValue(options) {
      this.$emit("update:modelValue", options);
    },
  },
  mounted() {
    this.myOptions = this.options;
  },
};
</script>
<style lang="scss" scoped>
.multiple-finder {
  min-height: 300px;
}
</style>
