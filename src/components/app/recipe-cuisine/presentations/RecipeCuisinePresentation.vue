<template>
  <section>
    <h1>{{ recipeCuisineName }}</h1>
    <div>
      <p>
        <b>Creado el:</b> <base-badge>{{ recipeCuisineCreatedAt }}</base-badge>
      </p>
      <p>
        <b>Región:</b> <base-badge>{{ recipeCuisineRegion }}</base-badge>
      </p>
    </div>
    <h2>Recetas que lo poseen</h2>
    <base-simple-list :elements="recipeNames" prefix="·" max-height="20rem" />
  </section>
</template>
<script>
export default {
  props: {
    recipeCuisineId: {
      type: Number,
      required: true,
    },
    recipeCuisineName: {
      type: String,
      required: true,
    },
    recipeCuisineRegion: {
      type: String,
      required: true,
    },
    recipeCuisineCreatedAt: {
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
