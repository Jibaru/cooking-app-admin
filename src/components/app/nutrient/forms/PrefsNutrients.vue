<template>
  <form class="multiple-finder">
    <label>Prefs. Nutrients</label>
    <multiple-finder-input
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
      @input="filterOptions"
      :options="nutrients"
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
      nutrients: "finder/nutrientValues",
    }),
  },
  methods: {
    ...mapActions({
      findNutrients: "finder/findNutrients",
    }),
    filterOptions(value) {
      this.findNutrients({ value });
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
