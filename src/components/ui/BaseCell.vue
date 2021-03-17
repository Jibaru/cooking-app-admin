<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: "td",
      validator: (val) => {
        const tags = ["td", "th"];
        return tags.find((tag) => tag === val);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
td,
th {
  padding: 10px;
  text-align: center;
}
</style>
