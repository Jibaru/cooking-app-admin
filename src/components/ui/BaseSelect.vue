<template>
  <select :value="modelValue" @input="changeModelValue($event)">
    <slot></slot>
  </select>
</template>
<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: [String, Number],
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
</style>
