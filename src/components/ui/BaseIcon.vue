<template>
  <font-awesome-icon :icon="[prefix, icon]" :key="updateCounter" />
</template>
<script>
export default {
  props: {
    prefix: {
      type: String,
      required: false,
      default: "fas",
      validator: (val) => {
        const prefixes = ["fas", "far"];
        return prefixes.find((prefix) => prefix === val);
      },
    },
    icon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      updateCounter: 0,
    };
  },
  watch: {
    icon() {
      this.updateCounter++;
    },
  },
};
</script>
