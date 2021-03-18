<template>
  <input :type="type" :value="modelValue" @input="changeModelValue" />
</template>
<script>
export default {
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
  },
  emits: ["update:modelValue"],
  methods: {
    changeModelValue(event) {
      this.$emit("update:modelValue", event.target.value);
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
</style>
