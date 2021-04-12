<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong>
        ¿Desea cambiar el estado al ingrediente id: {{ ingredientId }}?
      </strong>
      <p><b>Nombre:</b> {{ ingredientName }}</p>
    </div>
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Estado</label>
        <base-select v-model="ingredientStatus.val">
          <base-option
            v-for="status in ingredientStates"
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
    ingredientId: {
      type: Number,
      required: true,
    },
    ingredientName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      ingredientStatus: {
        val: this.currentStatus,
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      ingredientStates: "combo/ingredientStates",
    }),
    isValidForm() {
      return this.ingredientStatus.isValid;
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    validateIngredientStatus() {
      this.ingredientStatus.isValid =
        !this.isEmpty(this.ingredientStatus.val) &&
        !!this.ingredientStates &&
        this.ingredientStates
          .map((ingredientState) => ingredientState.value)
          .indexOf(this.ingredientStatus.val) !== -1;
    },
    validateFields() {
      this.validateIngredientStatus();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit", {
        id: this.ingredientId,
        status: this.ingredientStatus.val,
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
