<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Estado</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(equipment, index) in equipments"
        :key="equipment.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ equipment.id }}
        </base-cell>
        <base-cell tag="td">
          {{ equipment.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ equipment.status }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ equipment.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${equipment.id}-equipment-actions`"
            :data-id="`${equipment.id}-equipment-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedEquipment.id === equipment.id"
            :target-data-id="`${equipment.id}-equipment-actions`"
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
    @select-page="fetchEquipments"
  />
  <base-modal
    title="Ver Material"
    type="tiny"
    :open="isEquipmentPresentationModalOpen"
    @close="isEquipmentPresentationModalOpen = false"
  >
    <equipment-presentation
      :equipment-id="selectedEquipment.id"
      :equipment-image-url="selectedEquipment.image.base64Url"
      :equipment-name="selectedEquipment.name"
      :equipment-description="selectedEquipment.description"
      :equipment-status="selectedEquipment.status"
      :equipment-created-at="selectedEquipment.createdAt"
    />
  </base-modal>
  <base-modal
    title="Editar Material"
    type="medium"
    :open="isEditEquipmentModalOpen"
    @close="isEditEquipmentModalOpen = false"
  >
    <create-equipment-form
      :current-id="selectedEquipment.id"
      :current-name="selectedEquipment.name"
      :current-image-url="selectedEquipment.image.base64Url"
      :current-description="selectedEquipment.description"
      @submit-edit="editEquipment"
    />
  </base-modal>
  <base-modal
    title="Cambiar Estado de Material"
    type="tiny"
    :open="isChangeStatusModalOpen"
    @close="isChangeStatusModalOpen = false"
  >
    <change-equipment-state-form
      :current-status="selectedEquipment.status"
      :equipment-id="selectedEquipment.id"
      :equipment-name="selectedEquipment.name"
      @submit="changeEquipmentState"
    />
  </base-modal>
  <base-modal
    title="Eliminar Material"
    type="tiny"
    :open="isDeleteEquipmentModalOpen"
    @close="isDeleteEquipmentModalOpen = false"
  >
    <delete-equipment-form
      :equipment-id="selectedEquipment.id"
      :equipment-name="selectedEquipment.name"
      @submit="deleteEquipment"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import EquipmentPresentation from "../presentations/EquipmentPresentation";
import CreateEquipmentForm from "../forms/CreateEquipmentForm";
import ChangeEquipmentStateForm from "../forms/ChangeEquipmentStateForm";
import DeleteEquipmentForm from "../forms/DeleteEquipmentForm";

export default {
  components: {
    EquipmentPresentation,
    CreateEquipmentForm,
    ChangeEquipmentStateForm,
    DeleteEquipmentForm,
  },
  data() {
    return {
      selectedEquipment: {
        id: null,
        name: null,
        description: null,
        image: null,
        status: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isEquipmentPresentationModalOpen: false,
      isEditEquipmentModalOpen: false,
      isChangeStatusModalOpen: false,
      isDeleteEquipmentModalOpen: false,
      tableActions: [
        {
          key: "VIEW_EQUIPMENT",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleEquipmentPresentationModal,
        },
        {
          key: "EDIT_EQUIPMENT",
          name: "Editar",
          icon: { name: "edit", type: "fas" },
          action: this.toggleEditEquipmentModal,
        },
        {
          key: "CHANGE_EQUIPMENT_STATUS",
          name: "Cambiar estado",
          icon: { name: "exchange-alt", type: "fas" },
          action: this.toggleChangeStatusModal,
        },
        {
          key: "DELETE_EQUIPMENT",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteEquipmentModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      equipments: "equipment/equipments",
      currentPage: "equipment/currentPage",
      totalPages: "equipment/totalPages",
    }),
  },
  methods: {
    fetchEquipments(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch equipments
    },
    editEquipment(equipment) {
      // TODO: Edit equipment
      console.log(equipment);
      this.toggleEditEquipmentModal();
    },
    changeEquipmentState({ id, status }) {
      console.log(id, status);
      this.toggleChangeStatusModal();
    },
    deleteEquipment({ id }) {
      console.log(id);
      //TODO: Delete equipment
      this.toggleDeleteEquipmentModal();
    },
    setSelectedEquipment(equipment) {
      if (equipment) {
        for (const key in this.selectedEquipment) {
          this.selectedEquipment[key] = equipment[key];
        }
      }
    },
    clearSelectedEquipment() {
      for (const key in this.selectedEquipment) {
        this.selectedEquipment[key] = null;
      }
    },
    openPopover(index) {
      const equipment = this.equipments[index];
      this.setSelectedEquipment(equipment);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedEquipment();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleEquipmentPresentationModal() {
      this.isEquipmentPresentationModalOpen = !this
        .isEquipmentPresentationModalOpen;
    },
    toggleEditEquipmentModal() {
      this.isEditEquipmentModalOpen = !this.isEditEquipmentModalOpen;
    },
    toggleChangeStatusModal() {
      this.isChangeStatusModalOpen = !this.isChangeStatusModalOpen;
    },
    toggleDeleteEquipmentModal() {
      this.isDeleteEquipmentModalOpen = !this.isDeleteEquipmentModalOpen;
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
