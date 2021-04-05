<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong> ¿Desea cambiar el estado al usuario id: {{ userId }}? </strong>
      <p><b>Nombre:</b> {{ userFullName }}</p>
      <p><b>Email:</b> {{ userEmail }}</p>
      <p>
        <b>Rol:</b> <base-badge color="success">{{ userRole }}</base-badge>
      </p>
    </div>
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Estado</label>
        <base-select v-model="userStatus.val">
          <base-option
            v-for="status in userStates"
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
    userId: {
      type: Number,
      required: true,
    },
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
  },
  data() {
    return {
      userStatus: {
        val: this.currentStatus,
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      userStates: "combo/userStates",
    }),
    isValidForm() {
      return this.userStatus.isValid;
    },
    userFullName() {
      return this.userFirstName + " " + this.userLastName;
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    validateUserStatus() {
      this.userStatus.isValid =
        !this.isEmpty(this.userStatus.val) &&
        !!this.userStates &&
        this.userStates
          .map((userState) => userState.value)
          .indexOf(this.userStatus.val) !== -1;
    },
    validateFields() {
      this.validateUserStatus();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit", {
        id: this.userId,
        status: this.userStatus.val,
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
