<template>
  <input
    :type="type"
    :value="modelValue"
    @input="changeModelValue"
    :bind="$attrs"
    @blur="focusOut"
  />
  <div class="error" v-if="!isValid">
    <slot name="error">
      <span>El campo es inválido</span>
    </slot>
  </div>
</template>
<script>
export default {
  emits: ["update:modelValue", "blur"],
  props: {
    modelValue: {
      required: false,
      default: null,
      validator: (val) =>
        val === null || typeof val === "string" || typeof val === "number",
    },
    type: {
      type: String,
      default: "text",
      required: false,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    changeModelValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
    focusOut() {
      this.$emit("blur");
    },
  },
};
</script>
<style lang="scss" scoped>
input {
  @include input-border;
  @include low-shadow;
  height: 1.5rem;
  padding: 1;
  width: 100%;

  &:focus,
  &:active {
    outline-color: $app-primary-color;
    outline-style: solid;
  }
}

.error {
  color: $app-danger-color;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}
</style>
