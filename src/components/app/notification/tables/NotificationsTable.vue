<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Motivo</base-cell>
      <base-cell tag="th">Enviado el</base-cell>
      <base-cell tag="th">Leído el</base-cell>
      <base-cell tag="th">Destinatario</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(notification, index) in notifications"
        :key="notification.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ notification.id }}
        </base-cell>
        <base-cell tag="td">
          {{ notification.subject }}
        </base-cell>
        <base-cell tag="td">
          <base-badge color="success">
            {{ notification.dateTimeSended }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge color="warning">
            {{ notification.dateTimeViewed }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <span v-if="notification.user">
            {{ notification.user.firstName + " " + notification.user.lastName }}
          </span>
          <span v-else>
            Sin usuario
          </span>
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ notification.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${notification.id}-notification-actions`"
            :data-id="`${notification.id}-notification-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedNotification.id === notification.id"
            :target-data-id="`${notification.id}-notification-actions`"
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
    @select-page="fetchNotifications"
  />
  <base-modal
    title="Ver Notificación"
    type="small"
    :open="isNotificationPresentationModalOpen"
    @close="isNotificationPresentationModalOpen = false"
  >
    <notification-presentation
      :notification-id="selectedNotification.id"
      :subject="selectedNotification.subject"
      :content="selectedNotification.content"
      :date-time-sended="selectedNotification.dateTimeViewed"
      :date-time-viewed="selectedNotification.dateTimeViewed"
      :created-at="selectedNotification.createdAt"
      :user-receiver="selectedNotification.user?.firstName"
    />
  </base-modal>
  <base-modal
    title="Eliminar Notificación"
    type="tiny"
    :open="isDeleteNotificationModalOpen"
    @close="isDeleteNotificationModalOpen = false"
  >
    <delete-notification-form
      :notification-id="selectedNotification.id"
      :subject="selectedNotification.subject"
      :date-time-viewed="selectedNotification.dateTimeViewed"
      :user-receiver="selectedNotification.user?.firstName"
      @submit="deleteNotification"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import NotificationPresentation from "../presentations/NotificationPresentation";
import DeleteNotificationForm from "../forms/DeleteNotificationForm";

export default {
  components: {
    NotificationPresentation,
    DeleteNotificationForm,
  },
  data() {
    return {
      selectedNotification: {
        id: null,
        subject: null,
        content: null,
        dateTimeSended: null,
        dateTimeViewed: null,
        createdAt: null,
        user: null,
      },
      isPopoverOpen: false,
      isNotificationPresentationModalOpen: false,
      isDeleteNotificationModalOpen: false,
      tableActions: [
        {
          key: "VIEW_NOTIFICATION",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleNotificationPresentationModal,
        },
        {
          key: "DELETE_NOTIFICATION",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteNotificationModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      notifications: "notification/notifications",
      currentPage: "notification/currentPage",
      totalPages: "notification/totalPages",
    }),
  },
  methods: {
    fetchNotifications(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch Notifications
    },
    deleteNotification({ id }) {
      console.log(id);
      // TODO: Delete Notification
      this.toggleDeleteNotificationModal();
    },
    setSelectedNotification(notification) {
      if (notification) {
        for (const key in this.selectedNotification) {
          this.selectedNotification[key] = notification[key];
        }
      }
    },
    clearSelectedNotification() {
      for (const key in this.selectedNotification) {
        this.selectedNotification[key] = null;
      }
    },
    openPopover(index) {
      const notification = this.notifications[index];
      this.setSelectedNotification(notification);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedNotification();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleNotificationPresentationModal() {
      this.isNotificationPresentationModalOpen = !this
        .isNotificationPresentationModalOpen;
    },
    toggleDeleteNotificationModal() {
      this.isDeleteNotificationModalOpen = !this.isDeleteNotificationModalOpen;
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
