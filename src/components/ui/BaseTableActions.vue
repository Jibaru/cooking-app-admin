<template>
  <ul>
    <li
      v-for="action in actions"
      :key="action.name"
      @click="selectAction(action.name)"
    >
      <a href="#">
        <span>{{ action.name }}</span>
        <base-icon :icon="action.icon.name" :type="action.icon.type" />
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  emits: ["selectAction"],
  props: {
    actions: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectAction(actionName) {
      this.$emit("selectAction", actionName);
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  display: block;

  a {
    padding: 0.5rem 1rem;

    color: $app-primary-font-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

    span {
      white-space: initial;
      text-align: start;
      margin-left: 5px;
    }

    &:hover {
      background-color: $app-primary-color;
      color: $app-secondary-font-color;
    }
  }
}
</style>
