<template>
  <div>
    <base-input
      :modelValue="inputValue"
      @update:modelValue="emitInput"
      @focus="showOptions"
      @blur="hideOptions"
      :is-valid="isOptionsVisible || isValid"
    />
    <ul v-show="isOptionsVisible">
      <li
        v-for="option in options"
        :key="option.key"
        @mousedown="changeModelValue(option)"
        ref="options"
      >
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  emits: ["update:modelValue", "input"],
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
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputValue: "",
      isOptionsVisible: false,
    };
  },
  methods: {
    changeModelValue(option) {
      this.$emit("update:modelValue", { ...option });
    },
    emitInput(value) {
      this.$emit("input", value);
    },
    showOptions() {
      this.isOptionsVisible = true;
    },
    hideOptions() {
      this.isOptionsVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  position: relative;

  ul {
    @include low-shadow;
    padding: 1rem;
    padding-top: 0.5rem;
    background-color: white;
    z-index: 99;
    position: absolute;
    width: 100%;
    max-height: 10rem;
    overflow-y: auto;

    li {
      padding: 0.2rem;
      cursor: pointer;

      &:hover,
      &:active {
        background-color: $app-primary-color;
        color: $app-secondary-font-color;
      }
    }
  }
}
</style>
