<template>
  <section>
    <header>
      <div>
        Creado el: <base-badge>{{ createdAt }}</base-badge>
      </div>
      <h1>{{ subject }}</h1>

      <div>
        Enviado el:
        <base-badge color="success">{{ dateTimeSended }}</base-badge>
      </div>
    </header>
    <p>{{ content }}</p>
    <footer>
      <div>
        Enviado a: <span>{{ userReceiver }}</span>
      </div>
      <div>
        Visto el: <base-badge color="warning">{{ dateTimeViewed }}</base-badge>
      </div>
    </footer>
  </section>
</template>
<script>
export default {
  props: {
    notificationId: {
      type: Number,
    },
    subject: {
      type: String,
    },
    content: {
      type: String,
    },
    dateTimeSended: {
      type: String,
    },
    dateTimeViewed: {
      type: String,
    },
    createdAt: {
      type: String,
    },
    userReceiver: {
      type: String,
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}

div {
  margin-bottom: 0.7rem;
  text-align: right;
}

p {
  margin: 1rem 0;
}
</style>
