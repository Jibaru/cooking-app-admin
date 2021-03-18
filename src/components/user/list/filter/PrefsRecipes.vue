<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <h2>Recetas Creadas</h2>
      </div>
      <div class="row col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label>Mínimo</label>
          <base-input type="number" v-model.number="recipesCreated.min" />
        </div>
        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label>Máximo</label>
          <base-input type="number" v-model.number="recipesCreated.max" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <h2>Recetas Favoritas</h2>
      </div>
      <div class="row col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label>Mínimo</label>
          <base-input type="number" v-model.number="recipesFavorite.min" />
        </div>
        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label>Máximo</label>
          <base-input type="number" v-model.number="recipesFavorite.max" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <h2>Recetas Guardadas</h2>
      </div>
      <div class="row col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label>Mínimo</label>
          <base-input type="number" v-model.number="recipesStored.min" />
        </div>
        <div class="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <label>Máximo</label>
          <base-input type="number" v-model.number="recipesStored.max" />
        </div>
      </div>
    </div>
    <div class="flex-end">
      <base-button type="submit">Aceptar</base-button>
    </div>
  </form>
</template>
<script>
const propValidator = (val) => typeof val === "number" || val === null;

export default {
  emits: ["selected"],
  props: {
    minRecipesCreated: {
      required: true,
      validator: propValidator,
    },
    maxRecipesCreated: {
      required: true,
      validator: propValidator,
    },
    minRecipesFavorite: {
      required: true,
      validator: propValidator,
    },
    maxRecipesFavorite: {
      required: true,
      validator: propValidator,
    },
    minRecipesStored: {
      required: true,
      validator: propValidator,
    },
    maxRecipesStored: {
      required: true,
      validator: propValidator,
    },
  },
  data() {
    return {
      recipesCreated: {
        min: this.minRecipesCreated,
        max: this.maxRecipesCreated,
      },
      recipesFavorite: {
        min: this.minRecipesFavorite,
        max: this.maxRecipesFavorite,
      },
      recipesStored: {
        min: this.minRecipesStored,
        max: this.maxRecipesStored,
      },
    };
  },
  watch: {
    minRecipesCreated(newVal) {
      this.recipesCreated.min = newVal;
    },
    maxRecipesCreated(newVal) {
      this.recipesCreated.max = newVal;
    },
    minRecipesFavorite(newVal) {
      this.recipesFavorite.min = newVal;
    },
    maxRecipesFavorite(newVal) {
      this.recipesFavorite.max = newVal;
    },
    minRecipesStored(newVal) {
      this.recipesStored.min = newVal;
    },
    maxRecipesStored(newVal) {
      this.recipesStored.max = newVal;
    },
  },
  methods: {
    submitForm() {
      this.$emit("selected", {
        recipesCreated: { ...this.recipesCreated },
        recipesFavorite: { ...this.recipesFavorite },
        recipesStored: { ...this.recipesStored },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
