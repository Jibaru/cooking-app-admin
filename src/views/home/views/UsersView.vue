<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de usuarios</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateUserModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Usuario
        </base-button>
      </div>
    </template>
    <users-filter @filter="searchUsers" />
  </base-card>
  <base-card>
    <users-table />
  </base-card>
  <base-modal
    title="Nuevo Usuario"
    :open="isCreateUserModalOpen"
    @close="toggleCreateUserModal"
  >
    <create-user-form @submit-create="closeModalAndCreateUser" />
  </base-modal>
</template>
<script>
import UsersFilter from "@/components/app/user/list/filter/UsersFilter";
import UsersTable from "@/components/app/user/list/table/UsersTable";
import CreateUserForm from "@/components/app/user/forms/CreateUserForm";

export default {
  components: {
    UsersFilter,
    UsersTable,
    CreateUserForm,
  },
  data() {
    return {
      isCreateUserModalOpen: false,
    };
  },
  methods: {
    toggleCreateUserModal() {
      this.isCreateUserModalOpen = !this.isCreateUserModalOpen;
    },
    searchUsers(filters) {
      // TODO: Search Users
      console.log(filters);
    },
    closeModalAndCreateUser(userData) {
      this.toggleCreateUserModal();
      // TODO: Create User
      console.log(userData);
    },
  },
};
</script>
<style lang="scss" scoped>
@include form-group;
@include responsive-grid;
@include layout;

h1 {
  font-size: 1.5rem;
  font-weight: 300;
}
</style>
