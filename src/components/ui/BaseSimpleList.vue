<template>
  <ul :style="baseSimpleListStyles">
    <li v-for="element in elements" :key="element">
      <span v-if="prefix">{{ prefix }}</span> {{ element }}
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
    maxHeight: {
      type: String,
      required: false,
    },
    prefix: {
      type: String,
      required: false,
    },
  },
  computed: {
    baseSimpleListStyles() {
      return {
        "max-height": this.maxHeight,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  overflow: auto;
}
</style>
