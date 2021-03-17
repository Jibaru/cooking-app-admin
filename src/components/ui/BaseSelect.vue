<template>
  <select>
    <slot></slot>
  </select>
</template>
<style lang="scss" scoped>
select {
  @include low-shadow;
  @include input-border;
  height: 1.5rem;
  line-height: 1rem;
  width: 100%;

  &:focus,
  &:active {
    outline-color: $app-primary-color;
    outline-style: solid;
  }
}
</style>
