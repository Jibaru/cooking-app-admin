<template>
  <section>
    <h1>{{ ingredientCategoryName }}</h1>
    <div>
      <p>{{ ingredientCategoryDescription }}</p>
      <p>
        <b>Creado el:</b>
        <base-badge>{{ ingredientCategoryCreatedAt }}</base-badge>
      </p>
    </div>
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
    ingredientCategoryId: {
      type: Number,
      required: true,
    },
    ingredientCategoryName: {
      type: String,
      required: true,
    },
    ingredientCategoryDescription: {
      type: String,
      required: true,
    },
    ingredientCategoryCreatedAt: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      // FIXME: Change to fetch data with ingredientCategoryId
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
