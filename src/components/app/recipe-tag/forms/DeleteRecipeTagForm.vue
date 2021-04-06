<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong> ¿Desea eliminar el tag de receta id: {{ recipeTagId }}? </strong>
      <p><b>Nombre:</b> {{ recipeTagName }}</p>
    </div>
    <div class="flex-end">
      <base-button type="submit">
        Aceptar
      </base-button>
    </div>
  </form>
</template>
<script>
export default {
  emits: ["submit"],
  props: {
    recipeTagId: {
      type: Number,
      required: true,
    },
    recipeTagName: {
      type: String,
      required: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        id: this.recipeTagId,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;

.info {
  padding: 0.5rem;

  strong {
    font-weight: 500;
    text-align: center;
    margin-bottom: 1rem;
    display: block;
  }

  b {
    font-weight: 700;
  }

  p {
    display: flex;
    justify-content: space-between;
    text-align: right;
  }
}
</style>
