<template>
  <section>
    <h1>{{ recipeTagName }}</h1>
    <div>
      <p>
        <b>Creado el:</b> <base-badge>{{ recipeTagCreatedAt }}</base-badge>
      </p>
    </div>
    <h2>Recetas que lo poseen</h2>
    <base-simple-list :elements="recipeNames" prefix="·" max-height="20rem" />
  </section>
</template>
<script>
export default {
  props: {
    recipeTagId: {
      type: Number,
      required: true,
    },
    recipeTagName: {
      type: String,
      required: true,
    },
    recipeTagCreatedAt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // FIXME: Change to fetch data with recipeTagId
      recipeNames: [...Array(11).keys()].map((id) => {
        return "Recipe " + id;
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

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    b {
      font-weight: bold;
    }
  }
}
</style>
