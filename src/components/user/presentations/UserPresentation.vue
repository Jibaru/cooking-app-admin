<template>
  <section>
    <h1>{{ userFullName }}</h1>
    <div>
      <p>
        <b>Email:</b> <span>{{ userEmail }}</span>
      </p>
      <p>
        <b>Rol:</b>
        <base-badge color="success">{{ userRole }}</base-badge>
      </p>
      <p>
        <b>Estado:</b> <base-badge>{{ userStatus }}</base-badge>
      </p>
      <p>
        <b>Creado el:</b> <base-badge>{{ userCreatedAt }}</base-badge>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    userFirstName: {
      type: String,
      required: true,
    },
    userLastName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    userStatus: {
      type: String,
      required: true,
    },
    userCreatedAt: {
      type: String,
      required: true,
    },
  },
  computed: {
    userFullName() {
      return this.userFirstName + " " + this.userLastName;
    },
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
