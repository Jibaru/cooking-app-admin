<template>
  <section>
    <picture>
      <img :src="ingredientImageUrl" alt="ingredient-image" />
    </picture>
    <h1>{{ ingredientName }}</h1>
    <p>
      {{ ingredientDescription }}
    </p>
    <div>
      <p>
        <b>Estado:</b> <base-badge>{{ ingredientStatus }}</base-badge>
      </p>
      <p>
        <b>Creado el:</b> <base-badge>{{ ingredientCreatedAt }}</base-badge>
      </p>
      <h2>Categorías de Ingrediente</h2>
      <ul>
        <li
          v-for="ingredientCategory in ingredientCategories"
          :key="ingredientCategory.id"
        >
          <base-badge color="success">
            {{ ingredientCategory.name }}
          </base-badge>
        </li>
      </ul>
      <h2>Información Nutricional</h2>
      <nutritional-information-table
        :model-value="nutritionalInformations"
        hide-actions
      />
    </div>
  </section>
</template>
<script>
import NutritionalInformationTable from "../../nutrient/tables/NutritionalInformationTable";

export default {
  components: {
    NutritionalInformationTable,
  },
  props: {
    ingredientId: {
      type: Number,
      required: true,
    },
    ingredientImageUrl: {
      type: String,
      required: true,
    },
    ingredientName: {
      type: String,
      required: true,
    },
    ingredientDescription: {
      type: String,
      required: true,
    },
    ingredientStatus: {
      type: String,
      required: true,
    },
    ingredientCreatedAt: {
      type: String,
      required: true,
    },
    ingredientCategories: {
      type: Array,
      required: true,
    },
    nutritionalInformations: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
section {
  padding: 0.5rem;

  picture {
    text-align: center;
    display: block;
  }

  h1 {
    font-weight: 500;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  h2 {
    font-weight: 500;
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

  ul {
    margin: 1rem 0;

    li {
      display: inline-block;
      margin-right: 0.2rem;
    }
  }
}
</style>
