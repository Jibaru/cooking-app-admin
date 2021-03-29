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
        <base-select v-model="userId.val" :disabled="hasReceiverUserIdSetted">
          <base-option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.firstName + " " + user.lastName }}
          </base-option>
        </base-select>
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
import { mapGetters } from "vuex";
import Validators from "@/utils/validators";

export default {
  emits: ["submit"],
  props: {
    receiverUserId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      userId: {
        val: "",
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
      users: "finder/users",
    }),
    isValidForm() {
      return (
        this.userId.isValid &&
        this.dateTimeSended.isValid &&
        this.subject.isValid &&
        this.content.isValid
      );
    },
    hasReceiverUserIdSetted() {
      return (
        this.receiverUserId !== null &&
        this.receiverUserId !== undefined &&
        typeof this.receiverUserId === "number"
      );
    },
  },
  methods: {
    ...{
      isEmpty: Validators.isEmpty,
    },
    initializeDefaultSelectValues() {
      if (this.users) {
        this.userId.val = this.receiverUserId
          ? this.receiverUserId
          : this.users[0].id;
      }
    },
    validateUser() {
      this.userId.isValid =
        !this.isEmpty(this.userId.val) &&
        !!this.users &&
        this.users.map((user) => user.id).indexOf(this.userId.val) !== -1;
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

      if (!this.isValidForm) {
        return;
      }

      this.$emit("submit", {
        userId: this.userId.val,
        dateTimeSended: this.dateTimeSended.val,
        subject: this.subject.val,
        content: this.content.val,
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
