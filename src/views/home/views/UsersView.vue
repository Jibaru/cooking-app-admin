<template>
  <base-card>
    <template #header>
      <h1>Lista de usuarios</h1>
      <base-button type="button" color="success">Nuevo Usuario</base-button>
    </template>
    <users-filter />
  </base-card>
  <base-card>
    <users-table />
  </base-card>
  <base-modal title="Nuevo Usuario" :open="true">
    <create-user-form />
  </base-modal>
</template>
<script>
import UsersFilter from "../../../components/user/list/filter/UsersFilter";
import UsersTable from "../../../components/user/list/table/UsersTable";
import CreateUserForm from "../../../components/user/forms/CreateUserForm";

export default {
  components: {
    UsersFilter,
    UsersTable,
    CreateUserForm,
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;
</style>
