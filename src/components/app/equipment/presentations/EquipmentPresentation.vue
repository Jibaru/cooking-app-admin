<template>
  <section>
    <picture>
      <img :src="equipmentImageUrl" alt="equipment-image" />
    </picture>
    <h1>{{ equipmentName }}</h1>
    <p>
      {{ equipmentDescription }}
    </p>
    <div>
      <p>
        <b>Estado:</b> <base-badge>{{ equipmentStatus }}</base-badge>
      </p>
      <p>
        <b>Creado el:</b> <base-badge>{{ equipmentCreatedAt }}</base-badge>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    equipmentId: {
      type: Number,
      required: true,
    },
    equipmentImageUrl: {
      type: String,
      required: true,
    },
    equipmentName: {
      type: String,
      required: true,
    },
    equipmentDescription: {
      type: String,
      required: true,
    },
    equipmentStatus: {
      type: String,
      required: true,
    },
    equipmentCreatedAt: {
      type: String,
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
