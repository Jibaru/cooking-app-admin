<template>
  <base-table>
    <template #head>
      <base-cell tag="th">ID</base-cell>
      <base-cell tag="th">Nombre</base-cell>
      <base-cell tag="th">Tipo de medio</base-cell>
      <base-cell tag="th">Fecha Creación</base-cell>
      <base-cell tag="th">Acciones</base-cell>
    </template>
    <template #body>
      <tr
        v-for="(fileData, index) in fileDatas"
        :key="fileData.id"
        :class="{ 'striped-row': (index + 1) % 2 == 0 }"
      >
        <base-cell tag="td">
          {{ fileData.id }}
        </base-cell>
        <base-cell tag="td">
          {{ fileData.name }}
        </base-cell>
        <base-cell tag="td">
          <base-badge color="success">
            {{ fileData.mimeType }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-badge>
            {{ fileData.createdAt }}
          </base-badge>
        </base-cell>
        <base-cell tag="td">
          <base-button
            @click.stop="openPopover(index)"
            :ref="`${fileData.id}-file-data-actions`"
            :data-id="`${fileData.id}-file-data-actions`"
            class="popover-target"
            color="success"
          >
            <base-icon icon="ellipsis-h" />
          </base-button>
          <base-popover
            :open="isPopoverOpen && selectedFileData.id === fileData.id"
            :target-data-id="`${fileData.id}-file-data-actions`"
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
    @select-page="fetchFileDatas"
  />
  <base-modal
    title="Ver  Archivo"
    type="tiny"
    :open="isFileDataPresentationModalOpen"
    @close="isFileDataPresentationModalOpen = false"
  >
    <file-data-presentation
      :file-data-id="selectedFileData.id"
      :file-data-name="selectedFileData.name"
      :file-data-url="selectedFileData.base64Url"
      :file-data-created-at="selectedFileData.createdAt"
    />
  </base-modal>
  <base-modal
    title="Eliminar Archivo"
    type="tiny"
    :open="isDeleteFileDataModalOpen"
    @close="isDeleteFileDataModalOpen = false"
  >
    <delete-file-data-form
      :file-data-id="selectedFileData.id"
      :file-data-name="selectedFileData.name"
      @submit="deleteFileData"
    />
  </base-modal>
</template>
<script>
import { mapGetters } from "vuex";
import { downloadBase64Url } from "@/utils/downloader";
import FileDataPresentation from "../presentations/FileDataPresentation";
import DeleteFileDataForm from "../forms/DeleteFileDataForm";

export default {
  components: {
    FileDataPresentation,
    DeleteFileDataForm,
  },
  data() {
    return {
      selectedFileData: {
        id: null,
        name: null,
        mimeType: null,
        base64Url: null,
        createdAt: null,
      },
      isPopoverOpen: false,
      isDeleteFileDataModalOpen: false,
      isFileDataPresentationModalOpen: false,
      tableActions: [
        {
          key: "VIEW_FILE_DATA",
          name: "Ver",
          icon: { name: "eye", type: "fas" },
          action: this.toggleFileDataPresentationModal,
        },
        {
          key: "DOWNLOAD_FILE_DATA",
          name: "Descargar",
          icon: { name: "download", type: "fas" },
          action: this.downloadFileData,
        },
        {
          key: "DELETE_FILE_DATA",
          name: "Eliminar",
          icon: { name: "trash-alt", type: "fas" },
          action: this.toggleDeleteFileDataModal,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      fileDatas: "fileData/fileDatas",
      currentPage: "fileData/currentPage",
      totalPages: "fileData/totalPages",
    }),
  },
  methods: {
    fetchFileDatas(pageNumber) {
      console.log(pageNumber);
      //TODO: Fetch fileDatas
    },
    deleteFileData({ id }) {
      console.log(id);
      //TODO: Delete recipe tag
      this.toggleDeleteFileDataModal();
    },
    downloadFileData() {
      downloadBase64Url(
        this.selectedFileData.base64Url,
        this.selectedFileData.name,
        this.selectedFileData.mimeType
      );
    },
    setSelectedFileData(fileData) {
      if (fileData) {
        for (const key in this.selectedFileData) {
          this.selectedFileData[key] = fileData[key];
        }
      }
    },
    clearSelectedFileData() {
      for (const key in this.selectedFileData) {
        this.selectedFileData[key] = null;
      }
    },
    openPopover(index) {
      const fileData = this.fileDatas[index];
      this.setSelectedFileData(fileData);
      this.isPopoverOpen = true;
    },
    closePopover() {
      this.clearSelectedFileData();
      this.isPopoverOpen = false;
    },
    openActionModal(actionKey) {
      this.tableActions
        .find((action) => action.key === actionKey)
        ?.action?.call();
      this.isPopoverOpen = false;
    },
    toggleDeleteFileDataModal() {
      this.isDeleteFileDataModalOpen = !this.isDeleteFileDataModalOpen;
    },
    toggleFileDataPresentationModal() {
      this.isFileDataPresentationModalOpen = !this
        .isFileDataPresentationModalOpen;
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
