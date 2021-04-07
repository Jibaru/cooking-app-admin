<template>
  <section>
    <h1>{{ fileDataName }}</h1>
    <picture>
      <img :src="fileDataUrl" alt="file" />
    </picture>
    <div>
      <p>
        <b>Creado el:</b> <base-badge>{{ fileDataCreatedAt }}</base-badge>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    fileDataId: {
      type: Number,
      required: true,
    },
    fileDataName: {
      type: String,
      required: true,
    },
    fileDataUrl: {
      type: String,
      required: true,
    },
    fileDataCreatedAt: {
      type: String,
      required: true,
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

  picture {
    display: flex;
    justify-content: center;

    img {
      max-height: 10rem;
    }
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
