<template>
  <form @submit.prevent="submitFilter">
    <div class="row">
      <div class="form-group col-12 col-sm-12 col-md-12 col-lg-8">
        <label>Motivo</label>
        <base-input v-model.trim="subject" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Desde</label>
        <base-input type="date" v-model="fromDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Hasta</label>
        <base-input type="date" v-model="toDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Leído Desde</label>
        <base-input type="date" v-model="readedFromDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2">
        <label>Leído Hasta</label>
        <base-input type="date" v-model="readedToDate" />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-8">
        <label>Destinatario</label>
        <single-finder-input
          v-model="userReceiver"
          :options="userValues"
          @input="filterUsers"
        />
      </div>
      <div class="form-group col-12 col-sm-12 col-md-4 col-lg-2 center">
        <base-button block>Filtrar</base-button>
      </div>
    </div>
  </form>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SingleFinderInput from "../../../form-element/SingleFinderInput";

export default {
  emits: ["filter"],
  components: {
    SingleFinderInput,
  },
  data() {
    return {
      subject: "",
      fromDate: "",
      toDate: "",
      readedFromDate: "",
      readedToDate: "",
      userReceiver: null,
    };
  },
  computed: {
    ...mapGetters({
      userValues: "finder/userValues",
    }),
  },
  methods: {
    ...mapActions({
      findUsers: "finder/findUsers",
    }),
    filterUsers(value) {
      this.findUsers({ value });
    },
    submitFilter() {
      const filters = {
        ...(this.subject !== "" && {
          subject: this.subject,
        }),
        ...(this.toDate !== "" && {
          toDate: this.toDate,
        }),
        ...(this.fromDate !== "" && {
          fromDate: this.fromDate,
        }),
        ...(this.readedToDate !== "" && {
          readedToDate: this.readedToDate,
        }),
        ...(this.readedFromDate !== "" && {
          readedFromDate: this.readedFromDate,
        }),
        ...(this.userReceiver !== null && {
          userReceiverId: this.userReceiver.key,
        }),
      };

      this.$emit("filter", filters);
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
