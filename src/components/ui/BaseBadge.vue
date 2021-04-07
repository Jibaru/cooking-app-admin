<template>
  <span class="base-badge" :class="badgeClasses">
    <slot></slot>
  </span>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "primary",
      validator(val) {
        const colors = ["primary", "secondary", "success", "danger", "warning"];
        return colors.find((color) => color === val);
      },
    },
  },
  computed: {
    badgeClasses() {
      return {
        [this.color]: !!this.color,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.base-badge {
  @include low-shadow;
  padding: 0.3rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
}

.primary {
  background-color: $app-primary-color;
  color: $app-secondary-font-color;
}

.secondary {
  background-color: $app-secondary-color;
  color: $app-secondary-font-color;
}

.success {
  background-color: $app-success-color;
  color: $app-secondary-font-color;
}

.warning {
  background-color: $app-warning-color;
  color: $app-secondary-font-color;
}

.danger {
  background-color: $app-danger-color;
  color: $app-secondary-font-color;
}
</style>
