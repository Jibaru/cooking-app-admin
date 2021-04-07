<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombres</base-cell>
      <base-cell tag="th">Apellidos</base-cell>
      <base-cell tag="th">Email</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Rol</base-cell>
      <base-cell tag="th">Estado</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(user, index) in users"
        :key="user.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ user.id }}
        </base-cell>
        <base-cell tag="td">
          {{ user.firstName }}
        </base-cell>
        <base-cell tag="td">
          {{ user.lastName }}
        </base-cell>
        <base-cell tag="td">
          {{ user.email }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ user.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge color="success">
            {{ user.role }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge color="primary">
            {{ user.status }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${user.id}-user-actions`"
            :data-id="`${user.id}-user-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedUser.id === user.id"
            :target-data-id="`${user.id}-user-actions`"
            @click-outside="closePopover"
            location="left"
            no-padding
          >
            <base-table-actions
              :actions="tableActions"
              @select-action="openActionModal"
            />
          </base-popover>
        </base-cell>
      </tr>
    </template>
  </base-table>
  <base-pagination
    :current-page="currentPage"
    :total-pages="totalPages"
    @select-page="fetchUsers"
  />
  <base-modal
    title="Ver Usuario"
    type="tiny"
    :open="isUserPresentationModalOpen"
    @close="isUserPresentationModalOpen = false"
  >
    <user-presentation
      :user-first-name="selectedUser.firstName"
      :user-last-name="selectedUser.lastName"
      :user-email="selectedUser.email"
      :user-role="selectedUser.role"
      :user-status="selectedUser.status"
      :user-created-at="selectedUser.createdAt"
    />
  </base-modal>
  <base-modal
    title="Editar Usuario"
    type="large"
    :open="isEditUserModalOpen"
    @close="isEditUserModalOpen = false"
  >
    <create-user-form
      :current-id="selectedUser.id"
      :current-role="selectedUser.role"
      :current-first-name="selectedUser.firstName"
      :current-last-name="selectedUser.lastName"
      :current-email="selectedUser.email"
      :current-image-profile-url="selectedUser.image?.url"
      @submit-edit="editUser"
    />
  </base-modal>
  <base-modal
    title="Cambiar Estado de Usuario"
    type="tiny"
    :open="isChangeStatusModalOpen"
    @close="isChangeStatusModalOpen = false"
  >
    <change-state-form
      :current-status="selectedUser.status"
      :user-id="selectedUser.id"
      :user-first-name="selectedUser.firstName"
      :user-last-name="selectedUser.lastName"
      :user-email="selectedUser.email"
      :user-role="selectedUser.role"
      @submit="changeUserState"
    />
  </base-modal>
  <base-modal
    title="Cambiar Contraseña de Usuario"
    type="tiny"
    :open="isChangePasswordModalOpen"
    @close="isChangePasswordModalOpen = false"
  >
    <change-password-form
      :user-id="selectedUser.id"
      :user-first-name="selectedUser.firstName"
      :user-last-name="selectedUser.lastName"
      :user-email="selectedUser.email"
      :user-role="selectedUser.role"
      @submit="changeUserPassword"
    />
  </base-modal>
  <base-modal
    title="Enviar Notificación"
    type="large"
    :open="isCreateNotificationModalOpen"
    @close="isCreateNotificationModalOpen = false"
  >
    <create-notification-form
      :receiver-user-id="selectedUser.id"
      @submit-create="sendNotification"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import UserPresentation from "../presentations/UserPresentation";
import CreateUserForm from "../forms/CreateUserForm";
import ChangeStateForm from "../forms/ChangeStateForm";
import ChangePasswordForm from "../forms/ChangePasswordForm";
import CreateNotificationForm from "../../notification/forms/CreateNotificationForm";

export default {
  components: {
    UserPresentation,
    ChangeStateForm,
    ChangePasswordForm,
    CreateNotificationForm,
    CreateUserForm,
  },
  data() {
    return {
      selectedUser: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        role: null,
        status: null,
        createdAt: null,
        image: null,
      },
      isPopoverOpen: false,
      isUserPresentationModalOpen: false,
      isEditUserModalOpen: false,
      isChangeStatusModalOpen: false,
      isChangePasswordModalOpen: false,
      isCreateNotificationModalOpen: false,
      tableActions: [
        {
          key: "VIEW_USER",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleUserPresentationModal,
        },
        {
          key: "EDIT_USER",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
          action: this.toggleEditUserModal,
        },
        {
          key: "CHANGE_USER_STATE",
          name: "Cambiar estado",
          icon: { name: "exchange-alt", type: "fas" },
          action: this.toggleChangeStatusModal,
        },
        {
          key: "CHANGE_USER_PASSWORD",
          name: "Cambiar contraseña",
          icon: { name: "key", type: "fas" },
          action: this.toggleChangePasswordModal,
        },
        {
          key: "SEND_NOTIFICATION",
          name: "Enviar notificación",
          icon: { name: "paper-plane", type: "fas" },
          action: this.toggleCreateNotificationModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      users: "user/users",
      currentPage: "user/currentPage",
      totalPages: "user/totalPages",
    }),
  },
  methods: {
    fetchUsers(pageNumber) {
      // TODO: Fetch Users from pageNumber
      this.currentPage = pageNumber;
    },
    editUser(user) {
      // TODO: Edit User
      console.log(user);
      this.toggleEditUserModal();
    },
    changeUserState({ id, status }) {
      // TODO: Change User State
      console.log(id, status);
      this.toggleChangeStatusModal();
    },
    changeUserPassword({ id, password }) {
      // TODO: Change User Password
      console.log(id, password);
      this.toggleChangePasswordModal();
    },
    sendNotification({ userId, dateTimeSended, subject, content }) {
      // TODO: Send Notification
      console.log(userId, dateTimeSended, subject, content);
      this.toggleCreateNotificationModal();
    },
    setSelectedUser(user) {
      if (user) {
        for (const key in this.selectedUser) {
          this.selectedUser[key] = user[key];
        }
      }
    },
    clearSelectedUser() {
      for (const key in this.selectedUser) {
        this.selectedUser[key] = null;
      }
    },
    openPopover(index) {
      const user = this.users[index];
      this.setSelectedUser(user);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedUser();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions.find((action) => action.key === actionKey)?.action();
      this.isPopoverOpen = false;
    },
    toggleUserPresentationModal() {
      this.isUserPresentationModalOpen = !this.isUserPresentationModalOpen;
    },
    toggleEditUserModal() {
      this.isEditUserModalOpen = !this.isEditUserModalOpen;
    },
    toggleChangeStatusModal() {
      this.isChangeStatusModalOpen = !this.isChangeStatusModalOpen;
    },
    toggleChangePasswordModal() {
      this.isChangePasswordModalOpen = !this.isChangePasswordModalOpen;
    },
    toggleCreateNotificationModal() {
      this.isCreateNotificationModalOpen = !this.isCreateNotificationModalOpen;
    },
  },
};
</script>
<style lang="scss" scoped>
.striped-row {
  background-color: $app-striped-row-color;
  color: $app-striped-row-font-color;
}
</style>
