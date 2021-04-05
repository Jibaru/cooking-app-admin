<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong>
        ¿Desea eliminar la notificación id: {{ notificationId }}?
      </strong>
      <p><b>Motivo:</b> {{ subject }}</p>
      <p><b>Destinatario:</b> {{ userReceiver }}</p>
      <p>
        <b>Leído el:</b>
        <base-badge color="success">{{ dateTimeViewed }}</base-badge>
      </p>
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
    notificationId: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    userReceiver: {
      type: String,
      required: true,
    },
    dateTimeViewed: {
      type: String,
      required: true,
    },
  },
  methods: {
    submitForm() {
      this.$emit("submit", {
        id: this.notificationId,
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
