<template>
  <select :value="modelValue" @input="changeModelValue($event)">
    <slot></slot>
  </select>
  <div class="error" v-if="!isValid">
    <slot name="error">
      <span>El campo es inválido</span>
    </slot>
  </div>
</template>
<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number],
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
  },
};
</script>
<style lang="scss" scoped>
select {
  @include low-shadow;
  @include input-border;
  height: 1.5rem;
  line-height: 1rem;
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
