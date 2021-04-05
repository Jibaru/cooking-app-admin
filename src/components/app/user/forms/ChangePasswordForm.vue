<template>
  <form @submit.prevent="submitForm">
    <div class="info">
      <strong>
        ¿Desea cambiar la contraseña al usuario id: {{ userId }}?
      </strong>
      <p><b>Nombre:</b> {{ userFullName }}</p>
      <p><b>Email:</b> {{ userEmail }}</p>
      <p>
        <b>Rol:</b> <base-badge color="success">{{ userRole }}</base-badge>
      </p>
    </div>
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Contraseña</label>
        <base-input
          v-model="password.val"
          :is-valid="password.isValid"
          @blur="validatePassword"
        />
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
import Validators from "@/utils/validators";

export default {
  emits: ["submit"],
  props: {
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
      password: {
        val: "",
        isValid: true,
      },
    };
  },
  computed: {
    isValidForm() {
      return this.password.isValid;
    },
    userFullName() {
      return this.userFirstName + " " + this.userLastName;
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    validatePassword() {
      this.password.isValid = !this.isEmpty(this.password.val);
    },
    validateFields() {
      this.validatePassword();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit", {
        id: this.userId,
        password: this.password.val,
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
