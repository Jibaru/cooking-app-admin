<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de notificaciones</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateNotificationModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nueva Notificación
        </base-button>
      </div>
    </template>
    <notifications-filter @filter="searchNotifications" />
  </base-card>
  <base-card>
    <notifications-table />
  </base-card>
  <base-modal
    title="Nueva Notificación"
    :open="isCreateNotificationModalOpen"
    @close="toggleCreateNotificationModal"
  >
    <create-notification-form
      @submit-create="closeModalAndCreateNotification"
    />
  </base-modal>
</template>
<script>
import NotificationsFilter from "@/components/app/notification/list/filter/NotificationsFilter";
import NotificationsTable from "@/components/app/notification/list/table/NotificationsTable";
import CreateNotificationForm from "@/components/app/notification/forms/CreateNotificationForm";

export default {
  components: {
    NotificationsFilter,
    NotificationsTable,
    CreateNotificationForm,
  },
  data() {
    return {
      isCreateNotificationModalOpen: false,
    };
  },
  methods: {
    toggleCreateNotificationModal() {
      this.isCreateNotificationModalOpen = !this.isCreateNotificationModalOpen;
    },
    searchNotifications(filters) {
      // TODO: Search Notifications
      console.log(filters);
    },
    closeModalAndCreateNotification(notificationData) {
      this.toggleCreateNotificationModal();
      // TODO: Create Notification
      console.log(notificationData);
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
