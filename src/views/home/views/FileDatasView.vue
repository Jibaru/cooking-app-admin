<template>
  <base-card>
    <template #header>
      <div class="row">
        <div class="col-12 col-sm-12 col-md-8 col-lg-10">
          <h1>Lista de archivos</h1>
        </div>
        <base-button
          type="button"
          color="success"
          @click="toggleCreateFileDataModal"
          class="col-12 col-sm-12 col-md-4 col-lg-2"
        >
          Nuevo Archivo
        </base-button>
      </div>
    </template>
    <file-datas-filter @filter="searchFileDatas" />
  </base-card>
  <base-card>
    <file-datas-table />
  </base-card>
  <base-modal
    title="Nuevo Archivo"
    :open="isCreateFileDataModalOpen"
    @close="toggleCreateFileDataModal"
  >
    <create-file-data-form @submit-create="closeModalAndCreateFileData" />
  </base-modal>
</template>
<script>
import FileDatasFilter from "@/components/app/file-data/forms/FileDatasFilter";
import FileDatasTable from "@/components/app/file-data/tables/FileDatasTable";
import CreateFileDataForm from "@/components/app/file-data/forms/CreateFileDataForm";

export default {
  components: {
    FileDatasFilter,
    FileDatasTable,
    CreateFileDataForm,
  },
  data() {
    return {
      isCreateFileDataModalOpen: false,
    };
  },
  methods: {
    toggleCreateFileDataModal() {
      this.isCreateFileDataModalOpen = !this.isCreateFileDataModalOpen;
    },
    searchFileDatas(filters) {
      // TODO: Search File Datas
      console.log(filters);
    },
    closeModalAndCreateFileData(fileData) {
      this.toggleCreateFileDataModal();
      // TODO: Create File Data
      console.log(fileData);
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
