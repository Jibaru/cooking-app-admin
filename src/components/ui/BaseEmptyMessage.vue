<template>
  <p>
    <base-icon type="fas" icon="sad-tear" class="secondary" /> <br />
    {{ message }}
  </p>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: "Sin elementos",
    },
  },
};
</script>
<style lang="scss" scoped>
p {
  text-align: center;
  color: $app-secondary-color;
  font-size: 0.7rem;
}
</style>
