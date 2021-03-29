<template>
  <option :value="value">
    <slot></slot>
  </option>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
