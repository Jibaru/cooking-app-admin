<template>
  <div class="table-container">
    <table>
      <thead>
        <slot name="head"></slot>
      </thead>
      <tbody>
        <slot name="body"></slot>
      </tbody>
    </table>
    <div class="pagination">
      <div>
        <button>Prev</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>Next</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
}

table {
  width: 100%;

  thead {
    background-color: $app-primary-color;
    color: $app-secondary-font-color;
  }
}

.pagination {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;

  div {
    width: fit-content;
  }
}
</style>
