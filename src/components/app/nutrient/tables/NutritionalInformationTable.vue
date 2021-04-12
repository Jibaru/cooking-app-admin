<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nutriente</base-cell>
      <base-cell tag="th">Cantidad</base-cell>
      <base-cell tag="th">Unidad</base-cell>
      <base-cell tag="th" v-if="!hideActions">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(nutritionalInformation, index) in modelValue"
        :key="nutritionalInformation.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ nutritionalInformation.nutrientId }}
        </base-cell>
        <base-cell tag="td">
          {{ nutritionalInformation.nutrientName }}
        </base-cell>
        <base-cell tag="td">
          {{ nutritionalInformation.amount }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ nutritionalInformation.unit }}
          </base-badge>
        </base-cell>
        <base-cell tag="td" v-if="!hideActions">
          <base-button
            type="button"
            color="danger"
            @click="removeNutritionalInformation(index)"
          >
            <base-icon icon="trash-alt" type="fas" />
          </base-button>
        </base-cell>
      </tr>
    </template>
  </base-table>
</template>
<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    hideActions: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    removeNutritionalInformation(index) {
      const nutritionalInformations = [...this.modelValue];
      nutritionalInformations.splice(index, 1);
      this.$emit("update:modelValue", nutritionalInformations);
    },
  },
};
</script>
<style lang="scss" scoped>
.striped-row {
  background-color: $app-striped-row-color;
  color: $app-striped-row-font-color;
}
</style>
