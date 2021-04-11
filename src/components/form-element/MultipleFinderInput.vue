<template>
  <finder-input
    @update:modelValue="addSelectedOption"
    @input="handleInput"
    :options="unselectedOptions"
    :is-valid="isValid"
  />
  <ul v-if="modelValue">
    <li v-for="(option, index) in modelValue" :key="option.key">
      <base-chip @click-remove="removeSelectedOption(index)" :color="chipColor">
        {{ option.value }}
      </base-chip>
    </li>
  </ul>
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
    options: {
      type: Array,
    },
    chipColor: {
      type: String,
      required: false,
      default: "primary",
    },
    isValid: {
      required: false,
      default: true,
    },
  },
  computed: {
    unselectedOptions() {
      const options = this.options;
      const selectedOptions = this.modelValue;
      const filteredOptions =
        selectedOptions.length > 0
          ? options?.filter(
              (option) =>
                selectedOptions?.find(
                  (selectedOption) => selectedOption.key === option.key
                ) === undefined
            )
          : options;
      return filteredOptions;
    },
  },
  methods: {
    addSelectedOption(option) {
      this.updateModelValue([...this.modelValue, option]);
    },
    removeSelectedOption(index) {
      const selectedOptions = this.modelValue.map((option) => {
        return {
          key: option.key,
          value: option.value,
        };
      });
      selectedOptions.splice(index, 1);
      this.updateModelValue(selectedOptions);
    },
    handleInput(value) {
      this.$emit("input", value);
    },
    updateModelValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>
<style lang="scss" scoped>
li {
  display: inline-block;
}
</style>
