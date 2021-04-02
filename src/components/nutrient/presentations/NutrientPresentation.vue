<template>
  <section>
    <h1>{{ nutrientName }}</h1>
    <h2>Ingredientes que lo poseen</h2>
    <base-simple-list
      :elements="ingredientNames"
      prefix="·"
      max-height="20rem"
    />
  </section>
</template>
<script>
export default {
  props: {
    nutrientId: {
      type: Number,
      required: true,
    },
    nutrientName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ingredientNames: [...Array(11).keys()].map((id) => {
        return "Ingredient " + id;
      }),
    };
  },
};
</script>
<style lang="scss" scoped>
section {
  padding: 0.5rem;

  h1 {
    font-weight: 500;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  h2 {
    font-weight: 600;
    font-size: 1rem;
  }
}
</style>
