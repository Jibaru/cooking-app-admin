<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong>
        ¿Desea eliminar el tipo de receta id: {{ recipeTypeId }}?
      </strong>
      <p><b>Nombre:</b> {{ recipeTypeName }}</p>
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
    recipeTypeId: {
      type: Number,
      required: true,
    },
    recipeTypeName: {
      type: String,
      required: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        id: this.recipeTypeId,
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
