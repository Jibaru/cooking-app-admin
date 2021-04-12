<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong> ¿Desea eliminar el ingrediente id: {{ ingredientId }}? </strong>
      <p><b>Nombre:</b> {{ ingredientName }}</p>
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
    ingredientId: {
      type: Number,
      required: true,
    },
    ingredientName: {
      type: String,
      required: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        id: this.ingredientId,
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
