<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <base-file-input
          type="file"
          v-model="imageProfileFile"
          :previous-src="currentImageProfileUrl"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Rol</label>
        <base-select v-model="role.val">
          <base-option
            v-for="role in roles"
            :key="role.value"
            :value="role.value"
          >
            {{ role.name }}
          </base-option>
        </base-select>
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Apellidos</label>
        <base-input
          v-model="lastName.val"
          :is-valid="lastName.isValid"
          @blur="validateLastName"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Nombres</label>
        <base-input
          v-model="firstName.val"
          :is-valid="firstName.isValid"
          @blur="validateFirstName"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Email</label>
        <base-input
          type="email"
          v-model="email.val"
          :is-valid="email.isValid"
          @blur="validateEmail"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-6 col-lg-4">
        <label>Contraseña</label>
        <base-input
          v-model="password.val"
          :is-valid="password.isValid"
          @blur="validatePassword"
        />
      </div>
    </div>
    <div class="flex-end">
      <base-button type="submit" :color="submitButtonColor">
        {{ submitButtonText }}
      </base-button>
    </div>
  </form>
</template>
<script>
import { mapGetters } from "vuex";
import Validators from "@/utils/validators";

export default {
  emits: ["submit-create", "submit-edit"],
  props: {
    currentId: {
      type: Number,
    },
    currentImageProfileUrl: {
      type: String,
    },
    currentRole: {
      type: String,
      default: "",
    },
    currentFirstName: {
      type: String,
      default: "",
    },
    currentLastName: {
      type: String,
      default: "",
    },
    currentEmail: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imageProfileFile: null,
      role: {
        val: this.currentRole,
        isValid: true,
      },
      firstName: {
        val: this.currentFirstName,
        isValid: true,
      },
      lastName: {
        val: this.currentLastName,
        isValid: true,
      },
      email: {
        val: this.currentEmail,
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      roles: "combo/roles",
    }),
    isValidForm() {
      return (
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.email.isValid &&
        this.password.isValid
      );
    },
    isEditingUser() {
      return (
        this.currentId !== null &&
        this.currentId !== undefined &&
        typeof this.currentId === "number"
      );
    },
    submitButtonColor() {
      return this.isEditingUser ? "success" : "primary";
    },
    submitButtonText() {
      return this.isEditingUser ? "Modificar Usuario" : "Crear Usuario";
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
      isEmail: Validators.isEmail,
    },
    initializeDefaultSelectValues() {
      if (this.roles) {
        this.role.val = this.roles[0].value;
      }
    },
    validateRole() {
      this.role.isValid =
        this.isEmpty(this.role.val) &&
        !!this.roles &&
        this.roles.indexOf(this.role.val) !== -1;
    },
    validateFirstName() {
      this.firstName.isValid = !this.isEmpty(this.firstName.val);
    },
    validateLastName() {
      this.lastName.isValid = !this.isEmpty(this.lastName.val);
    },
    validateEmail() {
      this.email.isValid =
        this.isEmail(this.email.val) && !this.isEmpty(this.email.val);
    },
    validatePassword() {
      this.password.isValid = !this.isEmpty(this.password.val);
    },
    validateFields() {
      this.validateRole();
      this.validateFirstName();
      this.validateLastName();
      this.validateEmail();
      this.validatePassword();
    },
    submitForm() {
      this.validateFields();

      if (!this.isValidForm) {
        return;
      }

      const eventName = this.isEditingUser ? "submit-edit" : "submit-create";

      this.$emit(eventName, {
        ...(this.isEditingUser && {
          userId: this.currentId,
        }),
        imageProfileFile: this.imageProfileFile,
        role: this.role.val,
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        email: this.email.val,
        password: this.password.val,
      });
    },
  },
  mounted() {
    this.initializeDefaultSelectValues();
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
