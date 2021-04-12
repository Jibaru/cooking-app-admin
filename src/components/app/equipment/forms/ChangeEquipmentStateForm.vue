<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong>
        ¿Desea cambiar el estado al material id: {{ equipmentId }}?
      </strong>
      <p><b>Nombre:</b> {{ equipmentName }}</p>
    </div>
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Estado</label>
        <base-select v-model="equipmentStatus.val">
          <base-option
            v-for="status in equipmentStates"
            :key="status.value"
            :value="status.value"
          >
            {{ status.name }}
          </base-option>
        </base-select>
      </div>
    </div>
    <div class="flex-end">
      <base-button type="submit">
        Aceptar
      </base-button>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import Validators from "@/utils/validators";

export default {
  emits: ["submit"],
  props: {
    currentStatus: {
      type: String,
      default: "",
    },
    equipmentId: {
      type: Number,
      required: true,
    },
    equipmentName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      equipmentStatus: {
        val: this.currentStatus,
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      equipmentStates: "combo/equipmentStates",
    }),
    isValidForm() {
      return this.equipmentStatus.isValid;
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    validateequipmentStatus() {
      this.equipmentStatus.isValid =
        !this.isEmpty(this.equipmentStatus.val) &&
        !!this.equipmentStates &&
        this.equipmentStates
          .map((ingredientState) => ingredientState.value)
          .indexOf(this.equipmentStatus.val) !== -1;
    },
    validateFields() {
      this.validateequipmentStatus();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit", {
        id: this.equipmentId,
        status: this.equipmentStatus.val,
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

  p {
    display: flex;
    justify-content: space-between;
  }
}
</style>
