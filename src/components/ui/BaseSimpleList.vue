<template>
  <ul>
    <li v-for="element in elements" :key="element">
      {{ element }}
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    elements: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
