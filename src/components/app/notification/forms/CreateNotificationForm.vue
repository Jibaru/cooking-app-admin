<template>
  <form @submit.prevent="submitForm">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-3">
        <label>Fecha de envío</label>
        <base-input
          type="date"
          v-model="dateTimeSended.val"
          :is-valid="dateTimeSended.isValid"
          @blur="validateDateTimeSended"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-8 col-lg-9">
        <label>Usuario</label>
        <single-finder-input
          v-model="user.val"
          :options="userValues"
          @input="filterUsers"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Motivo</label>
        <base-input
          v-model="subject.val"
          :is-valid="subject.isValid"
          @blur="validateSubject"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-12">
        <label>Contenido</label>
        <base-textarea
          v-model="content.val"
          :is-valid="content.isValid"
          @blur="validateContent"
          :rows="5"
        />
      </div>
    </div>
    <div class="flex-end">
      <base-button type="submit">
        Crear Notificación
      </base-button>
    </div>
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SingleFinderInput from "@/components/form-element/SingleFinderInput";
import Validators from "@/utils/validators";

export default {
  emits: ["submit-create"],
  components: {
    SingleFinderInput,
  },
  props: {
    receiverUserId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      user: {
        val: null,
        isValid: true,
      },
      dateTimeSended: {
        val: "",
        isValid: true,
      },
      subject: {
        val: "",
        isValid: true,
      },
      content: {
        val: "",
        isValid: true,
      },
    };
  },
  computed: {
    ...mapGetters({
      userValues: "finder/userValues",
    }),
    isValidForm() {
      return (
        this.user.isValid &&
        this.dateTimeSended.isValid &&
        this.subject.isValid &&
        this.content.isValid
      );
    },
    // TODO: Set to 'disabled' the SingleFinderInput if this computed attr is true
    hasReceiverUserIdSetted() {
      return (
        this.receiverUserId !== null &&
        this.receiverUserId !== undefined &&
        typeof this.receiverUserId === "number"
      );
    },
  },
  watch: {
    receiverUserId(userId) {
      this.setUserValue(userId);
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    ...mapActions({
      findUsers: "finder/findUsers",
    }),
    filterUsers(value) {
      this.findUsers({ value });
    },
    setUserValue(userId) {
      if (this.hasReceiverUserIdSetted) {
        const userValue = this.userValues.find(
          (userValue) => userValue.key === userId
        );
        this.user.val = { ...userValue };
      }
    },
    validateUser() {
      this.user.isValid =
        this.user.val !== null &&
        !!this.userValues &&
        this.userValues.map((user) => user.key).indexOf(this.user.val.key) !==
          -1;
    },
    validateDateTimeSended() {
      this.dateTimeSended.isValid = !this.isEmpty(this.dateTimeSended.val);
    },
    validateSubject() {
      this.subject.isValid = !this.isEmpty(this.subject.val);
    },
    validateContent() {
      this.content.isValid = !this.isEmpty(this.content.val);
    },
    validateFields() {
      this.validateUser();
      this.validateDateTimeSended();
      this.validateSubject();
      this.validateContent();
    },
    submitForm() {
      this.validateFields();
      console.log(this.user, this.userValues);

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit-create", {
        userId: this.user.val.key,
        dateTimeSended: this.dateTimeSended.val,
        subject: this.subject.val,
        content: this.content.val,
      });
    },
  },
  mounted() {
    this.setUserValue(this.receiverUserId);
  },
  unmounted() {
    this.findUsers({ value: "" });
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
