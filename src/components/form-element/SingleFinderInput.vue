<template>
  <base-chip v-if="modelValue" @click-remove="remove" :color="chipColor" block>
    {{ selectedValue }}
  </base-chip>
  <finder-input
    v-else
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    @input="handleInput"
    :options="options"
    :is-valid="isValid"
  />
</template>
<script>
import FinderInput from "./FinderInput";

export default {
  emits: ["update:modelValue", "input"],
  components: {
    FinderInput,
  },
  props: {
    modelValue: {
      required: false,
      default: null,
      validator: (val) => val === null || typeof val === "object",
    },
    /**
     * Options has a format: [{key: Number, value: String}, ...]
     */
    options: {
      type: Array,
    },
    chipColor: {
      type: String,
      required: false,
      default: "primary",
    },
    isValid: {
      type: Boolean,
    },
  },
  computed: {
    selectedValue() {
      return this.modelValue?.value;
    },
  },
  methods: {
    remove() {
      this.$emit("update:modelValue", null);
      this.$emit("input", "");
    },
    handleInput(value) {
      this.$emit("input", value);
    },
    updateModelValue(option) {
      this.$emit("update:modelValue", option);
    },
  },
};
</script>
